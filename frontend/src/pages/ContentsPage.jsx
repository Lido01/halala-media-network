import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineAcademicCap, 
  HiOutlineMapPin, 
  HiOutlineDocumentMagnifyingGlass, 
  HiOutlineBuildingLibrary,
  HiOutlineArrowUpRight,
  HiOutlineCalendarDays
} from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: "OPOC",
    status: "Active (Annual)",
    title: "One Package for One Child",
    desc: "Our flagship initiative. Every year, we collect and distribute comprehensive educational materials to ensure no child in the Dawuro Zone is left behind as the school season begins.",
    impact: "3,500+ Students supported annually",
    icon: <HiOutlineAcademicCap size={28} />,
    image: "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/549307729_1358285369010255_4846773534296182915_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEIDshPpCfGY5njWahmPUhWO56qdthkYdI7nqp22GRh0usPF9fICaxWz2hJvNV_B1rLXpob5nBC9OdGyaRo_4ra&_nc_ohc=10I-toXgSecQ7kNvwGWTW29&_nc_oc=AdkFP3oAlp2vlacHjmITbqRCtpcipUA8Yqgg2PSXZHQVjkIRVlAY3TQbFIsBSciGLfE&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=yYEnKG6Yjwqbtn4Xqsy0jg&oh=00_AfuhgVo7nguKr07YSl69ccYdlbe_EABX5DwjuUfbtSDZow&oe=69A0018C",
    color: "bg-[#cc0000]"
  },
  {
    id: "DZG",
    status: "Ongoing",
    title: "Global Dawuro Gateway",
    desc: "Mapping the cultural, historical, and natural beauty of the Dawuro Zone for a global audience. We act as the digital lens through which the world discovers our heritage.",
    impact: "1M+ Digital Impressions Worldwide",
    icon: <HiOutlineMapPin size={28} />,
    image: "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/633523337_1361154282718632_3893613749067140767_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeF9k17JCTBaZrZeuLcj4m6mDDAtneVG1R8MMC2d5UbVH9GRqPoPlVPBfwYWA386BbaoX9bvHNtd9__t8bKlzMZE&_nc_ohc=MbHgbbWL1lIQ7kNvwHjA3Gw&_nc_oc=Adn_3CqDb6To2_DfIPoiMyHk1twAD8_XorsCqqhUPvbU9SCKJBzB3Qexo0DNLzE-JCQ&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=JsKi1WhqXTus1IJCQGN7mQ&oh=00_AftpF_decJba6P70yND7pOCbg43upDDvXKlnmp1bxqaPXQ&oe=699FEBB2",
    color: "bg-[#ffcc00]"
  },
  {
    id: "K-HUB",
    status: "Completed Phase I",
    title: "The Knowledge Hub",
    desc: "A centralized information repository serving the people. We collect regional data and translate it into accessible knowledge to empower local decision-making.",
    impact: "12 Regional Districts Mapped",
    icon: <HiOutlineDocumentMagnifyingGlass size={28} />,
    image: "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/471411954_3558178694475018_2923118166379194430_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeETjjz4JdXa7lTOYGzTo50scDF23ZyFPbVwMXbdnIU9tSshIaxNTyJSiuDn739XZzHqkYlpRTxqTwfpr6n0JIJf&_nc_ohc=B44fqZHXw0oQ7kNvwF9Nvnb&_nc_oc=Admh2C_yh4CxMlJQbGAOHFcjl9R3WGvIRjNfXSfPS-6Sl0NTJsHgG5xcnDMWlQq7e-4&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=nkyrHe_JrUL-CPSmhe5lYA&oh=00_AfsX9dx3k5AQtgydKuxgq84mjS3G2CCrsneJp4x7pwWtew&oe=699FF94A"
  },
  {
    id: "GOV-SYNC",
    status: "Strategic Partner",
    title: "Governance Synergy",
    desc: "Collaborating with South West Regional Government bodies to streamline public communication and support developmental initiatives through professional media coverage.",
    impact: "Official Media Partner Status",
    icon: <HiOutlineBuildingLibrary size={28} />,
    image: "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/491951918_988137896769961_1728972025718456640_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGpIXr2vnTiLrC6SBvwDFMNNfnEmM_huEw1-cSYz-G4TFZ2VtyyFJSNkbQv06U7WALwYzcv5NJdgIC__AJ20Kh0&_nc_ohc=ZDCZ7iO7MjcQ7kNvwGDuNfe&_nc_oc=AdluVvM7wVviMI9CHCfjWiKwJVpaMCqyo5opypH92THlNpPKjruOdiEcIfOeUxXZvO0&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=mzYynHGIscOFOKQMCY_trA&oh=00_AftJiEi6Ia9gYSW1jPnsHoIpbySucvE09N5WKuaBAtp4RA&oe=699FF350",
    color: "bg-zinc-600"
  }
];

const plannedProjects = [
  {
    date: "Q4 2026",
    title: "Digital Literacy Center",
    desc: "Establishing the first media-tech lab in Tercha for youth training."
  },
  {
    date: "2027",
    title: "Halala Kella Documentary Series",
    desc: "A 6-part cinematic journey through the ancient stone walls of Dawuro."
  }
];

const ContentsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500 overflow-x-hidden">
      
      {/* --- HERO: STATELY & BOLD --- */}
      <section className="pt-32 pb-20 px-6 lg:px-20 border-b border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-12 h-[1px] bg-[#cc0000]" />
            <span className="text-[#cc0000] font-black uppercase text-[10px] tracking-[0.5em]">Our Footprint</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black text-black dark:text-white uppercase tracking-tighter leading-none"
          >
            PROJECTS<br/><span className="text-gray-300 dark:text-zinc-800">& IMPACT.</span>
          </motion.h1>
          <p className="mt-12 text-gray-500 dark:text-gray-400 text-lg md:text-2xl max-w-3xl leading-relaxed font-medium">
            From the classrooms of Tercha to the digital screens of the world, we are building the infrastructure for Dawuro's future.
          </p>
        </div>
      </section>

      {/* --- FEATURED PROJECTS GRID --- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-20 py-32">
        <div className="grid grid-cols-1 gap-32">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full lg:w-3/5 group relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 z-20 text-white p-6 font-black text-xs tracking-widest ${project.color}`}>
                  {project.status}
                </div>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full aspect-video object-cover group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 shadow-2xl"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
              </motion.div>

              {/* Content Container */}
              <div className="w-full lg:w-2/5 space-y-8">
                <div className="text-[#cc0000] dark:text-[#ffcc00] p-4 bg-gray-50 dark:bg-white/5 inline-block rounded-full">
                  {project.icon}
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tighter leading-none">
                  {project.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {project.desc}
                </p>
                <div className="bg-[#cc0000]/5 dark:bg-[#ffcc00]/5 border-l-4 border-[#cc0000] p-6">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-[#cc0000] mb-2">Verified Impact</span>
                  <span className="text-xl font-black text-black dark:text-white uppercase">{project.impact}</span>
                </div>
                <button onClick={()=>alert("This part will be added soon.")} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] pt-4 hover:text-[#cc0000] dark:text-white transition-all group">
                  View Full Report <HiOutlineArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" size={18}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- THE FUTURE ROADMAP (PLANNED) --- */}
      <section className="bg-black text-white py-32 px-6 lg:px-20 overflow-hidden relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none border-[30px] border-white/5 scale-110 rotate-3" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <HiOutlineCalendarDays size={48} className="mx-auto text-[#ffcc00] mb-6" />
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">FUTURE VISION</h2>
            <p className="text-[#ffcc00] font-black uppercase tracking-[0.5em] text-xs mt-4">The Road to 2030</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {plannedProjects.map((plan, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-12 border border-white/10 bg-white/5 backdrop-blur-sm group hover:border-[#ffcc00] transition-all"
              >
                <span className="text-[#ffcc00] font-black tracking-widest text-sm mb-4 block">{plan.date}</span>
                <h3 className="text-3xl font-black uppercase mb-6 group-hover:text-[#ffcc00] transition-colors">{plan.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{plan.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COMMUNITY CALL TO ACTION --- */}
      <section className="py-40 px-6 text-center bg-white dark:bg-[#050505]">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tighter">
            Every Child Deserves <br/> <span className="text-[#cc0000]">The Package.</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg uppercase tracking-widest font-bold">
            Partner with us to provide education to the next generation of Dawuro.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link to="donate"  className="bg-[#cc0000] text-white px-12 py-6 font-black uppercase text-xs tracking-[0.3em] hover:bg-black transition-all shadow-xl shadow-[#cc0000]/20">
              Donate Materials
            </Link>
            <button onClick={()=> alert("Please Login/Register in Access Hub with us. We will reach out to you soon.")} className="border-2 border-black dark:border-white text-black dark:text-white px-12 py-6 font-black uppercase text-xs tracking-[0.3em] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
              Become a Partner
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContentsPage;
