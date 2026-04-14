import { memo } from 'react';
import { motion } from 'framer-motion';

const TEAM = [
  { name: "Gabson Silva", handle: "gabsonnn" },
  { name: "Giovanna Medeiros", handle: "giiicrm" },
  { name: "Thiago Bandeira", handle: "thiagoo_bandeira" },
  { name: "Nicolly Laubaka", handle: "nicollylaubakaa" },
  { name: "Paulo Santana", handle: "paulinho.sant" },
  { name: "Sebastian Pérez", handle: "_sebastian.ps_" },
  { name: "Alex Ascencio", handle: "alexascencioai" },
  { name: "Larissa Roberta", handle: "larirobertaassuncao" },
  { name: "Leonardo Lima", handle: "leonardo.limaft" },
  { name: "Nicoli Lima", handle: "nicolifvlima" },
];

const SOCIAL_LINKS = [
  { label: "Site Oficial", href: "/", icon: "globe", cta: "Acessar" },
  { label: "YouTube", href: "https://www.youtube.com/@kigerbr", icon: "youtube", cta: "Inscritos" },
  { label: "Instagram", href: "https://instagram.com/kiger.br", icon: "instagram", cta: "Seguir" },
  { label: "WhatsApp", href: "https://wa.me/559491441635", icon: "whatsapp", cta: "Contato" },
];

const ICONS = {
  globe: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9c1.657 0 3 4.03 3 9s-1.343 9-3 9m0-18c-1.657 0-3 4.03-3 9s1.343 9 3 9m-9-9a9 9 0 019-9" /></svg>,
  youtube: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  instagram: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/></svg>,
  whatsapp: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>,
};

const LinkButton = memo(({ link }) => (
  <motion.a
    href={link.href}
    target={link.href.startsWith('http') ? "_blank" : "_self"}
    whileHover={{ x: 6, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
    whileTap={{ scale: 0.98 }}
    className="w-full flex items-center justify-between p-6 rounded-3xl bg-white/[0.03] border border-white/[0.05] transition-all duration-300 group"
  >
    <div className="flex items-center gap-6">
      <div className="text-zinc-500 group-hover:text-white transition-colors duration-300">
        {ICONS[link.icon]}
      </div>
      <span className="text-zinc-200 font-medium text-lg uppercase tracking-[0.15em]">{link.label}</span>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-zinc-600 text-[9px] uppercase font-black tracking-widest">{link.cta}</span>
      <svg className="w-5 h-5 text-zinc-700 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
    </div>
  </motion.a>
));

const TeamMember = memo(({ member }) => (
  <motion.a
    href={`https://instagram.com/${member.handle}`}
    target="_blank"
    whileHover={{ y: -5 }}
    className="flex flex-col items-center group"
  >
    <div className="relative w-32 h-32 mb-6 rounded-full p-1 border border-white/5 transition-all duration-500 group-hover:border-white/30">
      <div className="w-full h-full rounded-full overflow-hidden relative bg-zinc-900 shadow-2xl">
        <img 
          src={`https://images.weserv.nl/?url=https://unavatar.io/instagram/${member.handle}&w=400&h=400&fit=cover&mask=circle&q=90`} 
          alt={member.name} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
          onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${member.name}&backgroundColor=111111&fontFamily=Outfit`; }}
        />
        <div className="absolute inset-0 border-[8px] border-black/10 rounded-full" />
      </div>
    </div>
    <span className="text-zinc-200 font-bold text-xs uppercase tracking-wider mb-1 group-hover:text-white transition-colors">{member.name}</span>
    <span className="text-zinc-500 text-[10px] font-medium tracking-tight group-hover:text-pink-500 transition-colors">@{member.handle}</span>
  </motion.a>
));

export default function KigerLinks() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Outfit',_sans-serif] selection:bg-white selection:text-black overflow-x-hidden relative">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;500;700;900&display=swap');`}</style>
      
      {/* Film Grain Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50 pointer-events-none" />

      {/* Bigger Main Viewfinder Frame */}
      <div className="fixed inset-4 md:inset-8 pointer-events-none border border-white/[0.03] z-40">
        <div className="absolute top-0 left-0 w-16 h-16 border-t-[2px] border-l-[2px] border-white/10" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-[2px] border-r-[2px] border-white/10" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[2px] border-l-[2px] border-white/10" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[2px] border-r-[2px] border-white/10" />
        
        {/* BIG REC BADGE */}
        <div className="absolute top-6 right-8 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-600 animate-[pulse_1s_infinite]" />
          <span className="text-xs font-black tracking-[0.5em] text-white/40 translate-y-[1px]">REC</span>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-12 opacity-10">
          <span className="text-[10px] font-bold tracking-widest">ISO 800</span>
          <span className="text-[10px] font-bold tracking-widest">F 1.8</span>
          <span className="text-[10px] font-bold tracking-widest">1/50</span>
        </div>
      </div>

      <main className="relative z-10 max-w-[550px] mx-auto px-8 pt-32 pb-48 flex flex-col items-center">
        {/* BIG LOGO - NO TEXT */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center mb-32"
        >
          <img src="/kiger.png" alt="KIGER" className="w-32 md:w-40 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] brightness-110" />
          <div className="mt-12 h-[1px] w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>

        {/* Links Navigation */}
        <div className="w-full flex flex-col gap-4 mb-48">
          {SOCIAL_LINKS.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.4 }}
            >
              <LinkButton link={link} />
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <section className="w-full">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-6 mb-20"
          >
            <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent to-white/5" />
            <span className="text-zinc-600 text-[10px] uppercase font-black tracking-[1.5em] whitespace-nowrap pl-[1.5em]">Team</span>
            <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent to-white/5" />
          </motion.div>

          <div className="grid grid-cols-2 gap-y-20 gap-x-8">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.handle}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 + 1 }}
              >
                <TeamMember member={member} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Clean Footer */}
        <footer className="mt-64 flex flex-col items-center gap-10">
          <div className="w-px h-24 bg-gradient-to-b from-white/10 to-transparent" />
          <div className="px-6 py-2 border border-white/5 rounded-full">
            <p className="text-zinc-700 text-[8px] uppercase font-black tracking-[0.8em] translate-x-[0.4em]">MMXXVI</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
