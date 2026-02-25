import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineCamera, 
  HiOutlineMicrophone, 
  HiOutlineAcademicCap, 
  HiOutlineGlobeAlt,
  HiArrowLongRight 
} from 'react-icons/hi2';

const services = [
  {
    id: "01",
    title: "Cultural Archive",
    desc: "Preserving the South West's oral history through high-definition cinematography. We document the legends of Halala Kella and the wisdom of our elders for future generations.",
    features: ["4K Historical Documentaries", "Elder Interview Series", "Gebero Mountain Expeditions"],
    icon: <HiOutlineCamera size={32} />,
    img: "https://i.playboard.app/p/AIdro_lrV-CPjosPydzeuAxvxqntdp5YAEz6NkwECcHDoFA9JPQN/default.jpg" // Replace with local cultural image
  },
  {
    id: "02",
    title: "Digital Broadcast",
    desc: "The digital heartbeat of the Dawuro Zone. From live radio streams to global music premieres, we amplify the sounds of Yitagesu Hoshu and local talents to a worldwide stage.",
    features: ["24/7 Digital Radio", "Music Video Production", "Social Media Management"],
    icon: <HiOutlineMicrophone size={32} />,
    img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1470"
  },
  {
    id: "03",
    title: "Community Impact",
    desc: "Beyond media, we are a force for good. Through our 'One Pack One Child' initiative and educational workshops, we use media to drive social change and youth empowerment.",
    features: ["Education Material Drive", "Youth Media Training", "Regional Charity Events"],
    icon: <HiOutlineAcademicCap size={32} />,
    img: "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/505177278_1028266912757059_8262146874356443306_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFg9GIWBT1WO1bCxo1RRuCW5zuFXknTSZznO4VeSdNJnOoFRMSFn2LsqCaNH7hEkSEBsumS-kl0fm3AxE6Fk-tQ&_nc_ohc=b7VXEDznTXgQ7kNvwG5PljD&_nc_oc=AdlhD2bkxlbSVFAO4i6yrjmkjtyNxKqgGLqWF-YOo9KtSXypbIRpDMl6fq4PW1KvCpw&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=lHYsLkQT7CS9wgo_HAzA_g&oh=00_AfsOC6xzyVcAzdkmeQQYCgNsHKvYEK3Sj4BOekNMQ1Uhqw&oe=699FEE8B"
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500 pb-20">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background Cultural Pattern */}
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 flex">
           {[...Array(20)].map((_, i) => (
             <div key={i} className="flex-1 h-full border-r border-[#cc0000] last:border-0" />
           ))}
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center gap-2 mb-6"
          >
            <div className="w-3 h-3 bg-[#cc0000]" />
            <div className="w-3 h-3 bg-[#ffcc00]" />
            <div className="w-3 h-3 bg-black dark:bg-white" />
          </motion.div>
          
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#cc0000] dark:text-[#ffcc00] font-black tracking-[0.6em] uppercase text-[10px] md:text-xs"
          >
            Preserving South West Legacy
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-9xl font-black text-black dark:text-white uppercase tracking-tighter mt-4"
          >
            Our Work
          </motion.h1>
          <div className="w-24 h-1 bg-[#cc0000] mx-auto mt-8" />
        </div>
      </section>

      {/* --- SERVICES LIST --- */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-20 space-y-48">
        {services.map((service, index) => (
          <div 
            key={service.id}
            className={`flex flex-col lg:flex-row items-center gap-20 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Image Side */}
            <div className="w-full lg:w-1/2 group relative">
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/5] overflow-hidden"
              >
                <img 
                  src={service.img} 
                  className="w-full h-full object-cover group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s]" 
                  alt={service.title} 
                />
                {/* Floating ID Card */}
                <div className="absolute bottom-0 right-0 bg-black dark:bg-[#ffcc00] text-white dark:text-black px-10 py-8 font-black text-4xl">
                  {service.id}
                </div>
              </motion.div>
              {/* Decorative background box */}
              <div className={`absolute -z-10 top-10 ${index % 2 === 0 ? '-left-10' : '-right-10'} w-full h-full border-4 border-[#cc0000]/20`} />
            </div>

            {/* Text Side */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gray-50 dark:bg-zinc-900 text-[#cc0000] dark:text-[#ffcc00] rounded-full">
                  {service.icon}
                </div>
                <div className="h-[2px] w-20 bg-gray-100 dark:bg-white/10" />
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tight">
                {service.title}
              </h2>
              
              <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl leading-relaxed font-medium">
                {service.desc}
              </p>
              
              <div className="grid grid-cols-1 gap-4 pt-6">
                {service.features.map((feat, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-black dark:text-white border-b border-gray-100 dark:border-white/5 pb-4"
                  >
                    <span className="text-[#cc0000]">●</span> {feat}
                  </motion.div>
                ))}
              </div>

              <button onClick={()=>alert("Please use the contact page and send your message!")} className="bg-black dark:bg-[#ffcc00] text-white dark:text-black px-12 py-5 font-black uppercase text-[10px] tracking-[0.4em] mt-10 hover:bg-[#cc0000] hover:text-white transition-all group flex items-center gap-6">
                Connect with DMN <HiArrowLongRight className="group-hover:translate-x-3 transition-transform" size={24}/>
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* --- CULTURAL TIMELINE SECTION --- */}
      <section className="mt-52 bg-[#cc0000] dark:bg-zinc-900 py-32 px-6 lg:px-20 relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="flex flex-col items-center mb-24 text-center">
             <span className="text-[#ffcc00] font-black uppercase tracking-[0.4em] text-xs mb-4">The NDM Blueprint</span>
             <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">How We Tell Stories</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ProcessStep num="01" title="Discovery" desc="Identifying untapped cultural narratives within Dawuro communities." />
            <ProcessStep num="02" title="Capture" desc="On-field documentation using cinema-grade equipment." />
            <ProcessStep num="03" title="Curate" desc="Editing with a focus on cultural authenticity and soul." />
            <ProcessStep num="04" title="Broadcast" desc="Sharing the Dawuro voice with Ethiopia and the world." />
          </div>
        </div>
      </section>
    </div>
  );
};

const ProcessStep = ({ num, title, desc }) => (
  <div className="group space-y-6 bg-white/5 p-10 backdrop-blur-sm border border-white/10 hover:bg-white hover:text-black transition-all duration-500">
    <span className="text-[#ffcc00] group-hover:text-[#cc0000] font-black text-2xl uppercase tracking-widest block transition-colors">{num}</span>
    <h4 className="font-black uppercase text-lg tracking-widest text-white group-hover:text-black transition-colors">{title}</h4>
    <p className="text-gray-300 group-hover:text-gray-600 text-[10px] leading-loose uppercase tracking-widest transition-colors font-bold">{desc}</p>
  </div>
);

export default Services;