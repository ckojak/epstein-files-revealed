# Epstein Files Revealed

Crie uma aplicação web completa de "Venda de Conteúdo Exclusivo" (Paywall) com design moderno, misterioso e responsivo (estilo jornalismo investigativo/dark mode). O objetivo é vender acesso a um dossiê curado de documentos públicos sobre o caso Epstein e suas conexões com o Brasil.




Aqui estão os requisitos detalhados:




1. TEMA E DESIGN:
- Paleta de cores: Fundo escuro (Dark Gray/Black), acentos em Vermelho Alerta e Branco. Tipografia séria (estilo Inter ou Roboto Slab).
- Atmosfera: "Revelação", "Arquivos Ocultos", "Verdade".




2. ESTRUTURA DA LANDING PAGE (Home):
- Hero Section: Título impactante: "O Que Ninguém Te Contou: Os E-mails e Arquivos Completos do Caso Epstein". Subtítulo: "Acesso direto, traduzido e organizado. Veja as menções sobre o Brasil (Lula, Dilma, Bolsonaro) sem filtros."
- Botão de Ação (CTA): "Liberar Acesso Completo por R$ 1,99 (Taxa de Manutenção)".
- Seção "O Problema": "São mais de 5.000 páginas de documentos em inglês técnico e jurídico. Você não tem tempo para ler tudo isso."
- Seção "A Solução (O Produto)": "Nós organizamos, traduzimos os trechos cruciais e criamos um mecanismo de busca fácil. Tenha acesso a fotos, e-mails (estilo Jmail), logs de voo e áudios."
- Prova Social/Urgência: Um contador de "Pessoas lendo agora" (fictício ou real) e "Documentos liberados recentemente".




3. CHECKOUT E PAGAMENTO:
- Integre uma página de checkout simples e rápida.
- Valor fixo: R$ 1,99.
- Texto de apoio: "Este valor simbólico serve apenas para manter os servidores do site online e garantir que a verdade continue no ar."
- Integração sugerida: Stripe ou Mercado Pago (deixe preparado para eu colocar minhas API Keys).




4. ÁREA DE MEMBROS (Pós-Pagamento):
- Após o pagamento confirmado, o usuário deve ser redirecionado para o "/dashboard".
- O Dashboard deve ter:
  A) Uma barra de aviso no topo (Sticky Bar) amarela ou vermelha com o texto: "🚨 ATUALIZAÇÕES DIÁRIAS: O caso muda a toda hora. Para receber os novos vazamentos em tempo real, siga o perfil oficial." -> Botão grande para o Instagram "@kojakoficial".
  B) Grid de Conteúdo: Botões para "Acessar E-mails (Jmail Clone)", "Galeria de Fotos", "Resumos Traduzidos".
  C) Uma seção de "Destaques do Brasil" mostrando os resumos sobre as figuras políticas mencionadas.




5. TECNOLOGIAS:
- Use React, Tailwind CSS, Shadcn UI para componentes.
- Use Supabase para autenticação (se necessário) ou apenas proteção de rota baseada no status do pagamento.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/337ab29e-8dd1-4fe8-99d1-54f51569f7cc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
