# Segurança

## Como reportar uma vulnerabilidade

Envie um e-mail para **kigerprodutora@gmail.com** com o assunto `SEGURANÇA — site`.
Descreva o problema, como reproduzir e o impacto. Não abra issue pública para falhas de segurança.
Respondemos em até 7 dias.

## O que o site faz para se proteger

- **Site estático**: não há servidor, banco de dados, login nem coleta de dados. O formulário de contato
  apenas monta uma mensagem e abre o WhatsApp no aparelho do visitante; nada é enviado para servidores da KIGER.
- **Content-Security-Policy** restrita (`vercel.json`): scripts só do próprio domínio, imagens só do próprio
  domínio e de `i.ytimg.com`, vídeos embutidos só via `youtube-nocookie.com`, nenhuma fonte externa.
- **Fontes auto-hospedadas** (sem Google Fonts): nenhum IP de visitante é repassado a terceiros ao carregar a página.
- **YouTube em modo de privacidade aprimorada** (`youtube-nocookie.com`), carregado só quando o visitante clica.
- Cabeçalhos `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy` e `Permissions-Policy` (câmera, microfone e localização bloqueados).
- Nenhum `innerHTML` com dados: todo o conteúdo dinâmico é criado com `textContent`.
- Links externos com `rel="noopener noreferrer"`.
- Dependências mínimas (GSAP, Lenis e fontes) e `npm audit` sem vulnerabilidades na data da versão 2.0.0.

## Manutenção

Rode `npm audit` a cada atualização de dependências e mantenha a CSP alinhada com qualquer novo serviço externo.
