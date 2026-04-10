import { memo, useState } from 'react';
import { motion } from 'framer-motion';

const TEAM = [
  { name: "Gabson Silva", handle: "gabsonnn", roles: ["Direção Geral"] },
  { name: "Giovanna Medeiros", handle: "giiicrm", roles: ["Produção Executiva"] },
  { name: "Thiago Bandeira", handle: "thiagoo_bandeira", roles: ["Dir. de Fotografia", "Câmeras"] },
  { name: "Nicolly Laubaka", handle: "nicollylaubakaa", roles: ["Direção de Arte"] },
  { name: "Paulo Santana", handle: "paulinho.sant", roles: ["Produção"] },
  { name: "Sebastian Pérez", handle: "_sebastian.ps_", roles: ["Captação de Áudio"] },
  { name: "Alex Ascencio", handle: "alexascencioai", roles: ["Edição e Finalização", "Câmeras"] },
  { name: "Larissa Roberta", handle: "larirobertaassuncao", roles: ["Edição e Finalização", "Asst. de Produção"] },
  { name: "Leonardo Lima", handle: "leonardo.limaft", roles: ["Assistente de Produção", "Making Of"] },
  { name: "Nicoli Lima", handle: "nicolifvlima", roles: ["Asst. de Produção", "Asst. Dir. de Arte", "Maquiagem"] },
];

const SOCIAL_LINKS = [
  { label: "Site Oficial", href: "/", color: "#ffffff", icon: "globe", cta: "Acessar" },
  { label: "YouTube", href: "https://www.youtube.com/@kigerbr", color: "#FF0000", icon: "youtube", cta: "Inscrever-se" },
  { label: "Instagram", href: "https://instagram.com/kiger.br", color: "#E1306C", icon: "instagram", cta: "Seguir" },
  { label: "WhatsApp", href: "https://wa.me/559491441635", color: "#25D366", icon: "whatsapp", cta: "Contato" },
];

// Gradient palette for avatar fallbacks
const GRADIENTS = [
  "from-pink-500 to-rose-600",
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-red-500 to-pink-600",
  "from-indigo-500 to-blue-600",
  "from-fuchsia-500 to-pink-600",
  "from-cyan-500 to-blue-600",
  "from-lime-500 to-green-600",
];

const getInitials = (name) => {
  const parts = name.split(" ");
  return parts.length >= 2 ? `${parts[0][0]}${parts[parts.length - 1][0]}` : parts[0][0];
};

const Avatar = memo(({ name, handle, index }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const initials = getInitials(name);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative z-10 border border-white/10 bg-[#0a0a0a]">
      {!imgFailed ? (
        <img
          src={`/team/${handle}.jpg`}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgFailed(true)}
          loading="lazy"
        />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <span className="text-white font-black text-lg tracking-tight drop-shadow-md">{initials}</span>
        </div>
      )}
    </div>
  );
});

const TeamMember = memo(({ member, index }) => (
  <motion.a
    href={`https://instagram.com/${member.handle}`}
    target="_blank"
    whileHover={{ x: 6 }}
    whileTap={{ scale: 0.98 }}
    className="flex items-center gap-4 p-4 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 group"
  >
    <div className="relative w-14 h-14 flex-shrink-0">
      <div className="absolute inset-[-2px] rounded-[1.2rem] bg-gradient-to-tr from-pink-500/0 via-white/0 to-white/0 group-hover:from-pink-500/20 group-hover:via-white/20 group-hover:to-white/20 transition-all duration-500 blur-sm" />
      <Avatar name={member.name} handle={member.handle} index={index} />
    </div>
    <div className="flex flex-col min-w-0">
      <div className="flex items-baseline gap-2">
        <span className="text-white font-bold text-sm tracking-tight">{member.name}</span>
        <span className="text-white/20 text-[9px] font-medium transition-colors group-hover:text-pink-400">@{member.handle}</span>
      </div>
      <span className="text-white/40 text-[9px] uppercase font-bold tracking-[0.2em] leading-tight truncate mt-1">
        {member.roles.join(" · ")}
      </span>
    </div>
    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </motion.a>
));

const ICONS = {
  globe: <img src="/kiger.png" alt="KIGER" className="w-7 h-7 object-contain mix-blend-screen" />,
  youtube: <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  instagram: <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/></svg>,
  whatsapp: <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>,
};

const LinkButton = memo(({ link }) => (
  <motion.a
    href={link.href}
    target={link.href.startsWith('http') ? "_blank" : "_self"}
    whileHover={{ scale: 1.01, x: 4 }}
    whileTap={{ scale: 0.98 }}
    className="w-full flex items-center justify-between p-5 rounded-[2rem] bg-white/[0.03] border border-white/[0.06] backdrop-blur-2xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 group"
  >
    <div className="flex items-center gap-5">
      <div 
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white/50 group-hover:text-white transition-all duration-500"
        style={{ backgroundColor: `${link.color}10`, border: `1px solid ${link.color}20` }}
      >
        {ICONS[link.icon]}
      </div>
      <span className="text-white font-black uppercase tracking-[0.2em] text-[11px]">{link.label}</span>
    </div>
    <div className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all duration-500 ${link.label === 'YouTube' ? 'bg-white text-black border-white' : 'bg-transparent text-white/40 border-white/10 group-hover:bg-white group-hover:text-black group-hover:border-white'}`}>
      {link.cta}
    </div>
  </motion.a>
));

export default function KigerLinks() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Outfit',_sans-serif] selection:bg-pink-500 overflow-x-hidden relative">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700;900&display=swap');`}</style>
      
      {/* Background with higher quality gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-pink-600/[0.06] blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/[0.06] blur-[140px] rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] bg-purple-600/[0.03] blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-md mx-auto px-6 pt-16 pb-24 flex flex-col items-center">
        {/* Header - More Minimal */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <div className="w-20 h-20 mb-6 relative">
            <div className="absolute inset-0 bg-white/[0.03] rounded-[2rem] blur-xl" />
            <div className="relative z-10 w-full h-full bg-black/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-4 flex items-center justify-center">
              <img src="/kiger.png" alt="KIGER" className="w-full object-contain mix-blend-screen opacity-90" />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-[-0.05em] uppercase mb-2">KIGER<span className="text-pink-500">.</span></h1>
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-4 bg-white/10" />
            <p className="text-white/30 text-[9px] uppercase font-black tracking-[0.5em]">Produção Audiovisual</p>
            <span className="h-[1px] w-4 bg-white/10" />
          </div>
        </motion.div>

        {/* Links */}
        <div className="w-full space-y-3.5 mb-20">
          {SOCIAL_LINKS.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              <LinkButton link={link} />
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <div className="w-full">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-white/20 text-[8px] uppercase font-black tracking-[0.4em]">Nosso Time</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 gap-2.5">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.handle}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.9 }}
              >
                <TeamMember member={member} index={i} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-center opacity-30">
          <p className="text-[8px] uppercase font-black tracking-[0.6em]">Premium Visual Experience</p>
          <p className="text-[7px] uppercase font-bold tracking-[0.3em] mt-3">© 2026 KIGER PRODUTORA</p>
        </footer>
      </main>
    </div>
  );
}
