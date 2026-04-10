import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineAcademicCap, 
  HiOutlineGlobeAlt, 
  HiOutlineUserGroup, 
  HiOutlineHeart,
  HiXMark,
  HiOutlineCalendar,
  HiOutlineMapPin,
  HiOutlineCurrencyDollar
} from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const OnePackage = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const campaigns = [
    {
      id: 1,
      year: "መስከረም 14፣ 2017",
      title: "አንድ እሽግ ለአንድ ልጅ",
      headline: "በትምህርት ቁሳቁስ ምክንያት አንድም ተማሪ እቤቱ መቅረት የለበትም",
      image: "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/550762340_1360137218825070_1078451427823850214_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeG-msnv9LnaeqFB8P2EsGVFn0su29sr45mfSy7b2yvjmeUr-S5Zl4IDBwijouhmeSwVsfYAxg9iDHHoUtO2KV4T&_nc_ohc=X20tnWSU5GUQ7kNvwGGPILY&_nc_oc=AdkvzIqtEvQ8yS7VpuFESymwchyATwUzfxBJt1OWJ3oJDZIAiuRmrqKUziztle1GuCo&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=rYvAjZuiiIEM-fKA3jKKeQ&oh=00_AfuLwza356IF0FOL-H5wzgzKP-BH9cdnrOlRwRxltyZ2fA&oe=69A4FDC8",
      category: "Education",
      donors: "50+ International",
      impact: "2000+ Children",
      budget: "1,000,000 ETB",
      location: "Tarcha Local, Dawro Zone",
      fullStory: `በNew Dawuro Media አማካኝነት ለአንድ ወር ከ12 ቀን ቀናቶች በቆየው  የOne pack for One Child (አንድ እሽግ ለአንድ ልጅ) ዘመቻ ብቻ ከ500 በላይ ተማሪዎችን ለማገዝ ሀብት አሰባስበናል። በ2018 ዓ/ም በማህበራዊ ሚድያ በተደረገ ዘመቻ ከተለያዩ አከባቢዎች ማለትም ከሀገር ውስጥ እና ከሀገር ውጭ ሲሆን። ከእነዝህም መካከል የደቡብ ምዕራብ ኢትዮጵያ ህዝቦች ክልል ነዋሪዎች መካከል በተለይም የዳውሮ ተወላጆች ፤ የካፋ ተወላጆች ፤ የኮንታ ተወላጆች እና ከተለያዩ አከባቢዎች ለበጎ አላማ በጋራ በመቆም ከ130 በላይ ግለሰቦች እና ድርጅቶች ተሳታፊ ሆነዋል። ከዝህ ሒደት አንድ ነገር ለመማር ችለናል። ይህም የዳውሮ ህዝብ ምን ያህል አንዱ አንዱን ለማገዝ ያለውን ቀና ፍላጎት ለመታዘብ ችለናል። ከዝህ መነሻ ዳውሮ ላይ እርስ በእርስ የመተጋገዝ ባህል ሊዳብር እንደሚገባ እና ከዝህ በተሻለ መልኩ አቅም ሊሆነን የሚችል ህዝብ እንዳለን አመላካች ነገሮች ታይተዋል። በመጨረሻም የOne pack for One Child (አንድ እሽግ ለአንድ ልጅ ) ዘመቻ የተቀላቀላችሁ ወንድም እና እህቶች በእነዝህ ሚስኪነ ተማሪዎች ስም ከልብ እያመሰገንን ፤ በሚቀጥሉት ጊዚያቶች ከዝህ በበለጠ መልኩ ለአከባቢያችን ልማት እና እድገት እንድሁም አጠቃላይ ማህበራዊ ለወጥ ከጎናችን እንደምትቆሙ ተስፋ በማድረግ ነው። New Dawuro foundation በዳውሮ ዞን ውስጥ አወንታዊ ለውጥ ለማምጣት ቁርጠኛ የሆነው ተቋም፡፡ ከልብ እናመሰግናለን! መስከረም 10/2018 ዓ/ም ዳውሮ ዞን ታርጫ New dawuro Foundation New Dawuro Media`,
      quote: "Behailu work is a vital support to the education sector. - Mr. Tamagn Haile, Dawro Zone Education Office",
      legacy: "The 2018 campaign was dedicated in memory of Maya Mathewos & Wushiti."
    },
    {
      id: 2,
      year: "ሐምሌ 01፣ 2017",
      title: "#በጋራ እንችላለን!",
      headline: "አንድ_እሽግ_ለአንድ_ልጅ ዘመቻ በይፋ ተጀመረ!",
      image: "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/538279313_1338755910963201_3518307820299602597_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHGtV2Q-nA2sUCuunIMPAS6YdEcMo3h5Qdh0RwyjeHlB_7nsFLXNVxlKnX5dwxEDCN4SAUzd6dQyd9-BYNRmj-4&_nc_ohc=9k_JTN6elYgQ7kNvwGlNWxh&_nc_oc=AdkcUtKta4LG3VymJGeloT64lVls_gwyCM_0wvgsEZEw2m3VZnC79XBBfCkolLSvmEU&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=eR6bJrBzKiFjbzNPWv1gWw&oh=00_Afv7l_4dT3RTVzBB1T2L6_f9ms0NhUfZl7C0w4ouzg8n-g&oe=69A4E4E3",
      category: "Education",
      donors: "10+ International Donors",
      impact: "1005+ Children",
      budget: "200,000 ETB",
      location: "Tarcha, Dawro Zone",
      fullStory: `በትምህርት ቁሳቁስ ምክንያት አንድም ተማሪ እቤቱ መቅረት የለበትም " ! በሚል መርህ ለአዲስ አመት 2018 ዓ.ም በኢትዮጵያ ውስጥ በተለያዩ ቦታዎች አቅም ለሌላቸው ህጻናት ልጆች የትምህርት ቀሳቁስ በመስጠት ወደ ትምህርት ቤት እንዲሄዱ ያድርጉ በማለት በNew Dawuro Foundation ዘመቻ እና ገቢ የማሰባሰብ መረሀ ግብር ለሶስተኛ ጊዜ አሰጀምራል። ይህን ዘመቻ ከተለያዩ አከባቢዎች ግለሰቦች እና ድርጅቶች ተቀላቅላችሁ የበኩላችሁን አስተዋጽኦ እንድታበረክቱ ጥሪ እናቀርባለን። እንደ ሀገር ትምህርት የሚጀምርበት ቀን መስከረም በመሆኑ ፤ ከተለያዩ በጎ ሰዎች እና ግለሰቦች ያምናሰባስበው ደብተር እና ስክሪብቶ ለተፈለገለት ዓላማ ለማዋል አንድ ወር ብቻ ስለቀረን ፤ የአንድ እሽግ ለአንድ ልጅ ዘመቻ ሁላችሁም እንድትቀላቀሉ ጥሪ እናቀርባለን። አንድ እሽግ ለአንድ ልጅ 12 ደብተር 2 እስኪርቢቶ 2 እርሳስ 2 መቅረጫ 2 ላጲስ የአንድ እሽግ ዋጋ 1000 ብር ሲሆን ፤ እርሶ እንደ አቅሞ የቻሉትን በመለገስ የአንድ እሽግ ለአንድ ልጅ ዘመቻ እንድትቀላቀሉ በትህትና እንጠይቃለን!! የOne Pack For one Child (የአንድ እሽግ ለአንድ ልጅ) ዘመቻ በመቀላቀል ይህንን መልካም ዓላማችንን ይደግፉ፡፡ በኢትዮጵያ ንግድ ባንክ በተከፈተው አካውንት 1000563357798 አቅሞ የፈቀደው ያግዙ። በተጨማሪ የባንክ ስሊፕ በቴሌግራም በ0917411711 ይላኩሉን ፤ ይደውሉልን። በቅርብ ይላችሁ ከላይ የተጠቀሱ የትምህርት ቁሳቁሶችን ለመስጠት ሲፈልጉ ፤ በ0917411711 ይደውሉሉን! 
      #New Dawuro Foundation `,
      quote: "Behailu work is a vital support to the education sector. - Mr. Tamagn Haile, Dawro Zone Education Office",
      legacy: "The 2018 campaign was dedicated in memory of Maya Mathewos & Wushiti."
    },

    {
      id: 3,
      year: "ሐምሌ 15፣ 2016",
      title: "ትውልድ ላይ እንስራ!",
      headline: "መማር እየቻሉ በደብተር እጦት የሚቸገሩ ታናናሾቻችንን እናስተምር!",
      image: "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/476894892_1195738171931643_7633712265626617564_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGbpdFIWew5M1usTunKdsuhcalpkdrbuFZxqWmR2tu4VrUN4_LfRYP3pUAlEZ3vDjcUILLVBw_HUvO41X0R4YDW&_nc_ohc=QAIMorTdOtcQ7kNvwEedZUh&_nc_oc=AdkIlV6dH-6-mlrMAkEbdc2i6nYv1HJR2KWeX79IEviuqDftZGBot8etwaH8uBsIcAQ&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=8LmgcKgjwxELG_EBbzVBeQ&oh=00_AfuQimw_z44ZIVSc5wHTzSM5SvX_pW8Jn0WCGdtoYkVMzw&oe=69A50DF7",
      category: "Education",
      donors: "30+ International",
      impact: "4000+ Children",
      budget: "100,000 ETB",
      location: "Tarcha, Dawro Zone",
      fullStory: `በትምህርት ቁሳቁስ ምክንያት አንድም ተማሪ እቤቱ መቅረት የለበትም " ! በሚል መርህ ለአዲስ አመት 2017 ዓ.ም በኢትዮጵያ ውስጥ በተለያዩ ቦታዎች አቅም ለሌላቸው ህጻናት ልጆች የትምህርት ቀሳቁስ በመስጠት ወደ ትምህርት ቤት እንዲሄዱ ያድርጉ በማለት በNew Dawuro Foundation ዘመቻ እና ገቢ የማሰባሰብ መረሀ ግብር ለሶስተኛ ጊዜ አሰጀምራል። ይህን ዘመቻ ከተለያዩ አከባቢዎች ግለሰቦች እና ድርጅቶች ተቀላቅላችሁ የበኩላችሁን አስተዋጽኦ እንድታበረክቱ ጥሪ እናቀርባለን። እንደ ሀገር ትምህርት የሚጀምርበት ቀን መስከረም በመሆኑ ፤ ከተለያዩ በጎ ሰዎች እና ግለሰቦች ያምናሰባስበው ደብተር እና ስክሪብቶ ለተፈለገለት ዓላማ ለማዋል አንድ ወር ብቻ ስለቀረን ፤ የአንድ እሽግ ለአንድ ልጅ ዘመቻ ሁላችሁም እንድትቀላቀሉ ጥሪ እናቀርባለን። አንድ እሽግ ለአንድ ልጅ 12 ደብተር,

2 እስኪርቢቶ,

2 እርሳስ,

2 መቅረጫ,

2 ላጲስ የአንድ እሽግ ዋጋ 1000 ብር ሲሆን ፤ እርሶ እንደ አቅሞ የቻሉትን በመለገስ የአንድ እሽግ ለአንድ ልጅ ዘመቻ እንድትቀላቀሉ በትህትና እንጠይቃለን!!

የOne Pack For one Child (የአንድ እሽግ ለአንድ ልጅ) ዘመቻ በመቀላቀል ይህንን መልካም ዓላማችንን ይደግፉ፡፡ በኢትዮጵያ ንግድ ባንክ በተከፈተው አካውንት 1000563357798 አቅሞ የፈቀደው ያግዙ። በተጨማሪ የባንክ ስሊፕ በቴሌግራም በ0917411711 ይላኩሉን ፤ ይደውሉልን። በቅርብ ይላችሁ ከላይ የተጠቀሱ የትምህርት ቁሳቁሶችን ለመስጠት ሲፈልጉ ፤ በ0917411711 ይደውሉሉን!
`,
      quote: "Behailu work is a vital support to the education sector. - Mr. Tamagn Haile, Dawro Zone Education Office",
      legacy: "The 2018 campaign was dedicated in memory of Maya Mathewos & Wushiti."
    },


  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pb-20 selection:bg-red-500/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/476981391_1195746891930771_3280553422354794919_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFmXsHgTPS4FRN-lyLVqT0hIyqEKmnB5dAjKoQqacHl0DZ0FtrJr_587flddXpjnCvsxm2CHnFhVAziDeOfQlxD&_nc_ohc=h1Tk1hNNkGsQ7kNvwEWFdDk&_nc_oc=AdktlMnlIFLGSFmoQAv2Up61YqKhHx78_qW9wktn-VlYit3T3tLnt1rrGE7kqpDFOKA&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=sHQTwUfMbuPyqKtpfXE2Fg&oh=00_Afu09X2Cs4Pl_hitpr0xeODvAPj_e1BZguM8U4Jz7pt4QQ&oe=69A50F15" 
            className="w-full h-full object-cover opacity-20 dark:opacity-20 grayscale"
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white dark:via-[#050505] to-white dark:to-[#050505]" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-red dark:text-white uppercase tracking-tighter italic leading-none"
          >
            One Package <br />
            <span className="border-b-4 border-red-600" style={{ WebkitTextStroke: '1px currentColor' }}>For One child</span>
          </motion.h1>
        </div>
      </section>

      {/* --- CONTENT GRID --- */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-${item.id}`}
              onClick={() => setSelectedCampaign(item)}
              className="group cursor-pointer bg-gray-50 dark:bg-white/5 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 hover:border-red-600/30 transition-all shadow-xl hover:shadow-red-600/5"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 py-2 rounded-2xl">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-600">{item.year}</span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-600 rounded-lg text-white">
                    <HiOutlineAcademicCap size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.category}</span>
                </div>
                <h3 className="text-2xl font-black text-black dark:text-white uppercase tracking-tighter mb-4 group-hover:text-red-600 transition-colors line-clamp-2">
                  {item.headline}
                </h3>
                <div className="flex justify-between items-center border-t border-gray-200 dark:border-white/10 pt-6">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Impact</span>
                    <span className="text-sm font-bold dark:text-white">{item.impact}</span>
                  </div>
                  <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/20 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all">
                    <HiOutlineArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedCampaign && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCampaign(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
            />
            
            <motion.div 
              layoutId={`card-${selectedCampaign.id}`}
              className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-[#0c0c0c] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >
              <button 
                onClick={() => setSelectedCampaign(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-white/10 dark:bg-white/5 rounded-full text-white lg:text-black dark:lg:text-white hover:bg-red-600 transition-colors"
              >
                <HiXMark size={24} />
              </button>

              {/* Image Side */}
              <div className="w-full lg:w-1/2 h-64 lg:h-auto overflow-hidden">
                <img src={selectedCampaign.image} className="w-full h-full object-cover" alt="Detail" />
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 p-8 lg:p-16 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    {selectedCampaign.year}
                  </span>
                  <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Featured Story</span>
                </div>

                <h2 className="text-3xl lg:text-5xl font-black text-black dark:text-white uppercase tracking-tighter mb-6 leading-none italic">
                  {selectedCampaign.title}
                </h2>

                <div className="grid grid-cols-2 gap-6 mb-10 pb-8 border-b border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <HiOutlineMapPin className="text-red-600" size={20} />
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Location</p>
                      <p className="text-[11px] font-bold dark:text-white">{selectedCampaign.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <HiOutlineCurrencyDollar className="text-red-600" size={20} />
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Fundraised</p>
                      <p className="text-[11px] font-bold dark:text-white">{selectedCampaign.budget}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed uppercase tracking-wider font-medium">
                    {selectedCampaign.fullStory}
                  </p>
                  
                  <div className="p-6 bg-red-50 dark:bg-red-500/5 rounded-[2rem] border-l-4 border-red-600 italic text-sm text-gray-700 dark:text-gray-300">
                    "{selectedCampaign.quote}"
                  </div>

                  <p className="text-xs font-black text-[#cc0000] uppercase tracking-[0.2em]">
                    Legacy: {selectedCampaign.legacy}
                  </p>
                </div>

                <Link to="/donate"  className="flex items-center gap-3 mt-10 hover:text-red-600 transition-colors text-black dark:text-white font-black uppercase tracking-widest border border-red-600 py-3 px-6 rounded-full hover:bg-red-600 hover:text-white">
                  Support Future Campaign <HiOutlineArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper Icon for card button
const HiOutlineArrowRight = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export default OnePackage;