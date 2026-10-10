# VMCreatus Social — Studio 02

Workspace de planejamento editorial com design dark, radar de referências e preparação multicontas.

- Site: https://vmcreatus.netlify.app/
- Código: https://github.com/vmanforte-cmd/vmcreatus-social
- Branch de publicação: `main`

## Status real do produto

Esta versão é um aplicativo estático com dados locais no navegador. Não tem autenticação de usuários, sincronização na nuvem ou conexões OAuth. Cadastrar uma conta **não conecta a rede social**. Nenhuma ação de publicação, curtida, follow, mensagem ou comentário é enviada às redes. Os textos do painel informam essas limitações.

## Recursos disponíveis

- Tema escuro responsivo com contraste, foco de teclado e botões de pelo menos 44 px (eventos compactos do calendário: 32 px).
- Conteúdos com rede, conta, formato, objetivo editorial, data e etapa de revisão.
- Criação, edição, duplicação, exclusão, busca e filtros.
- Calendário por conta, no fuso do dispositivo.
- Radar de referências: link HTTPS, nicho, gancho, evidências e classificação **manual**. Não apresenta ideias como tendências verificadas.
- Adaptação de referências para rascunhos por modelos de texto, usando público, oferta, tom e chamada para ação da marca. Sem IA conectada.
- Cadastros multicontas com prevenção de duplicação da mesma rede e @usuário.
- Incubadoras editoriais: checklist por conta, progresso persistente, pausa/retomada e geração revisável de pautas para sete dias.
- Aquecimento significa preparação editorial; o progresso não mede confiança de algoritmo e não promete alcance ou proteção contra bloqueios.
- Identidade da marca e modelos de bio editáveis.
- Detecção local de arquivos idênticos por SHA-256 (até 100 MB/arquivo).
- Conversão de PNG/JPEG/WebP para novo PNG sem copiar metadados originais (20 MB e 25 megapixels). Não remove marcas d'água ou processa vídeos.
- Preparação de até 100 respostas por lote, classificação simples por palavras-chave e revisão individual antes da exportação. Editar a resposta invalida a aprovação anterior.
- Métricas manuais com comparação de cliques, visualizações, interações, contatos e vendas informadas. Sem atribuição automática.
- Backup JSON v2 completo dos dados estruturados; importação validada com confirmação de substituição.
- Migração automática do armazenamento v1, preservando rascunhos e modelos de bio. O armazenamento original v1 não é apagado.
- Em caso de dados inválidos, o painel bloqueia sobrescritas comuns e oferece exportação dos dados originais para recuperação.

## Executar localmente

```sh
python3 -m http.server 8080 --directory public
```

Abra `http://localhost:8080`. Não há dependências de produção, framework ou etapa de build. O aplicativo usa APIs modernas do navegador (`dialog`, `localStorage`, `crypto.subtle`, `createImageBitmap`).

## Armazenamento e segurança

Os dados ficam em `vmcreatus-social-v2` no localStorage. Não há sincronização entre navegadores. Arquivos selecionados e respostas em revisão ficam apenas na sessão. Faça backups regulares. Não salve tokens, senhas ou informações sensíveis neste protótipo.

Todo texto do usuário é escapado antes de renderização. URLs do Radar exigem HTTPS sem credenciais. Backups são validados, inclusive tipos, limites, identificadores e relações entre conta e rede. A CSP bloqueia conexões de rede e scripts de terceiros. Não há coleta externa de dados pela aplicação.

## GitHub / Netlify

A publicação usa o repositório `vmanforte-cmd/vmcreatus-social`, branch `main`. O `netlify.toml` publica somente `public`, sem comando de build. `.netlify/` está em `.gitignore` para não versionar estado de vinculação. A configuração inclui CSP, bloqueio de embedding, no-sniff, referrer policy e noindex.

## Próximas etapas que exigem serviços externos

1. Configurar autenticação e banco de dados com isolamento por usuário/workspace, antes de armazenar dados de contas na nuvem.
2. Implementar OAuth, estado anti-CSRF de uso único, tokens criptografados, renovação e revogação.
3. Registrar e aprovar aplicativos para Instagram e TikTok. Validar a oferta de API do Kwai para o mercado e o caso de uso.
4. Contratar/autorizar fontes de tendências ou integrar fontes oficiais disponíveis. Vincular uma conta para publicar não fornece, por si só, acesso geral às tendências.
5. Implementar mídia privada, processamento assíncrono, publicação com idempotência e tentativas limitadas, auditoria e cancelamento.
6. Integrar métricas e webhooks autenticados, IA e atendimento com revisão. Não usar simulação de engajamento para aquecimento.

## Verificações realizadas nesta atualização

Fluxos: migração v1, cadastro multicontas, duplicação de @usuário, checklist e pausa, ciclo de sete dias, marca aplicada a roteiro, links inválidos rejeitados, escape de HTML, busca/duplicação de conteúdo, métricas, revisão de respostas, backup v2 e integridade ao excluir contas. A revisão de interface em desktop/mobile é feita antes da publicação.

## Referências

- TikTok: https://developers.tiktok.com/doc/content-posting-api-get-started
- Instagram: https://developers.facebook.com/docs/instagram-platform/
- Pesquisa de referências: https://ads.tiktok.com/business/creativecenter/
