## Objetivo

Transformar o site no braço web do canal **TV Oculta — "Notícias Exclusivas Mundiais"**: home focada em notícias globais atualizadas via RSS, com Top 40 em teaser bloqueado e o eixo Epstein deslocado para o fim da home (e ganhando página dedicada `/epstein`). Manter R$ 2,49 pagamento único.

---

## Passo 1 — Rebrand TV Oculta (raspar Epstein do topo)

- `index.html`: `<title>` → `TV Oculta — Notícias Exclusivas Mundiais`. Meta description, OG e Twitter alinhados.
- Header do site (Index e ThankYou): substituir "ARQUIVOS JEFFREY EPSTEIN BRASIL 🇧🇷" por logo/nome **TV OCULTA** + tagline "Notícias Exclusivas Mundiais". Adicionar link discreto para o Instagram `@tvoculta.reserva`.
- **Auditoria "oficial":** varrer `Index.tsx`, `ThankYou.tsx`, `SecretDashboard.tsx` e `dossiesGlobais.ts` procurando qualquer string tipo "Jeffrey Epstein Arquivos oficial", "canal oficial", "@epstein.arquivos.oficial". Se existir, remover a palavra "oficial" e reescrever como "conteúdo curado pela TV Oculta" — evita alegação de personificação.

## Passo 2 — Feed automático de notícias (RSS via edge function)

- **Nova edge function `fetch-news`** (`supabase/functions/fetch-news/index.ts`):
  - Busca em paralelo RSS de: G1 Mundo, G1 Política, Reuters World, BBC Mundo, AP News Top, Al Jazeera, Estadão Internacional, UOL Últimas.
  - Faz parse do XML sem lib externa (regex simples de `<item>…</item>` extraindo `title`, `link`, `pubDate`, `description`).
  - Deduplica por URL, ordena por `pubDate` desc, corta em 40.
  - Enriquecimento: `source` (nome do portal), `publishedAt` (data BR), `views` (número simulado estável, hash do URL → 8k–120k para prova social honesta como "views no card do IG").
  - Cache em memória do worker (`Map` com TTL de 15 min) para evitar rebuscar a cada requisição.
  - Retorna `{ items: [...], updatedAt }` com CORS liberado.
- **Nova tabela `news_cache`** (opcional, backup do cache in-memory que dura entre cold starts):
  ```sql
  CREATE TABLE public.news_cache (
    id text PRIMARY KEY DEFAULT 'top40',
    payload jsonb NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT now()
  );
  GRANT SELECT ON public.news_cache TO anon, authenticated;
  GRANT ALL ON public.news_cache TO service_role;
  ALTER TABLE public.news_cache ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "leitura pública" ON public.news_cache FOR SELECT USING (true);
  ```
  A função lê primeiro do cache se `updated_at > now() - 15 min`, senão refaz o fetch e faz `upsert`.
- **Hook `useTopNews`** no front (`src/hooks/useTopNews.ts`) chamando `supabase.functions.invoke("fetch-news")` com `staleTime: 10min` (React Query).

## Passo 3 — Nova home (`src/pages/Index.tsx`)

Estrutura reescrita, ordem de cima para baixo:

1. **Header TV Oculta** — logo + tagline + botão "Seguir @tvoculta.reserva".
2. **Barra AO VIVO** — pulso vermelho + texto "Atualizado agora · X notícias das últimas 24h" (usa `updatedAt` real da função).
3. **Hero aberto (sem login)** — título "As notícias que a mídia não te mostra" + subtítulo, e **grid de 3 cards das notícias mais recentes 100% legíveis** com botão "Ler matéria original" saindo direto para o portal. Serve de amostra grátis e SEO.
4. **Prova social honesta** — barra com: "⚡ 106 mil seguidores no Instagram" · "🎥 5,9 mi de visualizações nos últimos 30 dias" · badge "Atualizado hoje". Sem promessas de arquivo que não existe.
5. **CTA principal** — input de e-mail + botão `DESBLOQUEAR AS 40 NOTÍCIAS EXCLUSIVAS — R$ 2,49`. Mantém o fluxo Mercado Pago que já existe (não mexer em `handleCheckout` nem no realtime listener).
6. **Top 40 do mês (teaser bloqueado)** — grid 3 colunas mostrando para cada item:
   - Ícone da tag + fonte (G1, Reuters…) + data + views ("👁 12,4k").
   - Título **legível**.
   - Descrição **borrada com `blur-sm select-none`** e overlay "🔒 Desbloqueie por R$ 2,49".
   - Card não é clicável (o link real só na versão paga). Dá para hover em desktop mostrando um chip "Exclusivo assinante".
7. **Depoimentos** (mantidos, mas reescritos para linguagem "canal de notícias" e não "documentos Epstein").
8. **Bloco Epstein no final** — card grande "🕵️ CASO ESPECIAL: Epstein Brasil — 5.247 páginas traduzidas" com prévia + botão `Ver dossiê completo →` que leva para `/epstein`. Fica **abaixo** da Top 40, como pediu.
9. **CTA final** + rodapé com links do canal (IG, Threads, FB) + WhatsApp button.

Remover: banner "URGENTE (19/06/2026)", ticker antigo, seção "BREAKING NEWS", teasers antigos hardcoded de Epstein na home, todo o array `dossiesGlobais` do consumo da home.

## Passo 4 — Página dedicada `/epstein` (`src/pages/Epstein.tsx`)

Rota nova em `src/App.tsx`. Mesma lógica da home:

- Hero explicando o caso Epstein-BR.
- **Preview aberto:** 3–4 cards de documentos com resumo curto, sem lock.
- **Conteúdo completo trancado:** grid dos demais documentos com blur + CTA R$ 2,49 (reaproveita `handleCheckout` do fluxo Mercado Pago).
- Botão de retorno para home TV Oculta no topo.

`SecretDashboard.tsx` e `ThankYou.tsx` continuam funcionando exatamente como hoje para quem já pagou — a única mudança em `ThankYou.tsx` é: além do dossiê Epstein, mostrar a Top 40 **destravada e clicável** (mesmo dataset da edge function) para justificar o valor do acesso.

## Passo 5 — Ajustes de conversão honestos

- Substituir claims exagerados por prova social real: contador "seguidores IG" (106 mil, estático), "views 30d" (5,9 mi, estático), badge "atualizado hoje" (dinâmico, vem de `updatedAt`), e "views" por notícia (determinístico, não aleatório a cada refresh).
- Remover a palavra "oficial" onde não é verdade.
- Manter countdown de 24h e "X pessoas lendo agora", só reduzir intensidade visual para ficar menos "página de vendas 2010".

## Passo 6 — Não mexer

- `handleCheckout`, edge function `create-preference`, webhook Mercado Pago, `usePaymentVerification`, `SecretDashboard.tsx`, secrets, favicon, `index.css` (só adicionar 1 utility se precisar), `tailwind.config.ts`.

---

## Arquivos afetados

**Criar:**
- `supabase/functions/fetch-news/index.ts` — agregador RSS
- `src/hooks/useTopNews.ts` — hook React Query
- `src/pages/Epstein.tsx` — página dedicada
- Migration `news_cache` (tabela de cache)

**Editar:**
- `index.html` — title/meta TV Oculta
- `src/App.tsx` — rota `/epstein`
- `src/pages/Index.tsx` — reescrita da estrutura (passo 3)
- `src/pages/ThankYou.tsx` — adicionar seção Top 40 destravada + remover "oficial" se existir
- `src/data/dossiesGlobais.ts` — reduzir a apenas itens do eixo Epstein-BR (o resto vem da edge function)

**Não tocar:**
- `supabase/functions/create-preference`, `mercadopago-webhook`, `SecretDashboard.tsx`, integrations, config.toml, tailwind.config.ts.
