## Objetivo

Sanear o portal (manter só o eixo Epstein), substituir os 21 dossiês fictícios por notícias reais das últimas 24h com fonte oficial, e ativar promoção de R$ 2,49.

---

## Passo 1 — Saneamento

**Preservar (eixo Epstein):**
- `src/pages/ThankYou.tsx`: banner de sucesso, card "Dossiê Traduzido (PT-BR)", Google Drive, Jmail, EpsteinFTA, JeffTube, Telegram, footer.
- `src/pages/Index.tsx`: hero, prévias Epstein, checkout, PIX, depoimentos, FAQ.
- `src/pages/SecretDashboard.tsx`: mantido.

**Remover / substituir:**
- Conteúdo do array `dossiesGlobais` em `src/data/dossiesGlobais.ts` (os 21 itens genéricos "Antártida/CERN/Vaticano" etc. — não são fatos verificáveis) → substituído no Passo 2.
- Qualquer referência residual a "crisisData" ou textos antigos que ainda estejam no `Index.tsx`/`ThankYou.tsx` fora do eixo Epstein.

**Bug técnico Página 1 (pós-pagamento):** revisar `ThankYou.tsx` + `usePaymentVerification` — checar se o redirect do Mercado Pago (`collection_status=approved&external_reference=email`) está persistindo `sessionStorage` e liberando conteúdo sem tela branca/loop. Se houver `console.error` ou race condition, corrigir.

---

## Passo 2 — OSINT ativo (notícias reais das últimas 24h)

Durante o build, executar `websearch--web_search` (categoria `news`, filtros temporais) em lotes paralelos cobrindo:

- **Brasil / STF / Política / Bancos:** Globo, UOL, Folha, Estadão, Reuters BR.
- **Guerras / Geopolítica:** Ucrânia-Rússia, Israel-Gaza-Líbano, Sudão, tensões Ásia-Pacífico — Reuters, AP, BBC, Al Jazeera.
- **Escândalos financeiros e judiciais:** processos abertos, delações.

**Critérios (Regra de Ouro):**
1. Fato central verificável — nada de especulação.
2. `url` obrigatoriamente apontando para a matéria original no portal oficial (nunca Google search).
3. Resumo executivo curto (2–3 linhas).
4. Se não houver fonte oficial → item descartado.

**Meta:** 15–21 itens reais. Cada um: `{ tag, title, desc, url, source, publishedAt }`.

**Arquivo:** reescrever `src/data/dossiesGlobais.ts` com o novo array + tags reajustadas (`[BRASIL]`, `[STF]`, `[GUERRA]`, `[ECONOMIA]`, `[GEOPOLÍTICA]`, etc.) e `tagIconMap` atualizado. Adicionar campo `source` exibido no card ("Fonte: Reuters · há 4h") e trocar botão para "LER MATÉRIA ORIGINAL".

Consumidores (`Index.tsx` vitrine borrada e `ThankYou.tsx` grid destravado) permanecem funcionando — apenas o dataset muda.

---

## Passo 3 — Promoção Junho (R$ 4,99 → R$ 2,49)

Alterar em todos os pontos:

- **Backend:** `supabase/functions/create-preference/index.ts` → `unit_price: 2.49`.
- **Frontend:** todas as strings `R$ 4,99` / `4,99` / `4.99` em `Index.tsx` (hero, CTAs, checkout section, FAQ), `ThankYou.tsx`, overlay de blur dos cards → `R$ 2,49`.
- Adicionar selo "PROMO JUNHO — de R$ 4,99 por R$ 2,49" no hero e no botão de checkout (preço riscado).
- Redeploy da edge function `create-preference`.
- Fluxo pós-pagamento: confirmar `back_urls.success = ${origin}/obrigado` + `auto_return: approved` continuam corretos → cliente cai direto no conteúdo destravado.

---

## Passo 4 — Log de status

Ao final, reportar no chat:
- ✅ Sistema Saneado (itens removidos / preservados)
- ✅ Promoção Ativa (R$ 2,49 em X pontos)
- ✅ Links Verificados (N notícias com fonte oficial, N descartadas)

---

## Arquivos afetados

- **Editar:** `src/data/dossiesGlobais.ts` (reescrever com dados reais)
- **Editar:** `src/pages/Index.tsx` (preço, selo promo, card layout com fonte)
- **Editar:** `src/pages/ThankYou.tsx` (card layout com fonte, botão "Ler matéria original", limpeza residual, fix do bug se detectado)
- **Editar:** `supabase/functions/create-preference/index.ts` (`unit_price: 2.49`) + redeploy
- **Não tocar:** `handleCheckout`, webhook Mercado Pago, Supabase client, rotas, metadados/favicon, `index.css`, `tailwind.config.ts`.
