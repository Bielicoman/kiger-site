import './styles.css'
import './links.css'
import gsap from 'gsap'
import { CONTACT, SEASON, RELEASES, TEAM } from './data.js'

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const latestCover = SEASON[SEASON.length - 1]
const latestRelease = RELEASES[0]

const LINKS = [
  { label: 'Site oficial', sub: 'Portfólio completo', href: '/' },
  { label: `Novo cover: ${latestCover.title}`, sub: 'Gabriella Stehling · Temporada de Covers', href: `https://www.youtube.com/watch?v=${latestCover.id}`, hot: true },
  { label: `${latestRelease.title}`, sub: latestRelease.artist, href: `https://www.youtube.com/watch?v=${latestRelease.id}` },
  { label: 'YouTube', sub: '@kigerbr', href: CONTACT.youtube },
  { label: 'Instagram', sub: '@kiger.br', href: CONTACT.instagram },
  { label: 'Orçamento pelo WhatsApp', sub: CONTACT.whatsappLabel, href: `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Olá, KIGER! Vim pelo link da bio e quero conversar sobre um projeto.')}` },
  { label: 'E-mail', sub: CONTACT.email, href: `mailto:${CONTACT.email}` },
]

const list = document.getElementById('linksList')
for (const l of LINKS) {
  const a = document.createElement('a')
  a.className = 'lk' + (l.hot ? ' lk--hot' : '')
  a.href = l.href
  if (l.href.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener noreferrer' }
  const t = document.createElement('span'); t.className = 'lk__t'; t.textContent = l.label
  const s = document.createElement('span'); s.className = 'lk__s mono'; s.textContent = l.sub
  const ar = document.createElement('span'); ar.className = 'lk__a'; ar.setAttribute('aria-hidden', 'true'); ar.textContent = '→'
  const wrap = document.createElement('span'); wrap.append(t, s)
  a.append(wrap, ar)
  list.append(a)
}

const av = document.getElementById('avatars')
for (const m of TEAM) {
  const a = document.createElement('a')
  a.className = 'av'
  a.href = `https://instagram.com/${m.handle}`
  a.target = '_blank'; a.rel = 'noopener noreferrer'
  a.title = `${m.name} — ${m.role}`
  const img = document.createElement('img')
  img.src = m.img; img.alt = m.name; img.loading = 'lazy'
  const n = document.createElement('span'); n.className = 'mono'; n.textContent = m.name.split(' ')[0]
  a.append(img, n)
  av.append(a)
}

if (!reduce) {
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from('.links__logo', { clipPath: 'inset(0 100% 0 0)', duration: 1.4 })
    .from('.links__tag, .links__bio', { y: 20, opacity: 0, duration: 1, stagger: 0.1 }, 0.4)
    .from('.lk', { y: 30, opacity: 0, duration: 1, stagger: 0.07 }, 0.6)
    .from('.av', { scale: 0.6, opacity: 0, duration: 0.9, stagger: 0.04 }, 1)
}
