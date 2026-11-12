import './styles.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { CONTACT, SEASON, RELEASES, PORTFOLIO, CATEGORIES, SERVICES, CLIENTS, ARTISTS, TEAM, BACKSTAGE, thumb } from './data.js'

gsap.registerPlugin(ScrollTrigger)
document.documentElement.classList.add('js')

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
const $ = (s, r = document) => r.querySelector(s)
const $$ = (s, r = document) => [...r.querySelectorAll(s)]

/** Cria elementos sem innerHTML (texto sempre como textContent). */
function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag)
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue
    if (k === 'class') el.className = v
    else if (k === 'dataset') Object.assign(el.dataset, v)
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v)
    else el.setAttribute(k, v === true ? '' : v)
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue
    el.append(c instanceof Node ? c : document.createTextNode(String(c)))
  }
  return el
}

const ytImg = (id, q) => {
  const img = h('img', { src: thumb(id, q || 'maxresdefault'), alt: '', loading: 'lazy', decoding: 'async' })
  img.addEventListener('error', () => {
    if (!img.dataset.fb) { img.dataset.fb = '1'; img.src = thumb(id, 'hqdefault') }
  })
  return img
}

/* ============ SMOOTH SCROLL ============ */
let lenis = null
if (!reduce) {
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  lenis.stop()
}
const scrollToTarget = (target) => {
  const el = typeof target === 'string' ? $(target) : target
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 })
  else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]')
  if (!a) return
  const id = a.getAttribute('href')
  if (id.length < 2) return
  e.preventDefault()
  closeMenu()
  scrollToTarget(id === '#top' ? document.body : id)
})

/* ============ BUILD: TEMPORADA ============ */
const seasonTrack = $('#seasonTrack')
SEASON.forEach((ep, i) => {
  seasonTrack.append(
    h('button', { class: 'ep card', type: 'button', 'data-play': ep.id, 'data-title': `${ep.title} — Gabriella Stehling`, 'aria-label': `Assistir ${ep.title}` },
      h('div', { class: 'ep__media' }, ytImg(ep.id), h('span', { class: 'ep__num' }, `EP ${String(i + 1).padStart(2, '0')}`)),
      h('div', { class: 'ep__meta' },
        h('h3', { class: 'ep__title' }, ep.title, ep.feat ? h('small', {}, ep.feat) : null),
        h('span', { class: 'ep__date mono' }, ep.date || '2026'),
      ),
    ),
  )
})

/* ============ BUILD: LANÇAMENTOS ============ */
const card = (v, { kind, extra } = {}) =>
  h('button', { class: 'card', type: 'button', 'data-play': v.id, 'data-title': `${v.title} — ${v.artist}`, 'data-cat': v.cat, 'aria-label': `Assistir ${v.title}` },
    h('div', { class: 'card__media' }, ytImg(v.id, v.thumb), v.q ? h('span', { class: 'card__q' }, v.q) : null),
    h('div', { class: 'card__body' },
      h('div', {}, kind ? h('span', { class: 'card__kind mono' }, kind) : null, h('h3', { class: 'card__title' }, v.title)),
      h('span', { class: 'card__artist mono' }, extra || v.artist),
    ),
  )
$('#releasesGrid').append(...RELEASES.map((r) => card({ ...r, q: '4K' }, { kind: `${r.kind} · ${r.date}`, extra: r.artist })))

/* ============ BUILD: PORTFÓLIO + FILTROS ============ */
const workGrid = $('#workGrid')
workGrid.append(...PORTFOLIO.map((v) => card(v)))
const filters = $('#filters')
CATEGORIES.forEach((c, i) => {
  const n = c === 'Todos' ? PORTFOLIO.length : PORTFOLIO.filter((p) => p.cat === c).length
  filters.append(h('button', { class: 'chip', type: 'button', role: 'tab', 'aria-selected': i === 0 ? 'true' : 'false', 'data-cat': c }, c, h('sup', {}, n)))
})
filters.addEventListener('click', (e) => {
  const b = e.target.closest('.chip')
  if (!b) return
  $$('.chip', filters).forEach((c) => c.setAttribute('aria-selected', c === b ? 'true' : 'false'))
  const cat = b.dataset.cat
  const cards = $$('.card', workGrid)
  const show = cards.filter((c) => cat === 'Todos' || c.dataset.cat === cat)
  cards.forEach((c) => c.classList.toggle('is-hidden', !show.includes(c)))
  if (!reduce) gsap.fromTo(show, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.04, overwrite: true })
  ScrollTrigger.refresh()
})

/* ============ BUILD: SERVIÇOS ============ */
$('#servicesList').append(
  ...SERVICES.map((s) =>
    h('li', { class: 'svc', 'data-img': s.img },
      h('span', { class: 'svc__n mono' }, s.n),
      h('h3', { class: 'svc__t' }, s.t),
      h('p', { class: 'svc__d' }, s.d),
    ),
  ),
)

/* ============ BUILD: CLIENTES / ARTISTAS ============ */
$('#logos').append(...CLIENTS.map((c) => h('figure', {}, h('img', { src: c.logo, alt: c.name, loading: 'lazy' }), h('figcaption', {}, c.name))))
const artists = $('#artists')
ARTISTS.forEach((a, i) => artists.append(h('span', {}, a), i < ARTISTS.length - 1 ? ' ' : '', i < ARTISTS.length - 1 ? h('b', {}, '///') : null, ' '))

/* ============ BUILD: EQUIPE ============ */
$('#teamGrid').append(
  ...TEAM.map((m) =>
    h('article', { class: 'member' },
      h('a', { class: 'member__media', href: `https://instagram.com/${m.handle}`, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${m.name} no Instagram` },
        h('img', { src: m.img, alt: `${m.name}, ${m.role}, com o uniforme KIGER`, loading: 'lazy', decoding: 'async' }),
        h('span', { class: 'member__ig mono' }, `@${m.handle}`),
      ),
      h('h3', { class: 'member__name' }, m.name),
      h('p', { class: 'member__role' }, m.role),
    ),
  ),
)

/* ============ BUILD: BASTIDORES ============ */
const half = Math.ceil(BACKSTAGE.length / 2)
const fillStrip = (el, list) => {
  const items = [...list, ...list] // duplicado para loop contínuo
  items.forEach((src, i) => el.append(h('button', { class: 'shot', type: 'button', 'data-shot': src, 'aria-label': `Ampliar foto de bastidores ${(i % list.length) + 1}`, tabindex: i >= list.length ? '-1' : null }, h('img', { src, alt: '', loading: 'lazy', decoding: 'async' }))))
}
fillStrip($('#stripA'), BACKSTAGE.slice(0, half))
fillStrip($('#stripB'), BACKSTAGE.slice(half))

/* ============ MANIFESTO: palavras ============ */
const mText = $('#manifestoText')
;(function splitWords(node) {
  for (const child of [...node.childNodes]) {
    if (child.nodeType === 3) {
      const frag = document.createDocumentFragment()
      child.textContent.split(/(\s+)/).forEach((p) => frag.append(/\s+/.test(p) || !p ? document.createTextNode(p) : h('span', { class: 'w' }, p)))
      child.replaceWith(frag)
    } else splitWords(child)
  }
})(mText)

/* ============ PLAYER ============ */
const player = $('#player')
const playerFrame = $('#playerFrame')
let lastFocus = null
function openPlayer(id, title) {
  lastFocus = document.activeElement
  playerFrame.replaceChildren(
    h('iframe', {
      src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
      title: title || 'Vídeo KIGER',
      allow: 'autoplay; encrypted-media; picture-in-picture; fullscreen',
      referrerpolicy: 'strict-origin-when-cross-origin',
    }),
  )
  $('#playerTitle').textContent = title || ''
  player.hidden = false
  lenis?.stop()
  document.body.style.overflow = 'hidden'
  if (!reduce) gsap.fromTo(player, { opacity: 0 }, { opacity: 1, duration: 0.4 })
  if (!reduce) gsap.fromTo('.player__box', { scale: 0.94, y: 30 }, { scale: 1, y: 0, duration: 0.8, ease: 'expo.out' })
  $('#playerClose').focus()
}
function closePlayer() {
  if (player.hidden) return
  player.hidden = true
  playerFrame.replaceChildren()
  document.body.style.overflow = ''
  lenis?.start()
  lastFocus?.focus?.()
}
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-play]')
  if (t) openPlayer(t.dataset.play, t.dataset.title)
})
$('#playerClose').addEventListener('click', closePlayer)
player.addEventListener('click', (e) => { if (e.target === player) closePlayer() })

/* ============ LIGHTBOX ============ */
const lightbox = $('#lightbox')
document.addEventListener('click', (e) => {
  const s = e.target.closest('[data-shot]')
  if (!s) return
  lastFocus = s
  $('#lightboxImg').src = s.dataset.shot
  lightbox.hidden = false
  lenis?.stop()
  $('#lightboxClose').focus()
})
const closeLightbox = () => { if (lightbox.hidden) return; lightbox.hidden = true; lenis?.start(); lastFocus?.focus?.() }
$('#lightboxClose').addEventListener('click', closeLightbox)
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox() })
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closePlayer(); closeLightbox(); closeMenu() } })

/* ============ MENU MÓVEL ============ */
const burger = $('#burger')
const menu = $('#menu')
function closeMenu() {
  if (menu.hidden) return
  menu.hidden = true
  burger.setAttribute('aria-expanded', 'false')
  burger.setAttribute('aria-label', 'Abrir menu')
  lenis?.start()
}
burger.addEventListener('click', () => {
  if (!menu.hidden) return closeMenu()
  menu.hidden = false
  burger.setAttribute('aria-expanded', 'true')
  burger.setAttribute('aria-label', 'Fechar menu')
  lenis?.stop()
  if (!reduce) gsap.fromTo($$('.menu nav a', menu), { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.05 })
})

/* ============ FORMULÁRIO → WHATSAPP ============ */
$('#contactForm').addEventListener('submit', (e) => {
  e.preventDefault()
  const f = e.currentTarget
  const data = Object.fromEntries(new FormData(f).entries())
  const err = $('#formError')
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email || '')
  if (!data.name?.trim() || !emailOk || !data.type || !data.message?.trim()) {
    err.textContent = 'Preencha nome, e-mail válido, tipo de projeto e mensagem.'
    err.hidden = false
    return
  }
  err.hidden = true
  const text = [
    '*Novo contato — site KIGER*',
    `*Nome:* ${data.name.trim()}`,
    `*E-mail:* ${data.email.trim()}`,
    `*Projeto:* ${data.type}`,
    `*Mensagem:* ${data.message.trim()}`,
  ].join('\n')
  window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
})

/* ============ HEADER ============ */
const header = $('#header')
let lastY = 0
const onScroll = (y) => {
  header.classList.toggle('is-scrolled', y > 40)
  const menuOpen = !menu.hidden
  header.classList.toggle('is-hidden', !menuOpen && y > lastY && y > 400)
  lastY = y
}
if (lenis) lenis.on('scroll', ({ scroll }) => onScroll(scroll))
else window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true })

// link ativo
;['temporada', 'trabalhos', 'servicos', 'equipe', 'bastidores'].forEach((id) => {
  const link = $(`.nav a[href="#${id}"]`)
  ScrollTrigger.create({ trigger: `#${id}`, start: 'top 50%', end: 'bottom 50%', onToggle: (s) => link?.classList.toggle('is-active', s.isActive) })
})

/* ============ TIMECODE ============ */
const video = $('#heroVideo')
const tc = $('#timecode')
let tcBase = 0
video.addEventListener('timeupdate', () => {
  const t = tcBase + video.currentTime
  const fr = Math.floor((t % 1) * 24)
  const s = Math.floor(t)
  const pad = (n) => String(n).padStart(2, '0')
  tc.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(fr)}`
})
video.addEventListener('seeked', () => { if (video.currentTime < 0.5) tcBase += video.duration || 0 })
// Mantém o vídeo pausado fora da tela (economia de bateria)
new IntersectionObserver(([e]) => { if (e.isIntersecting) video.play().catch(() => {}); else video.pause() }).observe(video)

/* ============ CURSOR + MAGNÉTICO ============ */
if (finePointer && !reduce) {
  const cur = $('#cursor')
  const label = $('#cursorLabel')
  const xTo = gsap.quickTo(cur, 'x', { duration: 0.35, ease: 'power3' })
  const yTo = gsap.quickTo(cur, 'y', { duration: 0.35, ease: 'power3' })
  window.addEventListener('pointermove', (e) => { cur.classList.add('is-on'); xTo(e.clientX); yTo(e.clientY) }, { passive: true })
  document.addEventListener('pointerover', (e) => {
    const play = e.target.closest('[data-play]')
    const shot = e.target.closest('[data-shot]')
    const link = e.target.closest('a, button, select, input, textarea, label')
    cur.classList.toggle('is-play', !!(play || shot))
    cur.classList.toggle('is-hover', !play && !shot && !!link)
    label.textContent = play ? 'PLAY' : shot ? 'VER' : ''
  })
  document.addEventListener('pointerleave', () => cur.classList.remove('is-on'))

  $$('[data-magnetic]').forEach((el) => {
    const mx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const my = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect()
      mx((e.clientX - r.left - r.width / 2) * 0.28)
      my((e.clientY - r.top - r.height / 2) * 0.35)
    })
    el.addEventListener('pointerleave', () => { mx(0); my(0) })
  })

  // imagem flutuante dos serviços
  const float = $('#servicesFloat')
  const floatImg = $('#servicesFloatImg')
  const fx = gsap.quickTo(float, 'x', { duration: 0.6, ease: 'power3' })
  const fy = gsap.quickTo(float, 'y', { duration: 0.6, ease: 'power3' })
  $$('.svc').forEach((row) => {
    row.addEventListener('pointerenter', () => {
      floatImg.src = row.dataset.img
      gsap.to(float, { opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out' })
    })
    row.addEventListener('pointerleave', () => gsap.to(float, { opacity: 0, scale: 0.85, duration: 0.4 }))
    row.addEventListener('pointermove', (e) => { fx(e.clientX); fy(e.clientY) })
  })
}

/* ============ ANIMAÇÕES ============ */
function setupScrollAnimations() {
  const mm = gsap.matchMedia()

  // vídeo do hero: leve zoom-out e parallax ao rolar
  gsap.to('.hero__video', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
  gsap.to('.hero__content', { yPercent: -18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })

  // ticker com velocidade dependente do scroll
  const ticker = $('#ticker')
  ticker.append(...[...ticker.children].map((n) => n.cloneNode(true)))
  const tickerTween = gsap.to(ticker, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 })
  ScrollTrigger.create({
    onUpdate: (s) => {
      const v = s.getVelocity()
      gsap.to(tickerTween, { timeScale: 1 + Math.min(Math.abs(v) / 300, 6) * Math.sign(v || 1), duration: 0.2, overwrite: true })
      gsap.to(tickerTween, { timeScale: 1, duration: 1.2, delay: 0.2, overwrite: false })
      gsap.to(ticker, { skewX: gsap.utils.clamp(-8, 8, v / -260), duration: 0.4, overwrite: 'auto' })
    },
  })

  // manifesto: palavras acendem com o scroll
  gsap.to($$('.w', mText), { opacity: 1, stagger: 0.04, ease: 'none', scrollTrigger: { trigger: mText, start: 'top 80%', end: 'bottom 45%', scrub: true } })

  // contadores
  $$('[data-count]').forEach((el) => {
    const end = +el.dataset.count
    const o = { v: 0 }
    gsap.to(o, { v: end, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true }, onUpdate: () => (el.textContent = Math.round(o.v)) })
  })

  // temporada: scroll horizontal fixado (desktop)
  mm.add('(min-width: 761px)', () => {
    const track = $('#seasonTrack')
    const dist = () => track.scrollWidth - window.innerWidth
    const tween = gsap.to(track, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: { trigger: '.season', start: 'top top', end: () => '+=' + dist(), pin: '.season__pin', scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
    })
    gsap.to('#seasonBar', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.season', start: 'top top', end: () => '+=' + dist(), scrub: true } })
    $$('.ep', track).forEach((ep) => {
      gsap.fromTo(ep.querySelector('img'), { xPercent: -6 }, { xPercent: 6, ease: 'none', scrollTrigger: { trigger: ep, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } })
    })
  })

  // títulos de seção: revelação por linha
  $$('.display, .contact__title').forEach((t) => {
    gsap.from(t, { yPercent: 40, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: t, start: 'top 88%' } })
  })
  $$('.section__label').forEach((l) => {
    gsap.from(l.querySelectorAll('.tri i'), { scaleX: 0, stagger: 0.08, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: l, start: 'top 90%' } })
  })

  // cards: cortina (clip-path) + parallax interno
  $$('.card, .ep').forEach((c) => {
    const media = c.querySelector('.card__media, .ep__media')
    if (!c.classList.contains('ep')) {
      gsap.fromTo(media, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 90%' } })
      gsap.from(c.querySelector('.card__body'), { y: 24, opacity: 0, duration: 1, delay: 0.15, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 90%' } })
      gsap.fromTo(media.querySelector('img'), { yPercent: -8 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: c, start: 'top bottom', end: 'bottom top', scrub: true } })
    }
  })

  // serviços
  $$('.svc').forEach((s) => gsap.from(s, { y: 50, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: s, start: 'top 92%' } }))

  // logos
  gsap.from('.logos figure', { opacity: 0, y: 30, stagger: 0.07, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.logos', start: 'top 85%' } })

  // equipe
  $$('.member').forEach((m, i) => {
    gsap.fromTo(m.querySelector('.member__media'), { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out', delay: (i % 5) * 0.06, scrollTrigger: { trigger: m, start: 'top 92%' } })
    gsap.from(m.querySelector('img'), { scale: 1.25, duration: 1.8, ease: 'expo.out', delay: (i % 5) * 0.06, scrollTrigger: { trigger: m, start: 'top 92%' } })
  })

  // bastidores: faixas infinitas em sentidos opostos, aceleram com o scroll
  $$('.strip').forEach((s) => {
    const track = s.querySelector('.strip__track')
    const dir = +s.dataset.dir
    const tw = gsap.fromTo(track, { xPercent: dir < 0 ? 0 : -50 }, { xPercent: dir < 0 ? -50 : 0, duration: 60, ease: 'none', repeat: -1 })
    s.addEventListener('pointerenter', () => gsap.to(tw, { timeScale: 0.15, duration: 0.6 }))
    s.addEventListener('pointerleave', () => gsap.to(tw, { timeScale: 1, duration: 0.6 }))
    ScrollTrigger.create({ trigger: s, start: 'top bottom', end: 'bottom top', onUpdate: (st) => gsap.to(tw, { timeScale: 1 + Math.min(Math.abs(st.getVelocity()) / 400, 4), duration: 0.3, overwrite: true }) })
  })

  // logo gigante do rodapé
  gsap.fromTo('.footer__logo', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top 95%', end: 'bottom bottom', scrub: true } })
}

/* ============ LOADER → INTRO ============ */
function intro() {
  const loader = $('#loader')
  const done = () => {
    loader.classList.add('is-done')
    document.body.classList.remove('is-loading')
    lenis?.start()
    ScrollTrigger.refresh()
  }
  if (reduce) {
    $$('.reveal-up').forEach((e) => (e.style.cssText = 'opacity:1;transform:none'))
    done()
    return
  }
  const count = $('#loaderCount')
  const c = { v: 0 }
  const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } })
  tl.to('.tri--loader i', { scaleX: 1, duration: 0.9, stagger: 0.12, ease: 'expo.out' })
    .to(c, { v: 100, duration: 1.6, ease: 'power2.inOut', onUpdate: () => (count.textContent = String(Math.round(c.v)).padStart(3, '0')) }, 0)
    .to('.loader__logo', { clipPath: 'inset(0 0% 0 0)', duration: 1.1 }, 0.5)
    .to('.tri--loader i', { scaleX: 0, transformOrigin: 'right center', duration: 0.6, stagger: 0.06 }, 1.5)
    .to('.loader__core', { opacity: 0, y: -10, duration: 0.5, ease: 'power2.in' }, 1.9)
    .to('.loader__panel--top', { yPercent: -100, duration: 1.2 }, 2.1)
    .to('.loader__panel--bottom', { yPercent: 100, duration: 1.2 }, 2.1)
    .fromTo('.hero__video', { scale: 1.35 }, { scale: 1.12, duration: 2.4, ease: 'expo.out' }, 2.1)
    .from('.hero__title .word', { yPercent: 115, rotate: 3, duration: 1.4, stagger: 0.07, ease: 'expo.out' }, 2.45)
    .to('.reveal-up', { opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: 'expo.out' }, 2.7)
    .from('.hud, .corner, .header', { opacity: 0, duration: 1, stagger: 0.03, ease: 'power2.out' }, 2.8)
    .add(done, 2.6)
}

setupScrollAnimations()
if (document.readyState === 'complete') intro()
else window.addEventListener('load', intro, { once: true })
// segurança: nunca deixar o site travado no loader
setTimeout(() => { if (document.body.classList.contains('is-loading')) { $('#loader').classList.add('is-done'); document.body.classList.remove('is-loading'); lenis?.start(); $$('.reveal-up').forEach((e) => (e.style.cssText = 'opacity:1;transform:none')) } }, 6000)
