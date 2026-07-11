import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface NewsItem {
  title: string;
  url: string;
  source: string;
  publishedAt: string; // ISO
  description: string;
  views: number;
  tag: string;
}

const FEEDS: { url: string; source: string; tag: string }[] = [
  { url: "https://g1.globo.com/rss/g1/mundo/", source: "G1 Mundo", tag: "MUNDO" },
  { url: "https://g1.globo.com/rss/g1/politica/", source: "G1 Política", tag: "BRASIL" },
  { url: "https://g1.globo.com/rss/g1/economia/", source: "G1 Economia", tag: "ECONOMIA" },
  { url: "https://feeds.bbci.co.uk/portuguese/rss.xml", source: "BBC Brasil", tag: "MUNDO" },
  { url: "https://feeds.bbci.co.uk/news/world/rss.xml", source: "BBC World", tag: "MUNDO" },
  { url: "https://www.aljazeera.com/xml/rss/all.xml", source: "Al Jazeera", tag: "GEOPOLÍTICA" },
  { url: "https://rss.uol.com.br/feed/noticias.xml", source: "UOL", tag: "BRASIL" },
  { url: "https://feeds.reuters.com/reuters/worldNews", source: "Reuters", tag: "MUNDO" },
];

// simple in-memory cache per worker
let memCache: { data: NewsItem[]; updatedAt: number } | null = null;
const TTL_MS = 15 * 60 * 1000;

function decodeHtml(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function pick(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = xml.match(re);
  return m ? decodeHtml(m[1]) : "";
}

function hashViews(url: string): number {
  let h = 0;
  for (let i = 0; i < url.length; i++) h = (h * 31 + url.charCodeAt(i)) | 0;
  const v = Math.abs(h) % 112000;
  return 8000 + v; // 8k – 120k
}

async function parseFeed(feed: { url: string; source: string; tag: string }): Promise<NewsItem[]> {
  try {
    const res = await fetch(feed.url, {
      headers: { "User-Agent": "TVOcultaBot/1.0 (+https://tvoculta-arquivos.vercel.app)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    // detect charset (many BR feeds are ISO-8859-1 / windows-1252)
    const buf = await res.arrayBuffer();
    const ct = res.headers.get("content-type") ?? "";
    let charset = "utf-8";
    const m = ct.match(/charset=([^;]+)/i);
    if (m) charset = m[1].trim().toLowerCase();
    else {
      const head = new TextDecoder("ascii").decode(buf.slice(0, 200));
      const xm = head.match(/encoding=["']([^"']+)["']/i);
      if (xm) charset = xm[1].toLowerCase();
    }
    if (charset === "iso-8859-1") charset = "windows-1252";
    let xml: string;
    try {
      xml = new TextDecoder(charset).decode(buf);
    } catch {
      xml = new TextDecoder("utf-8").decode(buf);
    }
    const items: NewsItem[] = [];
    const itemRe = /<item[\s\S]*?<\/item>/gi;
    const matches = xml.match(itemRe) ?? [];
    for (const raw of matches.slice(0, 12)) {
      const title = pick(raw, "title");
      const link = pick(raw, "link");
      const pubDate = pick(raw, "pubDate");
      const description = pick(raw, "description").slice(0, 260);
      if (!title || !link) continue;
      const iso = pubDate ? new Date(pubDate).toISOString() : new Date().toISOString();
      items.push({
        title,
        url: link,
        source: feed.source,
        publishedAt: iso,
        description: description || title,
        views: hashViews(link),
        tag: feed.tag,
      });
    }
    return items;
  } catch (e) {
    console.error(`feed fail ${feed.source}:`, (e as Error).message);
    return [];
  }
}

async function aggregate(): Promise<NewsItem[]> {
  const chunks = await Promise.all(FEEDS.map(parseFeed));
  const flat = chunks.flat();
  const seen = new Set<string>();
  const unique: NewsItem[] = [];
  for (const it of flat) {
    if (seen.has(it.url)) continue;
    seen.add(it.url);
    unique.push(it);
  }
  unique.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  return unique.slice(0, 40);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const now = Date.now();
    if (memCache && now - memCache.updatedAt < TTL_MS) {
      return new Response(
        JSON.stringify({ items: memCache.data, updatedAt: new Date(memCache.updatedAt).toISOString(), cached: "mem" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Try DB cache
    const { data: cached } = await supabase
      .from("news_cache")
      .select("payload, updated_at")
      .eq("id", "top40")
      .maybeSingle();

    if (cached && now - +new Date(cached.updated_at) < TTL_MS) {
      const items = cached.payload as NewsItem[];
      memCache = { data: items, updatedAt: +new Date(cached.updated_at) };
      return new Response(
        JSON.stringify({ items, updatedAt: cached.updated_at, cached: "db" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const items = await aggregate();
    if (items.length > 0) {
      memCache = { data: items, updatedAt: now };
      await supabase.from("news_cache").upsert({
        id: "top40",
        payload: items,
        updated_at: new Date(now).toISOString(),
      });
    }

    return new Response(
      JSON.stringify({ items, updatedAt: new Date(now).toISOString(), cached: "fresh" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("fetch-news error:", e);
    return new Response(
      JSON.stringify({ error: (e as Error).message, items: [] }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});