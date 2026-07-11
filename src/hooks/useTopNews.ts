import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TopNewsItem {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  description: string;
  views: number;
  tag: string;
}

interface TopNewsResponse {
  items: TopNewsItem[];
  updatedAt: string;
  cached?: string;
}

export function useTopNews() {
  return useQuery<TopNewsResponse>({
    queryKey: ["top-news"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("fetch-news");
      if (error) throw error;
      return data as TopNewsResponse;
    },
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function formatViews(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".", ",") + "k";
  return String(n);
}

export function formatDateBR(iso: string): string {
  try {
    const d = new Date(iso);
    const now = new Date();
    const diffH = (now.getTime() - d.getTime()) / 3600000;
    if (diffH < 1) return "há poucos minutos";
    if (diffH < 24) return `há ${Math.floor(diffH)}h`;
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  } catch {
    return iso;
  }
}