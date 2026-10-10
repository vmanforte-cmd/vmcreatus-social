# VMCreatus Social — primeira versão local

Painel responsivo em português, sem dependências. Esta entrega é um protótipo funcional local, não uma plataforma de automação em produção. Não realiza chamadas às redes sociais.

## Executar

Na pasta do projeto: `python3 -m http.server 8080 --directory public`, depois abra `http://localhost:8080`.

## Funciona nesta versão

- Criar, editar, duplicar e excluir rascunhos.
- Associar rede, formato, legenda e data de planejamento.
- Pesquisar e filtrar conteúdos; visualizar calendário mensal.
- Salvar rascunhos e modelos de bio no localStorage deste navegador.
- Exportar e importar backup JSON (importação aditiva e validada).
- Criar e duplicar modelos locais de perfil.
- Detectar arquivos idênticos por SHA-256 em uma seleção local (até 100 MB por arquivo).
- Reencodar PNG/JPEG/WebP como PNG sem copiar os metadados originais (até 20 MB / 25 megapixels).
- Preparar até 100 respostas a comentários por lote a partir de um modelo e exportá-las para revisão, sem enviar.

## Não implementado / depende de integração

- Login, multiusuários, banco de dados e armazenamento persistente de mídia.
- OAuth, tokens, conexão de contas e publicação automática.
- Download de todos os conteúdos de uma conta. A biblioteca atual analisa arquivos selecionados pelo usuário.
- Clonagem de contas, seguidores ou identidade de terceiros. Modelos de bio são locais.
- Edição/remodelagem automática de vídeos e limpeza de metadados de vídeo.
- Recebimento de mensagens/comentários, IA e envio de respostas.
- Estatísticas das redes e agendador em segundo plano.

Os arquivos de mídia selecionados não persistem. Os dados locais não sincronizam entre dispositivos; use o backup. Não salve credenciais ou informações sensíveis neste protótipo. A data do calendário usa o fuso do dispositivo, sem motor de envio.

## GitHub e Netlify

Repositório: https://github.com/vmanforte-cmd/vmcreatus-social. A publicação no Netlify é uma etapa separada e deve ser verificada no painel do serviço.

No Netlify, importar o repositório `vmanforte-cmd/vmcreatus-social` pela equipe VMCREATUS. O `netlify.toml` define `public` como diretório publicado, sem comando de build. `.netlify/` está ignorada para não versionar o estado local de vinculação.

## Próximas etapas técnicas

1. Definir autenticação e banco de dados com isolamento por usuário e workspace.
2. Implementar OAuth com state de uso único, armazenamento criptografado de tokens, renovação e revogação.
3. Integrar Instagram conforme permissões oficiais; registrar aplicativo TikTok e concluir auditoria. Validar separadamente a disponibilidade de API do Kwai para o caso de uso brasileiro.
4. Implementar upload de mídia, limites, validação, armazenamento privado e processamento assíncrono.
5. Criar fila de publicação com idempotência, controle de taxas, retries limitados, histórico e cancelamento.
6. Implementar webhooks autenticados e atendimento revisável antes de habilitar envios.

Referência TikTok: https://developers.tiktok.com/doc/content-posting-api-get-started
Referência Instagram: https://developers.facebook.com/docs/instagram-platform/

Nenhum segredo é incluído nos arquivos. A configuração de rede do protótipo bloqueia conexões externas por CSP e deverá ser ajustada de modo restrito quando o backend existir.
