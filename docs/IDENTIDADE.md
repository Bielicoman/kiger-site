# Identidade visual KIGER — v2 (2026)

## Conceito: *noir de set*

O site se comporta como um monitor de câmera em um set escuro: moldura com cantos, timecode, `REC`,
grão de película e luz de tungstênio. O luxo vem da contenção — preto profundo, tipografia grande, um único acento quente.

## Assinatura: as três barras

O "E" do logotipo **KIG≡R** é formado por três barras. Elas viram o elemento gráfico da marca:
loader (barras que se estendem antes do logo), marcador de seção, separador do letreiro e indicador de rolagem.
Nunca redesenhar o logotipo — usar sempre `public/brand/kiger.svg` (vetorização fiel da arte oficial).

## Cores

| Token | Hex | Uso |
| --- | --- | --- |
| `--ink` | `#0B0A09` | fundo principal |
| `--ink-2` | `#13110F` | blocos alternados |
| `--bone` | `#EDE6DA` | texto e logo |
| `--bone-2` | `#CFC6B8` | texto secundário |
| `--mute` | `#8D857A` | legendas, metadados |
| `--amber` | `#E8A25C` | acento único (tungstênio) |
| `--rec` | `#E0452C` | só para o ponto de gravação |

## Tipografia

- **Archivo** (variável, largura 62%, peso 800, caixa alta) — títulos, como créditos de cinema.
- **Instrument Serif** itálico — a palavra de emoção dentro do título, sempre em âmbar.
- **JetBrains Mono** caixa alta espaçada — metadados técnicos (timecode, datas, rótulos).

## Movimento

- Curva padrão `cubic-bezier(0.16, 1, 0.3, 1)` (expo out). Nada linear, exceto o que acompanha o scroll.
- Revelações por cortina (clip-path) e por linha; nunca "fade" genérico.
- Respeitar `prefers-reduced-motion`.

## Fotografia da equipe

Fundo cinza-carvão, recorte de luz âmbar por trás, luz principal a 45°, lente 85 mm, uniforme KIGER
(camiseta e calça pretas, sem logotipo gerado por IA) e o equipamento da função de cada pessoa.
Os retratos foram gerados a partir de fotos reais de cada integrante; originais e versões em
`KIGER/Imagens/Equipe/` (`_fontes_instagram/` e `uniforme_v01/`).
