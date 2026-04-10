import { memo } from 'react';
import { motion } from 'framer-motion';

const UNFILTERED_TEAM = [
  { name: "Gabson Silva", handle: "gabsonnn", roles: ["Direção Geral"] },
  { name: "Giovanna Medeiros", handle: "giiicrm", roles: ["Produção Executiva"] },
  { name: "Thiago Bandeira", handle: "thiagoo_bandeira", roles: ["Dir. de Fotografia", "Câmeras"] },
  { name: "Nicolly Laubaka", handle: "nicollylaubakaa", roles: ["Direção de Arte"] },
  { name: "Paulo Santana", handle: "paulinho.sant", roles: ["Produção"] },
  { name: "Sebastian Pérez", handle: "_sebastian.ps_", roles: ["Captação de Áudio"] },
  { name: "Alex Ascencio", handle: "alexascencioai", roles: ["Edição e Finalização", "Câmeras"] },
  { name: "Larissa Roberta", handle: "larirobertaassuncao", roles: ["Edição e Finalização", "Asst. de Produção"] },
  { name: "Leonardo Lima", handle: "leonardo.limaft", roles: ["Assistente de Produção", "Making Of"] },
  { name: "Nicoli Lima", handle: "nicolifvlima", roles: ["Asst. de Produção", "Asst. de Direção de Arte", "Maquiagem"] },
];

const SOCIAL_LINKS = [
  { 
    label: "Site Oficial", 
    href: "/", 
    color: "#ffffff",
    icon: "globe"
  },
  { 
    label: "YouTube", 
    href: "https://www.youtube.com/@kigerbr", 
    color: "#FF0000",
    icon: "youtube"
  },
  { 
    label: "Instagram", 
    href: "https://instagram.com/kiger.br", 
    color: "#E1306C",
    icon: "instagram"
  },
  { 
    label: "WhatsApp", 
    href: "https://wa.me/559491441635", 
    color: "#25D366",
    icon: "whatsapp"
  }
];

const TeamMember = memo(({ member }) => (
  <motion.a
    href={`https://instagram.com/${member.handle}`}
    target="_blank"
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="flex items-center gap-4 p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
  >
    <div className="relative w-14 h-14 flex-shrink-0">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-orange-500 animate-pulse blur-[8px] opacity-0 group-hover:opacity-60 transition-opacity" />
      <img 
        src={`https://unavatar.io/instagram/${member.handle}`} 
        alt={member.name}
        className="w-full h-full rounded-2xl object-cover relative z-10 border border-white/10"
        onError={(e) => { e.target.src = "https://unavatar.io/instagram/instagram"; }}
      />
    </div>
    <div className="flex flex-col">
      <span className="text-white font-bold text-sm tracking-tight">{member.name}</span>
      <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest leading-tight">
        {member.roles.join(" • ")}
      </span>
      <span className="text-pink-500/80 text-[10px] font-medium mt-0.5">@{member.handle}</span>
    </div>
  </motion.a>
));

const LinkButton = memo(({ link }) => (
  <motion.a
    href={link.href}
    target={link.href.startsWith('http') ? "_blank" : "_self"}
    whileHover={{ scale: 1.02, x: 5 }}
    whileTap={{ scale: 0.98 }}
    className="w-full flex items-center justify-between p-5 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 group shadow-xl"
  >
    <div className="flex items-center gap-5">
      <div 
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white/80 group-hover:text-white transition-all duration-500"
        style={{ backgroundColor: `${link.color}20`, border: `1px solid ${link.color}40` }}
      >
        {link.icon === 'globe' && <svg className="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>}
        {link.icon === 'youtube' && <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>}
        {link.icon === 'instagram' && <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/></svg>}
        {link.icon === 'whatsapp' && <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>}
      </div>
      <span className="text-white font-black uppercase tracking-[0.2em] text-sm">{link.label}</span>
    </div>
    <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${link.label === 'YouTube' ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 group-hover:bg-white group-hover:text-black group-hover:border-white'}`}>
      {link.label === 'YouTube' ? 'Inscrever-se' : 'Seguir'}
    </div>
  </motion.a>
));

export default function KigerLinks() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Outfit',_sans-serif] selection:bg-pink-500 overflow-x-hidden relative">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700;900&display=swap');`}</style>
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-500/5 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <main className="relative z-10 max-w-lg mx-auto px-6 pt-16 pb-24 flex flex-col items-center">
        {/* Header content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="w-24 h-24 mb-6 relative group">
            <div className="absolute inset-0 bg-white/10 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
            <div className="absolute inset-0 bg-white/5 rounded-3xl -rotate-6 group-hover:-rotate-12 transition-transform duration-500" />
            <div className="relative z-10 w-full h-full bg-black border border-white/10 rounded-3xl overflow-hidden p-4 flex items-center justify-center">
              <img src="/kiger.png" alt="KIGER" className="w-full object-contain mix-blend-screen" />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">KIGER<span className="text-pink-500">.</span></h1>
          <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.4em] text-center">Produção Audiovisual</p>
        </motion.div>

        {/* Links Section */}
        <div className="w-full space-y-4 mb-16">
          {SOCIAL_LINKS.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
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
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] flex-1 bg-white/10" />
            <span className="text-white/30 text-[9px] uppercase font-black tracking-[0.3em]">Nossa Equipe</span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </motion.div>

          <div className="space-y-3">
            {UNFILTERED_TEAM.map((member, i) => (
              <motion.div
                key={member.handle}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 + 0.8 }}
              >
                <TeamMember member={member} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center">
          <p className="text-white/20 text-[9px] uppercase font-bold tracking-[0.3em]">© 2026 KIGER PRODUTORA</p>
        </footer>
      </main>
    </div>
  );
}
