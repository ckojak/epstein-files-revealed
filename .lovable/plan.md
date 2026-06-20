## Objetivo
Atualizar o site com notícias globais frescas dos últimos 2 meses (Maio–Junho/2026), criar um bloco de destaque no TOPO da página convertendo curiosidade em compra, e substituir referências antigas (Março/2026, Jan/2026) por Junho/2026.

## Escopo (somente `src/pages/Index.tsx`)
Sem mexer em: Header, Hero, lógica de checkout (`handleCheckout`, R$ 4,99), TeaserCards do dossiê, Testemunhos, Footer, WhatsAppButton.

## 1. Novo bloco "BREAKING NEWS" no TOPO (logo após o Header, antes do Hero)
Faixa de alta conversão com:
- Selo pulsante "🔴 AO VIVO — ATUALIZAÇÕES DAS ÚLTIMAS 48H"
- Manchete grande: **"O mundo está pegando fogo. E a mídia mostra 5%."**
- Subheadline: "Guerras, Copa do Mundo, polêmicas globais, mercados em colapso — tudo conectado ao dossiê. Acesso completo por R$ 4,99."
- Ticker horizontal (animado, scroll infinito) com 8 manchetes curtas piscando.
- Mini-CTA: botão `DESBLOQUEAR NOTÍCIAS EXCLUSIVAS — R$ 4,99` que rola até o checkout.

## 2. Atualizar banners de data
- Banner vermelho topo: trocar "Janeiro/2026" → "Junho/2026" + manchete "🔴 URGENTE: Acordo EUA-Irã em colapso após ataques no Líbano (19/06/2026)"
- Status Badge Hero: "Documentos Recém-Liberados — Jan/2026" → "— Jun/2026"
- Seção Notícias: "Junho/2026" (já está)
- Seção Radar (se mantida): "Março/2026" → "Junho/2026"

## 3. Expandir seção "NOTÍCIAS DE HOJE" — de 3 para 9 cards
Manter os 3 cards atuais e adicionar 6 novos baseados em pesquisa real (Folha, G1, BBC, DW, UOL, Agência Brasil, Bloomberg):

```
Card 4 — [GUERRA]
"Acordo EUA-Irã de 14 pontos em risco: ataques de Israel no Líbano adiam assinatura na Suíça."
Sub: Trump assinou cessar-fogo, mas confrontos no sul libanês reabrem o conflito (19/06/2026).

Card 5 — [GUERRA]
"Drones atingem refinaria em Moscou: 555 abatidos pela Rússia, aeroporto fechado, Kiev bombardeada."
Sub: Maior troca de ataques aéreos do ano. G7 discute novas sanções (18/06/2026).

Card 6 — [COPA DO MUNDO 2026]
"Copa de Trump: ingressos extorsivos, vistos negados e Infantino acusado de servir à Casa Branca."
Sub: FIFA enfrenta crise de credibilidade às vésperas da abertura nos EUA/Canadá/México.

Card 7 — [SELEÇÃO BRASILEIRA]
"Lobby por Neymar vira 'grande circo': deputado pressiona Ancelotti e atleta é cortado da lista."
Sub: Bastidores das 48h que mantiveram o santista na convocação apesar da lesão grau 2.

Card 8 — [CBF & PODER]
"Guerra política racha CBF no meio da Copa: Samir Xaud sob ataque e jejum de 24 anos pesa."
Sub: Disputa interna pode explodir antes da estreia da seleção brasileira.

Card 9 — [PETRÓLEO]
"Estreito de Ormuz reaberto: Trump destrava 20% do petróleo mundial e segura o dólar."
Sub: Acordo bilateral reorganiza o mapa energético global em tempo recorde.
```

Cores semânticas das tags:
- [GUERRA] → `text-alert` (vermelho)
- [COPA DO MUNDO 2026] / [SELEÇÃO BRASILEIRA] → `text-warning` (amarelo)
- [CBF & PODER] → `text-warning`
- [PETRÓLEO] → `text-terminal` (verde)

Layout: `grid md:grid-cols-3 gap-4` continua, agora com 9 itens em 3 linhas.

## 4. Atualizar Radar de Colapso Global (manter, refrescar data)
Não recriar — a memória do projeto guarda esta narrativa. Só trocar "Março/2026" → "Junho/2026" no subtítulo da seção, sem alterar os 14 cards existentes.

## Estilo / Tom
- Manter estética Terminal/Dark Mode, fontes `font-mono` em tags e timestamps.
- Animações: `animate-pulse` no selo AO VIVO, ticker com `animate-marquee` (definir keyframes inline via Tailwind arbitrary se necessário — ou usar `animate-pulse-slow` já existente).
- Linguagem investigativa, urgente, conectando cada manchete ao dossiê ("nomes que aparecem nos arquivos", "valores documentados", etc.).

## Verificação
- Build compila sem erros.
- Conferir visualmente: Breaking News no topo, 9 cards na seção de notícias, datas atualizadas para Junho/2026.