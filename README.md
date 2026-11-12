# KIGER — site oficial

Site da **KIGER Produções Audiovisuais** (São Paulo): videoclipes, live sessions, cinema, documentários e institucionais.

**No ar:** https://kiger-site.vercel.app · bio do Instagram: https://kiger-site.vercel.app/links

## Tecnologia

- [Vite](https://vite.dev) (site estático, multipágina: `/`, `/links`, `404`)
- [GSAP](https://gsap.com) + ScrollTrigger para animações
- [Lenis](https://lenis.darkroom.engineering) para rolagem suave
- Fontes auto-hospedadas via Fontsource (Archivo, Instrument Serif, JetBrains Mono)
- Hospedagem: Vercel, publicação automática a cada push na branch `main`

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # serve dist/
```

## Atualizar o conteúdo

Quase tudo está em **`src/data.js`**:

| O que mudar | Onde |
| --- | --- |
| Novo episódio da Temporada de Covers | `SEASON` (ID do YouTube + título) |
| Novo clipe de outro artista | `RELEASES` |
| Arquivo / portfólio completo | `PORTFOLIO` (categoria em `cat`) |
| Equipe | `TEAM` + imagem em `public/team/` (WEBP, 900 px de largura, 3:4) |
| Clientes | `CLIENTS` + logo monocromático em `public/clients/` |
| Fotos de bastidores | `public/bastidores/NN.webp` (e a quantidade em `BACKSTAGE`) |
| Contatos | `CONTACT` |

O ID do YouTube é o trecho depois de `watch?v=`. A miniatura é puxada automaticamente.

O vídeo do topo (`public/media/hero.mp4`) é um reel de ~18 s montado com FFmpeg a partir dos masters da Temporada de Covers
(1600×900, H.264, sem áudio, `+faststart`).

## Estrutura

```
index.html          página principal
links/index.html    página de links (bio)
404.html            página de erro
src/main.js         montagem do conteúdo e animações
src/data.js         todo o conteúdo editável
src/styles.css      sistema visual (tokens, componentes, responsivo)
public/             logo, vídeo, retratos, logos de clientes, bastidores, OG image
vercel.json         build, URLs limpas e cabeçalhos de segurança
docs/IDENTIDADE.md  guia rápido da identidade visual
```

## Acessibilidade e desempenho

- Respeita `prefers-reduced-motion` (desliga animações, grão e rolagem suave).
- Navegação por teclado, foco visível, `Esc` fecha player/menu, link "pular para o conteúdo".
- Imagens com `loading="lazy"`, vídeo do topo pausa fora da tela, YouTube só carrega no clique.

## Licença

Código sob [MIT](LICENSE). Marca, vídeos, fotos e retratos: © KIGER — todos os direitos reservados.
Veja também [SECURITY.md](SECURITY.md) e [CHANGELOG.md](CHANGELOG.md).
