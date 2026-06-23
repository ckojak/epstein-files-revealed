## Objetivo

Transformar o site num "Arquivo Vitalício Híbrido": preservar os links originais Epstein e adicionar um Radar Global de **21 dossiês** (vitrine borrada no `Index`, totalmente destravado no `ThankYou` com botão de varredura no Google).

---

## Parte 1 — Fonte de dados

**Criar `src/data/dossiesGlobais.ts`**

- Exporta `dossiesGlobais` exatamente com os 21 itens fornecidos (`tag`, `title`, `desc`, `url`).
- Exporta `tagIconMap: Record<string, LucideIcon>` mapeando cada tag a um ícone do `lucide-react`:

| Tag | Ícone |
|---|---|
| CRISE NACIONAL | Landmark |
| CLIMA | CloudFog |
| ELITE | Gem |
| PENTÁGONO | Plane |
| ECONOMIA | Banknote |
| VAZAMENTO | FileWarning |
| TECNOLOGIA | ServerCrash |
| SAÚDE | Syringe |
| CENSURA | EyeOff |
| SOCIOLOGIA | Building2 |
| ANTÁRTIDA | Snowflake |
| ALIMENTAÇÃO | Wheat |
| INFRAESTRUTURA | Cable |
| GEOPOLÍTICA | Globe |
| ENERGIA | Atom |
| BIOMETRIA | Dna |
| HISTÓRIA | ScrollText |
| MERCADO | Briefcase |
| IA | BrainCircuit |
| MÍDIA | Newspaper |

Helper `getIconForTag(tag)` que normaliza colchetes e retorna o ícone (fallback `AlertTriangle`).

---

## Parte 2 — Vitrine (`src/pages/Index.tsx`)

Na seção **"NOTÍCIAS DE HOJE"** (linhas ~595-710):

1. Importar `dossiesGlobais` e `getIconForTag`.
2. Substituir o array inline atual de 9 itens pelo `dossiesGlobais.map(...)`.
3. Grid responsivo: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`.
4. Cada card:
   - Ícone (do mapa) + tag colorida + título **legíveis**.
   - Descrição renderizada com `blur-sm select-none pointer-events-none`.
   - Overlay absoluto sobre a descrição com cadeado (`Lock`) e texto **"🔒 Desbloqueie por R$ 4,99"**.
   - Card inteiro clicável → `window.scrollTo({ top: 0, behavior: 'smooth' })` (mesmo comportamento dos CTAs existentes; não toca em `handleCheckout`).
5. Atualizar subtítulo da seção para algo como "Radar Global — Dossiês Classificados".

Nada mais é alterado no `Index.tsx` (hero, checkout, PIX, prévias Epstein, depoimentos, etc. permanecem intactos).

---

## Parte 3 — Área VIP (`src/pages/ThankYou.tsx`)

1. **Remover** os blocos `RADAR DE COLAPSO GLOBAL` (e o array `crisisData`) e `VAZAMENTO PRINCIPAL — O Dossiê Epstein BR`.
2. **Remover** o array antigo `dossieData` (4 itens) e sua seção "DOSSIÊS DESTRANCADOS — ACESSO TOTAL".
3. **Preservar intactos**:
   - Banner de sucesso, aviso de e-mail.
   - Card "Dossiê Traduzido (PT-BR)" e CTA verde.
   - Grid com **Google Drive Original** e **Buscador de E-mails (Jmail)**.
   - Card "Fontes Adicionais" com **EpsteinFTA.com** e **JeffTube.net**.
   - Bloco do Telegram e footer.
4. **Logo após** o card "Fontes Adicionais", inserir nova seção **"RADAR GLOBAL — 21 DOSSIÊS DESTRANCADOS"**:
   - Header com `Unlock` + título + linha mono "Acesso total · Sem censura · Sem blur".
   - Grid `grid-cols-1 md:grid-cols-2 gap-4` mapeando `dossiesGlobais`.
   - Cada card (`bg-[#0a0a0a] border-green-500/20 p-5`):
     - Ícone (`getIconForTag`) + tag verde.
     - `title` em destaque.
     - `desc` totalmente legível.
     - Botão verde **"INICIAR VARREDURA (Buscador Global)"** (ícone `Search`) → `window.open(item.url, '_blank', 'noopener,noreferrer')`.
5. Imports adicionados: `dossiesGlobais`, `getIconForTag`, `Search`. Remover imports não usados (`Flame`, `AlertTriangle`, `Skull`, `Crosshair`, `Zap`, `Radio`) após a limpeza.

---

## Regras de preservação

- Não tocar em `handleCheckout`, modal PIX, listener Realtime, botão DEV, rotas, Supabase client, webhook Mercado Pago ou edge functions.
- Não alterar `index.css`, `tailwind.config.ts`, favicon, metadata.
- Sem mudanças de schema, RLS ou backend.

## Arquivos afetados

- **Criar:** `src/data/dossiesGlobais.ts`
- **Editar:** `src/pages/Index.tsx` (apenas seção "NOTÍCIAS DE HOJE")
- **Editar:** `src/pages/ThankYou.tsx` (remoção dos 3 blocos antigos + injeção do novo grid abaixo das Fontes Adicionais)
