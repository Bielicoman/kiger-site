// Conteúdo do site KIGER. Para atualizar o portfólio, edite apenas este arquivo.
// Vídeos: use o ID do YouTube (parte depois de "watch?v=").

export const CONTACT = {
  whatsapp: '559491441635',
  whatsappLabel: '(94) 9144-1635',
  email: 'kigerprodutora@gmail.com',
  instagram: 'https://instagram.com/kiger.br',
  youtube: 'https://www.youtube.com/@kigerbr',
  linkedin: 'https://www.linkedin.com/in/gabson-sp-405422328/',
  city: 'São Paulo · Brasil',
}

// Temporada de Covers — Gabriella Stehling (ordem de lançamento)
export const SEASON = [
  { id: 'yrkck9BhKqo', title: 'Tu És' },
  { id: 'rQlMRuub6vo', title: 'Jeová Jireh' },
  { id: 'WeBx8Ewkm4I', title: 'Meu Respirar' },
  { id: '1YKP5mdZxoM', title: 'Entrego a Ti' },
  { id: 'iDxDd7ryPCk', title: 'Voltemos ao Início', date: '09.10.2026' },
  { id: '9sUFp9LfQlo', title: 'Ele É', feat: 'feat. Benjamin Montecinos', date: '16.10.2026' },
  { id: 'cEhSLkL_7rQ', title: 'Bondade de Deus', date: '30.10.2026' },
  { id: '9b0gwXJcsz4', title: 'Canção do Apocalipse', date: '07.11.2026' },
]

// Lançamentos recentes de outros artistas
export const RELEASES = [
  { id: 'Q7n0-f3aOgQ', title: 'Retirante', artist: 'Vocal Opostos ft. Gustavo Cordeiro', kind: 'Clipe oficial', date: '29.09.2026' },
  { id: 'JcD5r_bgqp4', title: 'Imperfeito', artist: 'Vocal Opostos ft. Emilly Catharine', kind: 'Clipe oficial', date: '14.08.2026' },
  { id: '3u7ubeXCTUI', title: 'Deixa', artist: 'Alice Rasec', kind: 'Live session', date: '26.06.2026' },
  { id: 'UM1d_jH0-eE', title: 'Pois Eu Bem Sei', artist: 'Alice Rasec', kind: 'Live session', date: '05.2026' },
]

export const CATEGORIES = ['Todos', 'Clipe', 'Cinema', 'Documentário', 'Reality', 'Casamento', 'Bastidores']

export const PORTFOLIO = [
  ...SEASON.map((s) => ({ id: s.id, title: s.title, artist: 'Gabriella Stehling', cat: 'Clipe', q: '4K' })),
  ...RELEASES.map((r) => ({ id: r.id, title: r.title, artist: r.artist, cat: 'Clipe', q: '4K' })),
  { id: 'p6SIYQ2c2Bw', title: 'Bárbara', artist: 'Curta-metragem', cat: 'Cinema', q: '4K' },
  { id: 'h5vbvGte3oM', title: 'O Peso das Palavras', artist: 'Curta-metragem', cat: 'Cinema', q: '4K' },
  { id: 'tDmjcjyw3cc', title: 'Eu, Você e Cristo', artist: 'Curta-metragem', cat: 'Cinema', q: '4K' },
  { id: 'bU2cVO3vUjw', title: 'Qual é o Seu Propósito?', artist: 'Documentário', cat: 'Documentário', q: '4K' },
  { id: 'NwesZCYbSx0', title: 'Cicatrizes', artist: 'Documentário', cat: 'Documentário', q: '4K' },
  { id: 'efa_PSKMHLk', title: 'O Oráculo', artist: 'Reality show', cat: 'Reality', q: '4K' },
  { id: 'njXorYxbRfU', title: 'Karoline & Winiston', artist: 'Filme de casamento', cat: 'Casamento', q: '4K' },
  { id: 'xee9PSqsymY', title: 'Deliberadamente', artist: 'Rodrigo Silva', cat: 'Clipe', q: '4K' },
  { id: 'ubIyjG5ezLg', title: 'Se Ele Não For o Primeiro', artist: 'Rodrigo Silva', cat: 'Clipe', q: '4K' },
  { id: '-jN-1HZuBlQ', title: 'Chegou a Hora', artist: 'Rodrigo Silva', cat: 'Clipe', q: '4K' },
  { id: 'Ocdq3_uzO4o', title: 'Ouço o Som', artist: 'Rodrigo Silva', cat: 'Clipe', q: '4K' },
  { id: 'D43qNYNIIOA', title: 'O Melhor de Mim', artist: 'Rodrigo Silva', cat: 'Clipe', q: '4K' },
  { id: 'MqIsul0I_to', title: 'Foi em Meu Lugar', artist: 'Rodrigo Silva', cat: 'Clipe', q: '4K' },
  { id: 'DAglqbQTK4c', title: 'Lembra', artist: 'Rodrigo Silva', cat: 'Clipe', q: '4K' },
  { id: '3QvjBGy1tMo', title: 'Somente a Ti', artist: 'Rodrigo Silva', cat: 'Clipe', q: '4K' },
  { id: 'wZKhJTfWJjE', title: 'E Se', artist: 'Alice Rasec', cat: 'Clipe', q: '4K', thumb: 'sddefault' },
  { id: 'htIKc_vVDt0', title: 'Hospedando Anjos Sem Saber', artist: 'Pedro Valença', cat: 'Clipe', q: 'HD' },
  { id: 'ijf0p0naTcg', title: 'Não Me Envergonho do Evangelho', artist: 'Pedro Valença', cat: 'Clipe', q: 'HD' },
  { id: 'mDa9Jx8_etU', title: 'Deus Sabe, Deus Ouve, Deus Vê', artist: 'Pedro Valença', cat: 'Clipe', q: 'HD' },
  { id: '-BrslQXsbgQ', title: 'Noites Traiçoeiras', artist: 'Pedro Valença', cat: 'Clipe', q: 'HD' },
  { id: 'UjLz0SMUHcE', title: 'Conhece Deus Meu Viver', artist: 'Pedro Valença', cat: 'Clipe', q: 'HD' },
  { id: 'wih6YUYYDJs', title: 'Cordeiro no Altar', artist: 'Pedro Valença', cat: 'Clipe', q: 'HD' },
  { id: 'ekMw5K4c8BA', title: 'Estrela do Senhor', artist: 'Pedro Valença', cat: 'Clipe', q: 'HD' },
  { id: 'CZMyydSDaq0', title: 'O Oráculo — Making Of', artist: 'Bastidores', cat: 'Bastidores', q: 'HD' },
  { id: 'lJT58HZHD7g', title: 'Cicatrizes — Making Of', artist: 'Bastidores', cat: 'Bastidores', q: 'HD' },
]

export const SERVICES = [
  { n: '01', t: 'Videoclipes', d: 'Do conceito à cor final. Direção, fotografia e montagem para artistas que querem imagem à altura da música.', img: 'https://i.ytimg.com/vi/Q7n0-f3aOgQ/maxresdefault.jpg' },
  { n: '02', t: 'Live sessions', d: 'Captação multicâmera ao vivo com áudio de estúdio. Performance real, acabamento de cinema.', img: 'https://i.ytimg.com/vi/UM1d_jH0-eE/maxresdefault.jpg' },
  { n: '03', t: 'Cinema & curtas', d: 'Narrativas de ficção com equipe completa: roteiro, arte, luz, som e finalização.', img: 'https://i.ytimg.com/vi/p6SIYQ2c2Bw/maxresdefault.jpg' },
  { n: '04', t: 'Documentários', d: 'Histórias reais contadas com respeito, pesquisa e ritmo de cinema.', img: 'https://i.ytimg.com/vi/NwesZCYbSx0/maxresdefault.jpg' },
  { n: '05', t: 'Institucionais', d: 'Filmes para marcas, museus e instituições que precisam comunicar propósito.', img: 'https://i.ytimg.com/vi/bU2cVO3vUjw/maxresdefault.jpg' },
  { n: '06', t: 'Eventos & casamentos', d: 'O dia inteiro guardado como filme — sem pose forçada, com emoção verdadeira.', img: 'https://i.ytimg.com/vi/njXorYxbRfU/maxresdefault.jpg' },
]

export const CLIENTS = [
  { name: 'Museu de Arqueologia Bíblica', logo: '/clients/mab-mono.webp' },
  { name: 'UNASP', logo: '/clients/unasp-mono.webp' },
  { name: 'Novo Tempo', logo: '/clients/novotempo-mono.webp' },
  { name: 'Prisma Brasil', logo: '/clients/prisma-mono.webp' },
  { name: 'Grupo Versos', logo: '/clients/versos-mono.webp' },
  { name: 'Entre Aspas', logo: '/clients/entre-aspas-mono.webp' },
]

export const ARTISTS = ['Gabriella Stehling', 'Vocal Opostos', 'Alice Rasec', 'Rodrigo Silva', 'Pedro Valença', 'Benjamin Montecinos', 'Emilly Catharine', 'Gustavo Cordeiro']

// Retratos gerados a partir de fotos reais de cada integrante, com o uniforme KIGER.
export const TEAM = [
  { name: 'Gabson Silva', role: 'Diretor geral · C.O.', handle: 'gabsonnn', img: '/team/gabson.webp' },
  { name: 'Giovanna Medeiros', role: 'Produção executiva & financeiro', handle: 'giiicrm', img: '/team/giovanna.webp' },
  { name: 'Thiago Bandeira', role: 'Direção de fotografia · captação & luz', handle: 'thiagoo_bandeira', img: '/team/thiago.webp' },
  { name: 'Nicolly Laubaka', role: 'Direção de arte', handle: 'nicollylaubakaa', img: '/team/nicolly.webp' },
  { name: 'Alex Ascencio', role: 'Head de edição & captação', handle: 'alexascencioai', img: '/team/alex.webp' },
  { name: 'Paulo Santana', role: 'Produção de linha', handle: 'paulinho.sant', img: '/team/paulo.webp' },
  { name: 'Leonardo Lima', role: 'Head de foto · making of', handle: 'leonardo.limaft', img: '/team/leonardo.webp' },
  { name: 'Sebastian Pérez', role: 'Assistência de luz', handle: '_sebastian.ps_', img: '/team/sebastian.webp' },
  { name: 'Larissa Roberta', role: 'Edição · assistência de produção', handle: 'larirobertaassuncao', img: '/team/larissa.webp' },
  { name: 'Nicoli Vieira', role: 'Projeto teórico · assistência de arte', handle: 'nicolifvlima', img: '/team/nicoli.webp' },
]

export const BACKSTAGE = Array.from({ length: 24 }, (_, i) => `/bastidores/${String(i + 1).padStart(2, '0')}.webp`)

export const thumb = (id, q = 'maxresdefault') => `https://i.ytimg.com/vi/${id}/${q}.jpg`
