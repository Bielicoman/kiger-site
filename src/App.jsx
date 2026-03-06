import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';

// --- DADOS DO SEU PORTFÓLIO ---
const PROJECTS = [
  { id: 1, title: "CICATRIZES", category: "Documentário", quality: "4K", img: "https://img.youtube.com/vi/NwesZCYbSx0/maxresdefault.jpg", url: "https://www.youtube.com/embed/NwesZCYbSx0" },
  { id: 2, title: "SAUDADE", category: "Videoclipe", quality: "4K", img: "https://img.youtube.com/vi/Mul19Lfeo7Y/maxresdefault.jpg", url: "https://www.youtube.com/embed/Mul19Lfeo7Y" },
  { id: 3, title: "O ORÁCULO", category: "Reality Show", quality: "HD", img: "https://img.youtube.com/vi/efa_PSKMHLk/maxresdefault.jpg", url: "https://www.youtube.com/embed/efa_PSKMHLk" },
  { id: 4, title: "BÁRBARA", category: "Cinema", quality: "4K", img: "https://img.youtube.com/vi/p6SIYQ2c2Bw/maxresdefault.jpg", url: "https://www.youtube.com/embed/p6SIYQ2c2Bw" },
  { id: 5, title: "O PESO DAS PALAVRAS", category: "Cinema", quality: "4K", img: "https://img.youtube.com/vi/h5vbvGte3oM/maxresdefault.jpg", url: "https://www.youtube.com/embed/h5vbvGte3oM" },
  { id: 6, title: "MAKING OF | CICATRIZES", category: "Bastidores", quality: "HD", img: "https://img.youtube.com/vi/lJT58HZHD7g/maxresdefault.jpg", url: "https://www.youtube.com/embed/lJT58HZHD7g" },
  { id: 7, title: "LEMBRA", category: "Videoclipe", quality: "4K", img: "https://img.youtube.com/vi/DAglqbQTK4c/maxresdefault.jpg", url: "https://www.youtube.com/embed/DAglqbQTK4c" },
  { id: 8, title: "PRISMA BRASIL | EUA", category: "Turnê", quality: "4K", img: "https://img.youtube.com/vi/g2MK7F0Adqc/maxresdefault.jpg", url: "https://www.youtube.com/embed/g2MK7F0Adqc" },
];

// Usei logos de texto para garantir que funcione sem imagens, mas você pode trocar por <img>
const CLIENTS = ["NOVO TEMPO", "UNASP", "PRISMA BRASIL", "MAB", "CALIFORNIA DREAMS", "KIGER"];

const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'Documentário', name: 'Docs' },
  { id: 'Videoclipe', name: 'Clipes' },
  { id: 'Cinema', name: 'Cinema' },
  { id: 'Bastidores', name: 'Bastidores' }
];

// --- COMPONENTES ---

// 1. O CARD 3D (Reativo à Luz)
const TiltCard = ({ project, onClick }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: (x / box.width) * 100, y: (y / box.height) * 100, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ ...glare, opacity: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative aspect-video rounded-xl overflow-hidden cursor-none group bg-zinc-900 border border-white/10"
      onClick={() => onClick(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />

      {/* Glare (Luz do Mouse) */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          opacity: glare.opacity
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6">
        <span className="text-[10px] uppercase tracking-widest text-[#2997FF] font-bold mb-2">{project.category}</span>
        <h3 className="text-xl font-bold text-white font-['Outfit']">{project.title}</h3>
      </div>
    </motion.div>
  );
};

// 2. BOTÃO SOCIAL GLASS
const SocialBtn = ({ href, icon, label, color }) => {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      className="relative w-[200px] py-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 overflow-hidden group cursor-none"
      style={{ borderColor: hover ? color : 'rgba(255,255,255,0.05)' }}
    >
      {/* Luz de fundo */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}20, transparent 70%)` }} />

      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors duration-300" style={{ background: hover ? color : 'rgba(255,255,255,0.1)', color: hover ? '#fff' : '#888' }}>
        {icon}
      </div>
      <span className="text-sm font-bold text-white z-10">{label}</span>
    </a>
  );
};

// --- APP PRINCIPAL ---
export default function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Rotação do Hero
  useEffect(() => {
    const interval = setInterval(() => setCurrentHeroIndex(prev => (prev + 1) % 4), 6000); // Roda entre os 4 primeiros
    return () => clearInterval(interval);
  }, []);

  // Mouse e Scroll
  useEffect(() => {
    const handleMouseMove = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => { window.removeEventListener("mousemove", handleMouseMove); window.removeEventListener("scroll", handleScroll); };
  }, [mouseX, mouseY]);

  // Helpers de Cursor
  const setPtr = () => setCursorVariant("pointer");
  const setDef = () => setCursorVariant("default");

  const filteredProjects = selectedCategory === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-[#050505] text-white min-h-screen font-['Outfit'] overflow-x-hidden selection:bg-[#2997FF] selection:text-white">
      {/* Importação de Fontes e CSS Global */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700;900&family=Inter:wght@300;400;600&display=swap');
        body, a, button { cursor: none !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        /* Textura de Filme */
        .film-grain { position: fixed; inset: 0; pointer-events: none; z-index: 50; opacity: 0.05; background-image: url("https://grainy-gradients.vercel.app/noise.svg"); mix-blend-mode: overlay; }
      `}</style>

      <div className="film-grain"></div>

      {/* CURSOR ORB (LUZ) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-overlay hidden md:block"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: cursorVariant === "pointer" ? 600 : 400,
          height: cursorVariant === "pointer" ? 600 : 400,
          backgroundColor: cursorVariant === "pointer" ? "rgba(41, 151, 255, 0.15)" : "rgba(41, 151, 255, 0.08)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      >
        <div className="w-full h-full rounded-full blur-3xl bg-radial-gradient" />
      </motion.div>

      {/* Ponto Central do Mouse */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
      />

      {/* NAV FLUTUANTE */}
      <nav className={`fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 rounded-full border transition-all duration-500 flex justify-between items-center px-8 h-16 ${scrolled ? 'bg-black/60 border-white/10 backdrop-blur-xl' : 'bg-transparent border-transparent'}`}>
        <div className="font-['Outfit'] font-black text-xl tracking-tighter">ALEX<span className="text-zinc-600">.KIGER</span></div>
        <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-zinc-400">
          {['Portfolio', 'Sobre', 'Contato'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onMouseEnter={setPtr} onMouseLeave={setDef} className="hover:text-white transition-colors">{item}</a>
          ))}
        </div>
      </nav>

      {/* HOME HERO ROTATIVO */}
      <header className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHeroIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <img src={PROJECTS[currentHeroIndex].img} className="w-full h-full object-cover opacity-60" alt="Hero" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 text-center max-w-4xl px-6 pt-20">
          <motion.div
            key={`text-${currentHeroIndex}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[#2997FF] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Kiger Productions Presents</span>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl">
              {PROJECTS[currentHeroIndex].title}
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto mb-8 font-light">
              Uma experiência visual imersiva. Direção e edição que transformam ideias em cinema.
            </p>
            <button
              onClick={() => setSelectedVideo(PROJECTS[currentHeroIndex])}
              onMouseEnter={setPtr} onMouseLeave={setDef}
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform"
            >
              Assistir Agora
            </button>
          </motion.div>
        </div>
      </header>

      {/* MARQUEE DE CLIENTES */}
      <section className="py-16 border-y border-white/5 bg-black/50 overflow-hidden relative">
        <div className="flex w-max animate-[scroll_20s_linear_infinite] gap-20 items-center">
          {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
            <span key={i} className="text-4xl font-black text-zinc-800 uppercase tracking-tighter select-none whitespace-nowrap">
              {client} <span className="text-zinc-900 mx-4">•</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33%); } }`}</style>
      </section>

      {/* EM BREVE / NOVOS PROJETOS */}
      <section className="py-24 px-6 md:px-20 max-w-[1600px] mx-auto pb-0">
        <div className="mb-12">
          <h2 className="text-6xl font-black uppercase tracking-tighter mb-4">Em Breve</h2>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Novos Projetos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="relative aspect-video rounded-xl overflow-hidden cursor-none group bg-zinc-900/40 border border-white/10 flex flex-col items-center justify-center transition-all hover:bg-zinc-900/60 hover:border-white/20">
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,#fff_25%,transparent_25%,transparent_50%,#fff_50%,#fff_75%,transparent_75%,transparent_100%)] bg-[length:20px_20px] pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>

            <div className="z-10 flex flex-col justify-center items-center absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
              <svg className="w-10 h-10 text-white/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 text-left z-20">
              <span className="text-[10px] uppercase tracking-widest text-[#2997FF] font-bold mb-2 block">Em Produção</span>
              <h3 className="text-xl font-bold text-white font-['Outfit']">Projeto Gabriella Stehling</h3>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section id="portfolio" className="py-24 px-6 md:px-20 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-6xl font-black uppercase tracking-tighter mb-4">Portfólio</h2>
            <p className="text-zinc-500">Projetos selecionados 2024 — 2026</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                onMouseEnter={setPtr} onMouseLeave={setDef}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${selectedCategory === cat.id ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p) => (
            <TiltCard key={p.id} project={p} onClick={setSelectedVideo} />
          ))}
        </div>
      </section>

      {/* SOBRE (GLASS MONOLITH) */}
      <section id="sobre" className="py-24 px-6 flex justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2997FF]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-6xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row gap-16 items-center relative z-10">
          <div className="w-full md:w-1/3 aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 relative group">
            <img src="/alex.jpg" alt="Alex Ascencio" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
          </div>

          <div className="flex-1">
            <span className="text-[#2997FF] font-bold tracking-widest uppercase text-sm mb-4 block">Filmmaker & Visionário</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
              Alex<br />Ascencio<span className="text-zinc-600">.</span>
            </h2>
            <p className="text-lg text-zinc-400 font-light leading-relaxed mb-8 font-['Inter']">
              Olá, sou <strong>Biel</strong>. Com mais de 5 anos de experiência, transformo ideias complexas em experiências visuais cinematográficas.
              <br /><br />
              Premiado na <strong>EXPOCOM 2025</strong> e com experiência internacional na turnê do <strong>Prisma Brasil</strong>, meu foco é unir técnica de ponta com narrativas que tocam a alma.
            </p>
            <div className="flex gap-4">
              <span className="px-4 py-2 border border-white/10 rounded-full text-xs text-zinc-400">🏆 Vencedor EXPOCOM</span>
              <span className="px-4 py-2 border border-white/10 rounded-full text-xs text-zinc-400">🌎 Prisma Brasil</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-24 px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16">Iniciar Projeto</h2>

        <div className="flex flex-wrap justify-center gap-6 mb-20">
          <SocialBtn href="https://wa.me/5515997569880" color="#25D366" label="WhatsApp" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.8.48 3.5 1.32 5L2 22l5.18-1.35C8.6 21.55 10.27 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" /></svg>} />
          <SocialBtn href="https://instagram.com/alexgabriel_ascencio" color="#E1306C" label="Instagram" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>} />
          <SocialBtn href="https://www.linkedin.com/in/ascencioalexgabriel/" color="#0077B5" label="LinkedIn" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>} />
        </div>

        <div className="max-w-xl mx-auto text-left bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
          <h3 className="text-xl font-bold mb-6">Ou envie um e-mail direto</h3>
          <form action={`mailto:${"ascencioalexgabriel@gmail.com"}`} method="post" encType="text/plain" className="space-y-4">
            <input type="text" name="name" placeholder="NOME" className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-zinc-500 focus:border-[#2997FF] outline-none transition-colors" required onMouseEnter={setPtr} onMouseLeave={setDef} />
            <input type="email" name="email" placeholder="E-MAIL" className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-zinc-500 focus:border-[#2997FF] outline-none transition-colors" required onMouseEnter={setPtr} onMouseLeave={setDef} />
            <textarea name="message" placeholder="MENSAGEM" rows="4" className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-zinc-500 focus:border-[#2997FF] outline-none transition-colors" required onMouseEnter={setPtr} onMouseLeave={setDef} />
            <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-[#2997FF] hover:text-white transition-colors uppercase tracking-widest text-sm" onMouseEnter={setPtr} onMouseLeave={setDef}>Enviar Proposta</button>
          </form>
        </div>
      </section>

      {/* MODAL DE VÍDEO */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative">
              <iframe src={`${selectedVideo.url}?autoplay=1`} className="w-full h-full" frameBorder="0" allowFullScreen allow="autoplay" />
              <button className="absolute top-4 right-4 text-white/50 hover:text-white text-xs uppercase font-bold tracking-widest" onClick={() => setSelectedVideo(null)}>Fechar [X]</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 border-t border-white/5 text-center text-zinc-600 text-xs uppercase tracking-widest">
        © 2026 KIGER PRODUCTIONS. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}