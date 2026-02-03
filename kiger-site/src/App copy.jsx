import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useVelocity, useAcceleration } from 'framer-motion';

// --- ANIMAÇÃO DE REVELAÇÃO CINEMATOGRÁFICA ---
const CinematicReveal = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
    whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const containerRef = useRef(null);

  // Lógica de Scroll Progressivo e Velocidade para Tipografia Dinâmica
  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  const skew = useTransform(scrollVelocity, [-1, 1], [-20, 20]);
  const springSkew = useSpring(skew, { stiffness: 1000, damping: 100 });

  const portfolio = [
    { id: "01", title: "O PROPÓSITO", cat: "MINI DOC", thumb: "https://img.youtube.com/vi/bU2cVO3vUjw/maxresdefault.jpg", url: "https://www.youtube.com/embed/bU2cVO3vUjw" },
    { id: "02", title: "BÁRBARA", cat: "CINEMA", thumb: "https://img.youtube.com/vi/p6SIYQ2c2Bw/maxresdefault.jpg", url: "https://www.youtube.com/embed/p6SIYQ2c2Bw" },
    { id: "03", title: "CICATRIZES", cat: "DOCUMENTÁRIO", thumb: "https://img.youtube.com/vi/NwesZCYbSx0/maxresdefault.jpg", url: "https://www.youtube.com/embed/NwesZCYbSx0" },
    { id: "04", title: "ORÁCULO", cat: "REALITY SHOW", thumb: "https://img.youtube.com/vi/efa_PSKMHLk/maxresdefault.jpg", url: "https://www.youtube.com/embed/efa_PSKMHLk" },
  ];

  return (
    <div ref={containerRef} className="bg-[#020202] text-[#fafafa] selection:bg-[#ff0000] selection:text-white overflow-x-hidden">

      {/* OVERLAY DE GRÃO DE CINEMA (Textura 2026) */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://media.giphy.com/media/oEI9uWUic9ZfHiqjIc/giphy.gif')]" />

      {/* NAV MINIMALISTA DE ALTO IMPACTO */}
      <nav className="fixed top-0 w-full z-50 p-10 flex justify-between items-end border-b border-white/5 backdrop-blur-3xl">
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.5em] text-zinc-500 mb-1">PROD. HOUSE</span>
          <h1 className="text-2xl font-black tracking-tighter leading-none">KIGER<span className="text-red-600">.</span></h1>
        </div>
        <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em] font-medium">
          <a href="#work" className="hover:text-red-600 transition-colors">Work</a>
          <a href="#about" className="hover:text-red-600 transition-colors">Vision</a>
          <a href="#contact" className="hover:text-red-600 transition-colors">Connect</a>
        </div>
      </nav>

      {/* HERO: ABERTURA DE FILME */}
      <section className="h-[120vh] flex flex-col justify-center items-center relative">
        <motion.div
          style={{ skewX: springSkew }}
          className="text-center z-10"
        >
          <CinematicReveal>
            <h2 className="text-[22vw] font-black leading-[0.75] tracking-tighter uppercase">
              Kiger
            </h2>
          </CinematicReveal>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }}
            className="mt-10 text-[10px] tracking-[1.2em] uppercase text-zinc-400 ml-[1.2em]"
          >
            The Art of Visual Silence
          </motion.p>
        </motion.div>

        {/* BACKGROUND VIDEO/IMAGE PARALLAX */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 200]) }}
          className="absolute inset-0 opacity-20 grayscale pointer-events-none"
        >
          <img src="/gabson.jpg" className="w-full h-full object-cover" alt="Background" />
        </motion.div>
      </section>

      {/* WORK: O REEL EM MOVIMENTO */}
      <section id="work" className="py-60 px-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-end mb-40 border-l-2 border-red-600 pl-10">
            <h3 className="text-[10vw] font-bold leading-none tracking-tighter">THE<br />REEL<span className="text-zinc-800 italic">26</span></h3>
            <p className="max-w-xs text-xs text-zinc-500 tracking-widest leading-loose uppercase">
              Cada projeto é um experimento em luz, som e tempo.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-60">
            {portfolio.map((item, i) => (
              <CinematicReveal key={item.id}>
                <div
                  className={`group relative flex flex-col ${i % 2 !== 0 ? 'md:items-end' : 'md:items-start'}`}
                  onClick={() => setSelectedVideo(item)}
                >
                  <div className="relative w-full md:w-[70%] aspect-video overflow-hidden cursor-none">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                      className="w-full h-full"
                    >
                      <img src={item.thumb} className="w-full h-full object-cover transition-all group-hover:grayscale-0 grayscale-[0.8]" alt={item.title} />
                      <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>

                    {/* PLAY BUTTON INTERATIVO DENTRO DA BOX */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100">
                      <div className="w-24 h-24 rounded-full border border-white flex items-center justify-center backdrop-blur-sm">
                        <span className="text-[10px] tracking-widest font-bold">PLAY</span>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-10 ${i % 2 !== 0 ? 'text-right' : 'text-left'}`}>
                    <span className="text-[10px] font-mono text-red-600 mb-2 block">{item.id} // {item.cat}</span>
                    <h4 className="text-5xl md:text-7xl font-black tracking-tighter uppercase group-hover:italic transition-all">{item.title}</h4>
                  </div>
                </div>
              </CinematicReveal>
            ))}
          </div>
        </div>
      </section>

      {/* VISION: O DIRETOR (ESTILO SAND BLACK) */}
      <section id="about" className="h-screen flex items-center bg-[#050505] px-6 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-20 items-center max-w-[1400px] mx-auto">
          <div className="relative">
            <motion.div
              style={{ rotate: useTransform(scrollYProgress, [0.5, 1], [0, 10]) }}
              className="aspect-[3/4] overflow-hidden rounded-sm"
            >
              <img src="/gabson.jpg" className="w-full h-full object-cover grayscale" alt="Gabson" />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 text-[10vw] font-black text-white/5 select-none">VISION</div>
          </div>
          <div className="space-y-10">
            <h3 className="text-6xl font-bold tracking-tighter uppercase italic">Gabson Silva<span className="text-red-600">.</span></h3>
            <p className="text-zinc-400 text-xl leading-relaxed tracking-tight">
              Não fazemos vídeos. Criamos artefatos visuais. A KIGER nasceu da obsessão pelo detalhe que ninguém vê, mas todo mundo sente.
            </p>
            <div className="pt-10 border-t border-white/10">
              <a href="https://instagram.com/gabsonnn" target="_blank" className="text-[10px] font-bold tracking-[0.5em] uppercase hover:text-red-600 transition-colors">
                Explore o Mindset →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER: O CORTE FINAL */}
      <footer id="contact" className="py-60 px-6 text-center bg-[#020202]">
        <CinematicReveal>
          <span className="text-[10px] tracking-[0.8em] text-zinc-600 mb-10 block ml-[0.8em]">DISPONÍVEL PARA PROJETOS GLOBAIS</span>
          <h2 className="text-[12vw] font-black tracking-tighter leading-none mb-20">KIGER<br />STUDIO</h2>
          <div className="flex flex-col md:flex-row justify-center gap-20 items-center">
            <a href="mailto:contato@kiger.com.br" className="text-xl font-light hover:italic transition-all border-b border-white/10 pb-2">contato@kiger.com.br</a>
            <div className="flex gap-10">
              <a href="https://instagram.com/kiger.br" className="text-[10px] tracking-widest font-bold uppercase hover:text-red-600 transition-colors">Instagram</a>
              <a href="#" className="text-[10px] tracking-widest font-bold uppercase hover:text-red-600 transition-colors">Vimeo</a>
            </div>
          </div>
        </CinematicReveal>
        <div className="mt-40 pt-20 border-t border-white/5 text-[10px] text-zinc-800 tracking-[0.5em] uppercase">
          Kiger Audiovisual © 26 • All Rights Reserved
        </div>
      </footer>

      {/* FULLSCREEN VIDEO PLAYER */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 bg-black z-[200] flex items-center justify-center"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="absolute top-10 right-10 cursor-pointer text-[10px] tracking-widest font-bold z-[210] hover:text-red-600 transition-colors">CLOSE [X]</div>
            <iframe src={`${selectedVideo.url}?autoplay=1&controls=0&modestbranding=1`} className="w-full h-full p-0 md:p-20" allowFullScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}