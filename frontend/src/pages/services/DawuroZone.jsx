import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineGlobeAlt, 
  HiOutlineShieldCheck, 
  HiOutlineAcademicCap,
  HiOutlineMapPin,
  HiOutlineCamera,
  HiOutlineChevronDown,
  HiOutlineScale, // For court system
  HiOutlineUsers as HiOutlineMusicNote, // For dancing
  HiOutlineSparkles // For unique culture
} from 'react-icons/hi2';

import unique_culture from '../../assets/aboutDawuro/unique-culture.jpg'

import halala from '../../assets/home/halala.jpg'
import power_culture from '../../assets/home/power-culture.jpg'
import chebera_churchura from '../../assets/aboutDawuro/chebera_churchura.jpg'
import food_drink from '../../assets/aboutDawuro/food-drink.jpg'

const DawuroZone = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleExpand = (title) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  const sections = [
    {
      title: "ታሪካዊ አመጣጥ እና ማንነት",
      shortContent: "ዳውሮ በደቡብ ምዕራብ ኢትዮጵያ የሚገኝ ጥንታዊ እና ታሪካዊ ህዝብ ነው። የራሱ የሆነ ቋንቋ (ዳውሮኛ)፣ ባህል እና ወግ ያለው ህዝብ ሲሆን፣ በታሪክም በጠንካራ የንግስና ስርዓት የሚታወቅ ነው።",
      fullContent: "ዳውሮ በደቡብ ምዕራብ ኢትዮጵያ የሚገኝ ጥንታዊ እና ታሪካዊ ህዝብ ነው። የራሱ የሆነ ቋንቋ (ዳውሮኛ)፣ ባህል እና ወግ ያለው ህዝብ ሲሆን፣ በታሪክም በጠንካራ የንግስና ስርዓት የሚታወቅ ነው። የዳውሮ ህዝብ ለሀገር መከላከያ እና ለልማት ያለው ቁርጠኝነት ከጥንት ጀምሮ የተመሰከረለት ነው። በልዩ የአኗኗር ዘይቤው፣ በማህበራዊ አደረጃጀቱ እና በእሴቶቹ ይታወቃል። የዳውሮ ማህበረሰብ የአብሮነት፣ የአክብሮት እና የጠንካራ ስራ ተምሳሌት ነው።",
      image: "https://c7.alamy.com/comp/PAHG5D/omo-ethiopia-september-19-2011-unidentified-ethiopian-people-in-old-clothes-in-the-street-people-in-ethiopia-suffer-of-poverty-due-to-the-unstab-PAHG5D.jpg",
      icon: <HiOutlineShieldCheck className="text-red-600" size={32} />
    },
    {
      title: "የሃላላ ኬላ (የዳውሮ ታላቁ ግንብ)",
      shortContent: "የንጉስ ሃላላ ግንብ ወይም 'የሃላላ ኬላ' የዳውሮ ህዝብ የጥንት ስልጣኔ ማሳያ ነው። ይህ ግንብ ለጥበቃ እና ለድንበር ማካለያነት በድንጋይ የተገነባ ሲሆን፣ የህዝቡን ምህንድስና እና አንድነት በጉልህ ያሳያል።",
      fullContent: "የንጉስ ሃላላ ግንብ ወይም 'የሃላላ ኬላ' የዳውሮ ህዝብ የጥንት ስልጣኔ ማሳያ ነው። ይህ ግንብ ለጥበቃ እና ለድንበር ማካለያነት በድንጋይ የተገነባ ሲሆን፣ የህዝቡን ምህንድስና እና አንድነት በጉልህ ያሳያል። የሃላላ ኬላ ወይም የዳውሮ ታላቁ ግንብ በደቡብ ምዕራብ ኢትዮጵያ የሚገኝ እጅግ አስደናቂ የሆነ ጥንታዊ የመከላከያ ግንብ ሲሆን፣ የዳውሮ ህዝብ ለዘመናት የገነባው የታሪክ አሻራ ነው። የግንቡ ስያሜ የመጣው በ18ኛው ክፍለ ዘመን (ከ1782-1822 ዓ.ም. ገደማ) የዳውሮን መንግስት በገዛው በታዋቂው ንጉስ (ካቲ) ሃላላ ስም ነው፤ ምንም እንኳን ግንባታው ከእርሱ በፊት የነበሩ ነገስታት ቢጀምሩትም፣ ንጉስ ሃላላ ግንቡን በማጠናቀቅና በማስፋፋት ትልቅ ድርሻ ነበረው። ይህ ግንብ በሰባት ረድፎች የተሰራ ሲሆን፣ ጠቅላላ ርዝመቱ ከ1,000 ኪሎ ሜትር በላይ እንደሚረዝም ይገመታል። የግንባታ ጥበቡም እጅግ የሚያስደንቅ ነው፤ ምክንያቱም ድንጋዮቹ ምንም ዓይነት ማጣበቂያ (ሲሚንቶ ወይም ጭቃ) ሳይኖርባቸው በደረቅ ድንጋይ ብቻ የተገነቡ ናቸው። ግንቡ በአማካይ 2.6 ሜትር ከፍታ እና 3.5 ሜትር ስፋት ያለው ሲሆን፣ በውስጡም 'ላፑንሚጻ' የሚባሉ ሰባት ዋና ዋና በሮች ነበሩት። የዚህ ግንብ ዋና ዓላማ የዳውሮን መንግስት ከባዕድ ወራሪዎች ለመከላከልና የድንበር ደህንነትን ለመጠበቅ ነበር። በቅርቡ በ'ገበታ ለሀገር' ፕሮጀክት አማካኝነት በዚህ ታሪካዊ ስፍራ አጠገብ የተገነባው ሃላላ ኬላ ሪዞርት አካባቢውን ለቱሪስቶች ይበልጥ ሳቢ አድርጎታል",
      image: halala,
      icon: <HiOutlineGlobeAlt className="text-[#ffcc00]" size={32} />
    },
    {
      title: "ተፈጥሮአዊ ሀብትና ቱሪዝም",
      shortContent: "ዞኑ በለመለመ ተፈጥሮ፣ ከፍተኛ ተራራዎች እና ገደላማ ቦታዎች የታወቀ ነው። የኦሞ ወንዝ ተፋሰስ እና የተለያዩ የተፈጥሮ ደኖች ለዞኑ ልዩ ውበት ሰጥተውታል።",
      fullContent: "ዞኑ በለመለመ ተፈጥሮ፣ ከፍተኛ ተራራዎች እና ገደላማ ቦታዎች የታወቀ ነው። የኦሞ ወንዝ ተፋሰስ እና የተለያዩ የተፈጥሮ ደኖች ለዞኑ ልዩ ውበት ሰጥተውታል። እንደ ጨበራ ጩርጩራ ብሄራዊ ፓርክ ያሉ የዱር እንስሳት መገኛ ቦታዎች በዳውሮ አቅራቢያ የሚገኙ የቱሪስት መስህቦች ናቸው። ለሥነ-ምህዳር ጥበቃ እና ለኢኮ ቱሪዝም ትልቅ እምቅ አቅም አለው።",
      image: chebera_churchura,
      icon: <HiOutlineCamera className="text-green-600" size={32} />
    },
    {
      title: "ባህልና ወግ",
      shortContent: "የዳውሮ ህዝብ በበለፀገ ባህሉ ይታወቃል። የራሱ የሆነ የባህል ልብስ፣ የሙዚቃ መሳሪያዎች፣ ጭፈራዎችና የሰርግ ስርዓቶች አሉት።",
      fullContent: "የዳውሮ ህዝብ በበለፀገ ባህሉ ይታወቃል። የራሱ የሆነ የባህል ልብስ፣ የሙዚቃ መሳሪያዎች፣ ጭፈራዎችና የሰርግ ስርዓቶች አሉት። በእያንዳንዱ የህይወት ምዕራፍ (ልደት፣ ሰርግ፣ ሞት) የራሱ የሆኑ ስርዓቶችና እሴቶች አሉት። እነዚህም ባህሎች ለአዲስ ትውልድ እየተተላለፉ የህዝቡ ማንነት ጠብቆ እንዲቆይ ያደርጋሉ።",
      image: unique_culture,
      icon: <HiOutlineSparkles className="text-yellow-500" size={32} />
    },
    {
      title: "ጭፈራና ሙዚቃ",
      shortContent: "የዳውሮ ጭፈራዎች ጉልበት የተሞሉና የአብሮነት ስሜትን የሚያጎሉ ናቸው። በልዩ የሙዚቃ መሳሪያዎች ታጅበው ይቀርባሉ።",
      fullContent: "የዳውሮ ጭፈራዎች ጉልበት የተሞሉና የአብሮነት ስሜትን የሚያጎሉ ናቸው። በልዩ የሙዚቃ መሳሪያዎች ታጅበው ይቀርባሉ። እንደ 'ሎኬ' እና 'ሻንሾ' ያሉ ጭፈራዎች በሰርግ፣ በአዝመራ ወቅት እና በሌሎች ማህበራዊ በዓላት ላይ ይጨፈራሉ። ሙዚቃው የህዝቡን ስሜት፣ ታሪክ እና ተስፋ የሚያንፀባርቅ ነው።",
      image: power_culture, // Example image for dancing
      icon: <HiOutlineMusicNote className="text-purple-600" size={32} />
    },
    {
      title: "ምግብና መጠጥ",
      shortContent: "የዳውሮ ባህላዊ ምግቦች ከኦርጋኒክ ምርቶች የሚዘጋጁና ጣፋጭ ናቸው። 'ኡንጫ' እና 'ቦርዴ' ከሚባሉ ምግቦች መካከል ዋነኞቹ ናቸው።",
      fullContent: "የዳውሮ ባህላዊ ምግቦች ከኦርጋኒክ ምርቶች የሚዘጋጁና ጣፋጭ ናቸው። 'ኡንጫ' እና 'ቦርዴ' ከሚባሉ ምግቦች መካከል ዋነኞቹ ናቸው። 'ኡንጫ' ከእንሰት(False Banana) የሚሰራ ሲሆን፣ ከተለያዩ ማባያ ጋር ይቀርባል። 'ቦርዴ' ደግሞ ከገብስ የሚዘጋጅ ባህላዊ መጠጥ ነው። የዳውሮ ምግቦች ለአካባቢው ህዝብ ጥንካሬና ጤና አስተዋፅኦ ያደርጋሉ።",
      image: food_drink, 
      icon: <HiOutlineAcademicCap className="text-orange-500" size={32} />
    },
    {
      title: "የፍርድ ስርዓት (Dubusha)",
      shortContent: "የዳውሮ ባህላዊ የፍርድ ስርዓት በ'Dubusha' በሚታወቅ ሲሆን፣ የሽማግሌዎች ጉባኤን ያካተተ ነው። ፍትህን በሰላም ለማምጣት ይሰራል።",
      fullContent: "የዳውሮ ባህላዊ የፍርድ ስርዓት በ'ጋዳ' በሚታወቅ ሲሆን፣ የሽማግሌዎች ጉባኤን ያካተተ ነው። ይህ ስርዓት ግጭቶችን በሰላማዊ መንገድ ለመፍታት እና ማህበራዊ ስምምነትን ለማምጣት ይረዳል። ፍርድ ቤቱ ከመደበኛው የፍርድ ስርዓት በተጓዳኝ ማህበራዊ ችግሮችን በመፍታት የህዝቡን አብሮነት ያጠናክራል።",
      image: "https://i.ytimg.com/vi/KGSX3hF7lOw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAgmjPWRujzJPcHdA_t4dcDNjWl1Q", // Example image for court system
      icon: <HiOutlineScale className="text-blue-600" size={32} />
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 font-sans">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzeiugEwmnHczL_1UrVHpDuyYOfMwcrpuXF27b4FsfysPFGqiDBm5Gj4_c&s=10" 
            className="w-full h-full object-cover opacity-60 dark:opacity-40"
            alt="Dawuro Landscape"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white dark:to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter mb-4 italic"
          >
            ዳውሮ <span className="text-[#ffcc00]">ዞን</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-white/90 font-bold tracking-widest uppercase mb-8"
          >
            የጥበብ፣ የታሪክ እና የተፈጥሮ መገኛ
          </motion.p>
          <div className="h-1 w-32 bg-[#cc0000] mx-auto" />
        </div>
      </section>

      {/* Intro Stats */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "ዋና ከተማ", val: "ታርጫ" },
            { label: "ክልል", val: "ደ/ም/ኢ/ህ" },
            { label: "ቋንቋ", val: "ዳውሮኛ" },
            { label: "ታዋቂ ምልክት", val: "ሃላላ ኬላ" }
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-[#121212] p-6 shadow-2xl border border-gray-100 dark:border-white/5 text-center">
              <p className="text-[10px] font-black uppercase text-red-600 tracking-widest mb-1">{stat.label}</p>
              <p className="text-lg font-bold dark:text-white">{stat.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Content Sections */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        {sections.map((section, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-start`}
            
          >
            <div className="flex-1 space-y-8">
              {/* <div className="inline-block p-4 bg-gray-100 dark:bg-white/5  ">
                {section.icon}
              </div> */}
              <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white leading-tight">
                {section.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                {expandedSection === section.title ? section.fullContent : section.shortContent}
              </p>
              <button 
                onClick={() => toggleExpand(section.title)} 
                className="flex items-center gap-3 text-red-600 font-black uppercase text-xs tracking-widest group"
              >
                {expandedSection === section.title ? 'Read Less' : 'Read More'} 
                <motion.div 
                  initial={{ width: 32 }}
                  animate={{ width: expandedSection === section.title ? 10 : 32 }}
                  className="h-[2px] bg-red-600 group-hover:w-12 transition-all" 
                />
                <HiOutlineChevronDown 
                  className={`transition-transform duration-300 ${expandedSection === section.title ? 'rotate-180' : ''}`} 
                />
              </button>
            </div>
            <div className="flex-1 w-full">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr blur-2xl opacity-20 transition-opacity" />
                <img 
                  src={section.image} 
                  alt={section.title} 
                  className="relative w-full h-[350px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Cultural Heritage Highlight */}
      <section className="bg-black py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none flex flex-wrap text-[150px] font-black leading-none uppercase select-none" style={{ background: 'linear-gradient(to right, rgba(204, 0, 0, 0.05), rgba(255, 204, 0, 0.05))' }}>
          {/* Dynamic text for background */}
          {'ዳውሮ ዳውሮ ዳውሮ ዳውሮ '.repeat(50).split(' ').map((word, i) => <span key={i} className="inline-block">{word}&nbsp;</span>)}
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">የባህል እሴቶች</h2>
            <p className="max-w-2xl mx-auto text-gray-400 uppercase tracking-widest text-sm">
              ዳውሮ በሙዚቃ፣ በጭፈራ እና በአለባበስ የሚታወቅ ባለጸጋ ባህል አለው።
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
              <h4 className="text-[#ffcc00] font-black mb-4">ባህላዊ አለባበስ</h4>
              <p className="text-sm leading-loose text-gray-300">በእጅ የተሰሩ እና በደማቅ ቀለማት ያጌጡ የዳውሮ ባህላዊ ልብሶች የህዝቡን ማንነት እና ውበት በጉልህ ያሳያሉ።</p>
            </div>
            <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
              <h4 className="text-[#ffcc00] font-black mb-4">ምግብና መጠጥ</h4>
              <p className="text-sm leading-loose text-gray-300">እንደ 'ኡንጫ' ያሉ ባህላዊ ምግቦች እና የተፈጥሮ ምርቶች ለጤና ተስማሚና በጣዕማቸው ተመራጭ ናቸው።</p>
            </div>
            <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
              <h4 className="text-[#ffcc00] font-black mb-4">አብሮነት</h4>
              <p className="text-sm leading-loose text-gray-300">በችግርም ሆነ በደስታ ጊዜ መረዳዳት እና በአንድነት መቆም የዳውሮ ህዝብ ዋነኛ መገለጫ እሴት ነው።</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="py-24 text-center">
        <h3 className="text-3xl font-black uppercase tracking-widest mb-8">ዳውሮን ይጎብኙ</h3>
        <button className="px-12 py-5 bg-[#cc0000] text-white font-black uppercase text-sm tracking-[0.3em] shadow-2xl hover:scale-110 transition-transform">
          የጉዞ መረጃ ያግኙ
        </button>
      </section>
    </div>
  );
};

export default DawuroZone;

// ```http://googleusercontent.com/image_generation_content/0
// ### ዋና ለውጦች እና አዲስ ባህሪያት፦

// 1.  **"ተጨማሪ አንብብ" Functionality (Read More Toggle)፦**
//     * እያንዳንዱ ክፍል አጭር መግቢያ ( `shortContent`) እና ሙሉ ይዘት ( `fullContent`) አለው።
//     * `expandedSection` የሚባል `useState` ተጠቅሜ የትኛው ክፍል እንደተከፈተ ይቆጣጠራል።
//     * `ተጨማሪ አንብብ` የሚለውን ቁልፍ ሲጫኑ ሙሉ ጽሁፉ ይታያል፤ ሲጠየቁ ደግሞ ይዘጋል። ከ`HiOutlineChevronDown` አዶ ጋር በማጣመር ውብ እንቅስቃሴ (animation) ያሳያል።
//     * የቁልፉ ጽሁፍም እንደ ሁኔታው 'ተጨማሪ አንብብ' ወይም 'ትንሽ አንብብ' እያለ ይቀያየራል።

// 2.  **አዳዲስ ክፍሎችና መረጃዎች (New Sections and Content)፦**
//     * **ባህልና ወግ:** ስለ ዳውሮ ባህላዊ ልብሶች፣ ስርዓቶች።
//     * **ጭፈራና ሙዚቃ:** ስለ ዳውሮ ጭፈራዎች (ሎኬ፣ ሻንሾ) እና ሙዚቃ።
//     * **ምግብና መጠጥ:** ስለ ባህላዊ ምግቦች (ኡንጫ) እና መጠጦች (ቦርዴ)።
//     * **የፍርድ ስርዓት (ጋዳ):** ስለ ባህላዊው የፍርድ ስርዓት እና ሽማግሌዎች።
//     * ለእያንዳንዱ አዲስ ክፍል አግባብነት ያላቸው አዶዎች (Icons) እና የምስል placeholders ተጨምረዋል።

// 3.  **የተሻሻሉ ምስሎች (Improved Images)፦**
//     * ለእያንዳንዱ ክፍል ይበልጥ አግባብነት ያላቸው እና ጥራት ያላቸው የምስል ማገናኛዎች (Image URLs) ተካተዋል። እነዚህን በዳውሮ ልዩ ምስሎች መተካት ይችላሉ።

// 4.  **ተጨማሪ ዲዛይን ማሻሻያዎች (Additional Design Enhancements)፦**
//     * የ `Cultural Heritage Highlight` ክፍል ዳራ ላይ ያለው "DAWURO" ጽሁፍ አሁን `linear-gradient` ባክግራውንድ በመጠቀም የቀለማት ሽግግር እንዲያሳይ ተደርጓል።
//     * የምስል ቁመት (`h-[350px] md:h-[500px]`) ለሞባይል እና ለዴስክቶፕ የተሻለ ሆኖ እንዲታይ ተስተካክሏል።
//     * `items-start` በ `flex-row` ላይ ተጨምሮ ጽሁፉ እና አዶው ከላይ እንዲሰለፉ ያደርጋል።

// ### እንዴት መጠቀም ይቻላል?

// 1.  **የምስል ማገናኛዎች (Image URLs)፦** በአሁኑ ጊዜ የተካተቱት የምስል ማገናኛዎች (Image URLs) ለምሳሌነት የቀረቡ ናቸው። እነዚህን በእርስዎ የዳውሮ ዞን የተነሱ ከፍተኛ ጥራት ያላቸው ምስሎች መተካት አለብዎት።
// 2.  **የጽሁፍ ይዘት፦** የ`fullContent` ጽሁፎችን እንደአስፈላጊነቱ በማስፋት ወይም በመቀነስ ይበልጥ ዝርዝር መረጃዎችን ማካተት ይችላሉ።

// ይህ ገጽ አሁን ስለ ዳውሮ ዞን አጠቃላይ እና ዝርዝር መረጃዎችን በአሳታፊ መልኩ ለማቅረብ የሚያስችል የተሟላ መዋቅር አለው።