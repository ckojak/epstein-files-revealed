## Objetivo
Substituir a seção atual de conflitos globais ("RADAR DE COLAPSO GLOBAL") em `src/pages/Index.tsx` por uma nova seção "NOTÍCIAS DE HOJE" contendo exatamente 3 cards atualizados com manchetes investigativas, geopolíticas e financeiras.

## Escopo de Alteração
- **Arquivo único:** `src/pages/Index.tsx`
- **Trecho afetado:** Linhas 466–628 (seção `<section className="py-12 md:py-16 px-4 bg-alert/5 border-y border-alert/20">` com o título "RADAR DE COLAPSO GLOBAL" e o array de 14 conflitos)

## O que será mantido intacto
- Header ("ARQUIVOS JEFFREY EPSTEIN BRASIL")
- Hero Section, checkout, CTA e lógica de pagamento (`handleCheckout`, `email`, `loading`)
- Seção "Prévia dos Documentos" (TeaserCards)
- Seção "Vazamento Principal"
- Testemunhos, FAQ, Footer, WhatsAppButton
- Todos os imports existentes

## Estrutura da Nova Seção
Título da seção: **NOTÍCIAS DE HOJE**
Subtítulo/label: **Atualização investigativa — Junho/2026**

Grid com 3 cards no mesmo estilo visual do site:

```
Card 1:
- Tag: [VITÓRIA CONTRA O SISTEMA] (cor terminal)
- Título: O Algoritmo Falhou: Como a Justiça brasileira forçou a Meta a devolver o controle aos criadores.
- Subtítulo: Os bastidores do apagão de 54 dias e a queda do bloqueio automatizado.

Card 2:
- Tag: [ECONOMIA] (cor warning)
- Título: A nova fase das CBDCs: O que os governos não estão revelando sobre o rastreio financeiro.
- Subtítulo: Documentos recentes mostram a implementação acelerada do dinheiro digital programável.

Card 3:
- Tag: [GEOPOLÍTICA] (cor alert)
- Título: Tensões Globais e a Cortina de Fumaça: O que a mídia tradicional está a esconder esta semana.
- Subtítulo: A movimentação de dados e ativos que indica uma mudança drástica no mercado mundial.
```

## Estilo Visual
- Usar o componente `<Card>` existente com fundo `bg-card`, borda `border-border`.
- Tags com estilo `font-mono`, `text-[10px]`, `uppercase`, `tracking-wider`, com cores semanticamente alinhadas:
  - `[VITÓRIA CONTRA O SISTEMA]` → cor `text-terminal` / fundo `bg-terminal/10`
  - `[ECONOMIA]` → cor `text-warning` / fundo `bg-warning/10`
  - `[GEOPOLÍTICA]` → cor `text-alert` / fundo `bg-alert/10`
- Títulos: `font-bold text-foreground text-sm md:text-base`
- Subtítulos: `text-muted-foreground text-xs md:text-sm`
- Ícones: `Newspaper` (ou `Eye`, `TrendingUp`, `Globe` como fallback) no topo de cada card para manter a estética de confidencialidade.
- Grid: `grid md:grid-cols-3 gap-4` (3 colunas no desktop, 1 no mobile).

## Verificação
- Após editar, validar que o build compila sem erros.
- Confirmar visualmente que os 3 cards aparecem corretamente com as tags, títulos e subtítulos.