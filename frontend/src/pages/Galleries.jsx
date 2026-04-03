import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineXMark, 
  HiOutlineQueueList, 
  HiOutlineGlobeAlt,
  HiOutlineHeart,
  HiOutlineArrowUpRight,
  HiOutlineArrowLongRight
} from 'react-icons/hi2';
import {Link} from 'react-router-dom';

const galleries = [
  {
    id: 1,
    category: 'Culture',
    title: "Great Dawuro Cutural Clothing",
    subtitle: "The Great Wall of Ethiopia",
    img: "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/489056904_1092529632887683_3673320682005513904_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHgTjfx0Yrjj3G7-mZKBCmayXaNqvJvOG_Jdo2q8m84b_ryS-Vi0bsmPb2pmM2svf_HUNUXouzpZ-XqxXBELjeP&_nc_ohc=ohOTswWXdRUQ7kNvwEOfwhz&_nc_oc=AdlSNyaiSXl5XU6dsz0t5us-iuV4hDiwdVLVUMy_b9gRqbqf6X8_mH4LyIasRrYgk_E&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=6uIr5al8PTYTLj-srsQJrQ&oh=00_AfvuKIfU9zPVvRJzVZRovBldsJYT9eptJIdtio1QUqgwpw&oe=699FEB86",
    desc: "Spanning over 150km, the Halala Kella dry-stone walls stand as a monument to the defensive genius of King Halala. Built in the 18th century to protect the Dawuro people.",
    story: "Dawuro cultural clothing is a colorful and symbolic tradition from southwestern Ethiopia, primarily handwoven from locally spun cotton. The attire is defined by a striking palette of red, yellow, black, and white, colors that represent the community's strength, unity, and ancestral heritage. Facebook Men’s Attire: Typically consists of a striped shawl or woven jacket featuring bold horizontal patterns. Women’s Attire: Defined by elegant dresses often embellished with intricate beadwork and geometric patterns that symbolize nature and fertility. Significance: These garments serve as a primary marker of identity and social status, with designs sometimes varying by clan affiliation. They are worn with great pride during major cultural events such as Toki-bea (New Year), Meskel, and traditional wedding ceremonies"
  },
  {
    id: 2,
    category: 'Education',
    title: "One Package For One Child",
    subtitle: "Empowering the Youth",
    img: "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/555885426_1365427124962746_7704328105299816475_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGhr2lJVXYXeLOeJw6cJ3hfTE953x_gMylMT3nfH-AzKfut99dopiZfU5Wx-DcMZVeAHugwf4TdkvLqJjTPufPg&_nc_ohc=Gqx_ov2N2TUQ7kNvwGXhS1K&_nc_oc=Adm03nqq9I0kI8PZRXLweSRoNKHOCVdHbl8H3achbUaOkU07dlWzI0NAduTHNKg5IqE&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=9aOqcTVkYmSp1K2jD1tWJA&oh=00_AftbPXEKFVnPFhXfV7LCF9tmYf-P2iguvyYaM2-4KwXpCQ&oe=699FF7F6",
    desc: "Our 'One Pack for One Child' initiative ensures that every student in the Dawuro Zone has the tools to succeed. Education is the new 'Dinka'.",
    story: "In the remote villages of Dawuro, a single notebook can be the difference between a dream and a dead end. This gallery captures the raw joy of students receiving their first educational materials. We believe that by investing in the minds of the Tarcha youth, we are building a wall stronger than stone."
  },
  {
    id: 3,
    category: 'Health',
    title: "Tarcha General Hospital",
    subtitle: "Community Care",
    img: "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/556072324_25630387216564282_820755031060246579_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHh5Y_aNE3xVeVkE5Y0rd5EuYYb6jo6i9a5hhvqOjqL1l5xA3KO-NHQz1jYVaqqJ9-y4KI7gMHOrkJhlU1ltHPN&_nc_ohc=Bkzj7OCKwd0Q7kNvwEZTZH1&_nc_oc=Adm4eMhyI4Zulm_d_qXJoKGatguzRAf6HxEpuja5uhEYPAv-CyYtcgRhqyyZDguUlsE&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=c4C1lZAV44z1kpO94_m0ww&oh=00_Afv_gXdrEise_plc2aCgAahOYdeFxhDvxvbQbac5QtFFhA&oe=699FF713",
    desc: "From the Tarcha General Hospital to remote rural clinics, we document the frontline heroes bringing modern healthcare to the region.",
    story: "Healthcare in Dawuro is about more than medicine; it's about accessibility. Our media network travels with mobile clinics to capture the impact of maternal health programs and the resilience of our community health workers."
  },
  {
    id: 4,
    category: 'Economy',
    title: "Luxury Halala Kella Resort",
    subtitle: "Trade and Prosperity",
    img: "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/555672216_1205567264922913_7813097007922101041_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeH-_lgeyo2duMmT1oVZX16NI7sQYaEO-jMjuxBhoQ76M2s4upD1ARf9dcpnr4PRTIwMX3Znby_Q7o83jEnZ1eDc&_nc_ohc=C-VzC1jO7OcQ7kNvwEsiflA&_nc_oc=AdnZWNd7nVGBU-JiEybVxBsh6xm8BB5W8j6djdIZHZOhzFydSctprFYMposeda3B5wc&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=3bZsKkc-ooeZOzopZ42JNQ&oh=00_AfsZ92d8aWT5VfFhdFEzXnv-uGIafK74lI87ujHGnsWYeg&oe=69A001A4",
    desc: "Highlighting the growing markets of Gesa and the agricultural wealth of our coffee and ginger farmers.",
    story: "Halala Kela Luxury Resort -Dawuro Ethiopia 🇪🇹 450 km from A.A in the southwest region of Dawuro zone, Halala Kela luxury Resort is located on the shore of the man-made lake created by Gibe Three Power Plant. This resort is a beautiful resort built on an ancient site surrounded by the King Halala Great Wall and lush green hills spread over 12 hectares. The resort combines the traditional architecture of the area with the modern one, the interior of the house is built with a high ceiling to get fresh air. It is a wonderful resort."  },
  {
    id: 5,
    category: 'Culture',
    title: "Dawuro Historical Music",
    subtitle: "The Great Traditional Songs of Ethiopia",
    img: "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/622395717_1199866752263740_2025088508006819348_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEueJz1zYm4eyEt-X023D9r68dhNnzFRfvrx2E2fMVF-zlTQZmZrzRkyCd796oF1MOMgrS_llw6JWCofdJaSTft&_nc_ohc=QwHPHFt7KV0Q7kNvwGDmyZw&_nc_oc=AdkeR0Fni4aYkySQ-k-bPzvZptQlYfMiULtjchl-tWhoZwV5QRe9AHNlEpPReHYzQPo&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=onLWFu_53afN40XI8IMrlQ&oh=00_AftXO62Bv4G2CADmNz1XrI0b2biR1t9FV0tSA5Bs5Jnneg&oe=699FDD1F",
    desc: "Spanning over 150km, the Halala Kella dry-stone walls stand as a monument to the defensive genius of King Halala. Built in the 18th century to protect the Dawuro people.",
    story: "Walking through the stone gates of Kati Halala is like stepping back into a time of kings and warriors. The indigenous technology used to stack these stones without mortar is a mystery that continues to fascinate historians. As Dawuro Media Network, we document every stone to ensure the story of King Halala lives forever in the digital age."
  },
    {
    id: 5,
    category: 'City',
    title: "Dawuro Tarcha City",
    subtitle: "The Capital of Dawuro",
    img: "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/627040979_1412709384199557_731726769947840652_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGiqdbxkUdJIIr6lxo1W-4th7IFMuhu-SiHsgUy6G75KMI7Gu_O8ZJc_ddJaZ0LfTnKvYSYVNwwy37HRSdSQKa7&_nc_ohc=uXGIaDdq1bkQ7kNvwESo_2x&_nc_oc=Adle2J2qILGut5JzPRkaBrH09GdM11PO70MmgLPcR95zBl96Iq98-8qmojBabSMvSRw&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=Ngz1gwd-6cMnFEUKPG4bcw&oh=00_AfvZDNJhdCTSxDzK6fgHM8aquqoQ0989lGSWANWmZPiRjA&oe=69A02930",
    desc: "Tarcha is the administrative capital of the Dawuro Zone in South West Ethiopia, located approximately 474-505 km southwest of Addis Ababa. Situated at an elevation of 1,200m–1,450m, it is a growing town near the Omo River, serving as a hub for tourism, including the nearby Halala Kela Resort and Gilgel Gibe III Dam.",
    story: "Dawuro Tarcha represents the vibrant heart of the Dawuro Zone in Ethiopia's South West Ethiopia Peoples' Region. As the administrative capital, Tarcha serves as the cultural and economic hub for the Dawuro people, who are celebrated for their rich history of independence and their unique Omotic language, Dawurotsuwa. The area is geographically striking, characterized by rugged mountains and deep valleys, and it is historically famous for the ancient defensive stone walls known as the 'Halala Kella'. Today, Tarcha is evolving into an educational and developmental center, notably hosting a campus of Wolaita Sodo University and serving as a gateway for those exploring the natural beauty and the engineering marvels of the nearby Gibe III Hydroelectric Dam."
  },
  {
    id: 6,
    category: 'Education',
    title: "One Package For One Child",
    subtitle: "Empowering the Youth",
    img: "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/556688472_1365428891629236_1508812832666703455_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFYmD4V-oukQ9pniK6oZUc_MTtjwtxOPGoxO2PC3E48aoTaRBD6x50-4v7UNG_qT4ofzzVcdc4fpdjTjXU3aprc&_nc_ohc=mnjyTpbrlX4Q7kNvwFalTTB&_nc_oc=Adm88QV6GC8vA-ECVKmGAO2xQdD67rbpssedB-Dhg0nhYeRgknI-mQXFOH9tGpkkNHY&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=Lzu461M5_w7s9EIkJNDApg&oh=00_AfsMhpOvkSkaF4V0xR7vynh6dERIzDr04Kd7MnNT7EcZ7Q&oe=699FED2F",
    desc: "Our 'One Pack for One Child' initiative ensures that every student in the Dawuro Zone has the tools to succeed. Education is the new 'Dinka'.",
    story: "Ethiopian Youth Leads Campaign to Send Thousands of Children to SchoolAn inspiring philanthropic initiative in Ethiopia has enabled more than 1,750 children to access education over the past four years. The effort is led by Behailu Mathewos, founder of the *New Dawuro Foundation*, who has mobilized widespread support through social media to provide disadvantaged students with essential school supplies. Based in Tarcha, Dawro Zone of the South-West Ethiopia Peoples’ Region, Behailu has emerged as a driving force in promoting educational access. Since 2017, his annual campaign *“One Pack for One child”* has supplied learning materials to children who might otherwise have been unable to attend classes due to poverty. Most recently, beginning in August 2017 (Ethiopian calendar), a global fundraising drive generated nearly 200,000 Ethiopian birr (approximately USD 3,600). The campaign enabled the purchase and distribution of school supplies to more than 500 children. In total, more than 130 international donors contributed to the effort. Local education officials have praised the initiative. Mr. Tamagn Haile, Acting Head of the Dawro Zone Education Office, described Behailu work as “a vital support to the education sector” and called for continued collaboration among parents, professionals, charitable organizations, and individuals to ensure children remain in school. Behailu  has dedicated the 2018 campaign in memory of his late sister, Maya Mathewos & Wushiti, who passed away in a car accident in 2017. He expressed gratitude to all supporters, emphasizing that their contributions have prevented children from dropping out of school due to lack of basic supplies. Looking ahead, the New Dawuro Foundation has announced plans to expand its work beyond education, with future programs targeting health, agriculture, water, and media development. Parents who benefited from the program commended the foundation, describing Bahilu’s efforts as a model of youth-led community service with the potential to inspire similar initiatives across the country.   *Source: New Dawuro Media"   },
  {
    id: 3,
    category: 'Health',
    title: "Dawuro Zone Woreda Wellness",
    subtitle: "Community Care",
    img: "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/482345133_1077246394442757_1376762322072254728_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGpeHpYM9hzuTjCylE_MJ0_87bkgb9gZE3ztuSBv2BkTXM6ZgHU8n1DsKAo7xBBilfof5Oa4w-x5cb1ubgzf9g3&_nc_ohc=EDD6346FVWMQ7kNvwEeC9Eg&_nc_oc=AdlkxKL1ZT9JlOjW5_U9Q8ILr2efr4U0t9RKlhIjeqwUGQEufjjcyTeFBpqkY3jGRVk&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=ZuhhGCcWwc2TquP-_yFReA&oh=00_AfvhPo4I44GTmby2q8b-V8oKdsu1funj-NM0qkZ_PAD_Cg&oe=699FFE30",
    desc: "From the Tarcha General Hospital to remote rural clinics, we document the frontline heroes bringing modern healthcare to the region.",
    story: "Healthcare in Dawuro is about more than medicine; it's about accessibility. Our media network travels with mobile clinics to capture the impact of maternal health programs and the resilience of our community health workers."
  },
  {
    id: 4,
    category: 'Economy',
    title: "The Financial Gateway",
    subtitle: "Trade and Prosperity",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80",
    desc: "Highlighting the growing markets of Gesa and the agricultural wealth of our coffee and ginger farmers.",
    story: "The pulse of Dawuro is found in its vibrant markets. As the Gilgel Gibe III project brings energy to our region, we track the economic transition of our people from subsistence farming to regional trade powerhouses."
  },
    {
    id: 9,
    category: 'Heritage',
    title: "Dawuro Dinka",
    subtitle: "World's Longest Woodwind ",
    img: "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/531720091_1268699835268003_6634243935686485731_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeF3KwxVyYnjHmb1rB11BCmPFf-tVtamXPYV_61W1qZc9qm29u_Vhonn0rGabzr26PQYIHyHYOTNdnm5dDjjGcO0&_nc_ohc=qG9uYVpEHFMQ7kNvwGnQHz2&_nc_oc=AdmmCUS0PxuBvE-qtjB-2AIYLJI0924egTq_5lsbj9E-HmvLk38BeVdsZ32i2CdASlA&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=_w2TBCzzWJtsrATcXKF7LQ&oh=00_AfuHGpXOlAXoAHFDL8MjQN3hV_kHdFpYJV_TklpMm8102w&oe=69A04B67",
    desc: "The Dinka is a traditional wind instrument of the Dawro people; the largest Dinka is 2.5 meters long and produces the sound of an elephant. The Dinka dance and music have 7 rhythms; the world's longest instrument is also an Ethiopian ornament.",
    story: "Dawro Dinka 🎶📯World’s Longest Woodwind Instrument Echoes from Ethiopia! the Dawro Dinka, believed to be the longest woodwind instrument in the world. Made from giant bamboo and stretching up to 5 meters, the Dinka produces deep, resonant notes that carry across valleys, calling communities together. This extraordinary woodwind instrument is not only unique in sound and craftsmanship but is also believed to be the longest woodwind instrument in the world, reaching an impressive length that can exceed several meters.For generations, the instrument has served as a call to assemble, a tool of storytelling, and a way to express collective emotion. In many Dawro traditions, the playing of the Dinka marks the beginning of a celebration, and its absence would leave the occasion incomplete. The Dinka is a vessel of heritage, history, and unity. Played during cultural festivals, New Year celebrations (Tokibea), weddings, celebrity funeral and significant community gatherings, the Dinka’s deep, resonant sound carries across valleys and hills, gathering people together in joy and pride. For the Dawro community, the Dinka is more than a musical tool, it is a cultural emblem."
  },

      {
    id: 9,
    category: 'Food',
    title: "Dawuro Special",
    subtitle: "World's Longest Woodwind ",
    img: "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/480918829_952258377024580_6028991586173031111_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEJqOeonp4giq2t6_bWK5RH3ZCJZqSqOVbdkIlmpKo5VgJvvLzikVPSfpsJKUMu1Z4QkjET8B_m9BBgBSVF500t&_nc_ohc=QgZn7rMUwxoQ7kNvwH6TjOL&_nc_oc=Adml2dAAKs9Dx80h1L02kfUDHi1yRiqwbKN8diQliS2kzS0wdl9nNnuPQ3coiXkihzA&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=o7tGQlTZfLVJ6M29Sy4p_g&oh=00_Afux7_TOKDk2k14e_raiWXZW5avuEhESrGB6xiOQFgq8nA&oe=69A0481F",
    desc: "Dawuro cultural food is a rich reflection of the agricultural heritage of the Dawuro Zone in southwestern Ethiopia, primarily centered around enset (false banana) and livestock products like butter and cheese",
    story: "A flavorful expression of the agricultural identity of southwestern Ethiopia, deeply rooted in the cultivation of enset and high-quality livestock products. The cuisine is defined by rich, energy-dense dishes like Seliso and Uta, which masterfully combine fermented plant staples with spiced clarified butter, local cheeses, and sour cream. From the festive Buratua chicken specialty served to honored guests to the medicinal Kubua garlic breakfast, every meal reflects a heritage of hospitality and resourcefulness. This culinary tradition, often showcased by platforms like 'Dawuro Media Network', serves as a vital cultural bridge, preserving the unique flavors of the Omo region for future generations."
  },


];


const Categories = ['All', 'Culture', 'Education', 'Health', 'Economy', 'City', 'Food', 'Heritage'];

const Galleries = () => {
  const [filter, setFilter] = useState('All');
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = filter === 'All' 
    ? galleries 
    : galleries.filter(g => g.category === filter);

  const activeItem = filteredItems[activeIdx] || filteredItems[0];

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-20 pb-10 transition-colors duration-500 overflow-x-hidden">
      <div className="max-w-[1700px] mx-auto px-4 md:px-12">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 md:mb-16 gap-6 md:gap-8">
          <header className="max-w-3xl">
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-red-600 font-black tracking-[0.4em] uppercase text-[9px] md:text-[10px] mb-2 md:mb-4"
            >
              Documenting Our Legacy • Dawuro Media Network
            </motion.p>
            <h1 className="text-4xl md:text-9xl font-black text-black dark:text-white uppercase tracking-tighter leading-[0.9]">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Living</span> Archive
            </h1>
          </header>

          {/* Dynamic Category Filter */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2">
            {Categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setActiveIdx(0); }}
                className={`text-[9px] font-black uppercase tracking-widest px-6 py-3 md:px-8 md:py-4 rounded-full border-2 transition-all shrink-0 ${
                  filter === cat 
                  ? 'bg-red-600 text-white border-red-600 shadow-xl' 
                  : 'border-gray-100 dark:border-white/10 dark:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* FEATURED STORY AREA */}
          <div className="lg:col-span-8 group relative aspect-[4/5] md:aspect-[16/10] lg:aspect-auto lg:h-[70vh] overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem?.id}
                initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <img src={activeItem?.img} className="w-full h-full object-cover md:group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
              <motion.div key={activeItem?.id + "text"} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <span className="text-red-500 font-black uppercase text-[10px] tracking-widest block mb-1">{activeItem?.subtitle}</span>
                <h2 className="text-3xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">{activeItem?.title}</h2>
                <p className="text-white/70 text-sm md:text-lg max-w-2xl mt-3 md:mt-4 leading-relaxed font-light line-clamp-3 md:line-clamp-none italic">"{activeItem?.desc}"</p>
                <button 
                  onClick={() => setSelectedItem(activeItem)}
                  className="mt-6 md:mt-8 w-full md:w-auto bg-white text-black px-8 py-4 md:px-12 md:py-5 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3 shadow-2xl"
                >
                  Read Full Story <HiOutlineArrowUpRight size={18}/>
                </button>
              </motion.div>
            </div>
          </div>

          {/* SIDE/BOTTOM SCROLLABLE LIST */}
          <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center justify-between px-2">
              <span className="flex items-center gap-2"><HiOutlineQueueList size={16} className="text-red-600"/> Discover Stories</span>
              <span className="lg:hidden text-[8px] animate-pulse">Swipe Left →</span>
            </h3>
            
            {/* Horizontal Scroll on Mobile, Vertical on Desktop */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto no-scrollbar pb-6 lg:pb-0 lg:max-h-[65vh] lg:pr-4 custom-scrollbar snap-x snap-mandatory">
              {filteredItems.map((item, idx) => (
                <div 
                  key={item.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`snap-center min-w-[85%] md:min-w-[45%] lg:min-w-full p-4 md:p-6 cursor-pointer border-l-4 transition-all duration-500 flex items-center gap-4 md:gap-6 rounded-r-xl ${
                    activeIdx === idx 
                    ? 'bg-zinc-100 dark:bg-zinc-900 border-red-600' 
                    : 'border-transparent bg-gray-50 dark:bg-zinc-900/40'
                  }`}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shrink-0 border dark:border-white/5">
                    <img src={item.img} className="w-full h-full object-cover" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-red-600 text-[8px] font-black uppercase tracking-widest block truncate">{item.category}</span>
                    <h4 className="text-sm md:text-lg font-black dark:text-white uppercase tracking-tight truncate">{item.title}</h4>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase mt-1 flex items-center gap-1 group">
                       View Details <HiOutlineArrowLongRight className="group-hover:translate-x-1 transition-transform" />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- STORY MODAL (STORYTELLING FOCUS) --- */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[500] flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/98 backdrop-blur-2xl"
            />
            <motion.div 
              initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl h-full lg:h-[90vh] bg-white dark:bg-[#0c0c0c] overflow-hidden lg:rounded-2xl flex flex-col shadow-2xl"
            >
              <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-3 bg-black/40 text-white rounded-full hover:bg-red-600 transition-all">
                <HiOutlineXMark size={28}/>
              </button>

              <div className="overflow-y-auto h-full scroll-smooth">
                {/* Modal Cover Image */}
                <div className="h-[45vh] md:h-[55vh] w-full relative shrink-0">
                  <img src={selectedItem.img} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/20 to-transparent" />
                  <div className="absolute bottom-10 left-6 right-6 lg:left-20">
                    <span className="bg-red-600 text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest">{selectedItem.category}</span>
                    <h2 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter mt-4 leading-none">
                      {selectedItem.title}
                    </h2>
                  </div>
                </div>

                {/* Long Description Content */}
                <div className="p-6 md:p-12 lg:p-20">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20">
                    
                    <div className="lg:col-span-8 space-y-10 md:space-y-16">
                      {/* Large Font Intro */}
                      <p className="text-2xl md:text-5xl font-serif dark:text-white leading-[1.2] italic text-gray-800 tracking-tight">
                        {selectedItem.desc}
                      </p>
                      
                      {/* Body Content */}
                      <div className="space-y-6 md:space-y-8 text-gray-600 dark:text-gray-400 text-lg md:text-2xl leading-[1.6] md:leading-[1.8] font-light">
                        {selectedItem.story}
                      </div>
                      
                      <div className="h-px w-20 bg-red-600" />
                      
                      <p className="text-gray-400 dark:text-zinc-600 text-sm md:text-base leading-relaxed uppercase tracking-widest font-black">
                        Documentation by Dawuro Media Network • {new Date().getFullYear()}
                      </p>
                    </div>

                    {/* Interaction Side Column */}
                    <div className="lg:col-span-4 space-y-6">
                       <div className="p-6 md:p-10 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border dark:border-white/5 space-y-6">
                          <h4 className="text-[10px] font-black uppercase text-red-600 tracking-[0.3em]">Direct Impact</h4>
                          <p className="text-sm md:text-lg dark:text-gray-300 font-medium">Your support helps us continue documenting these powerful stories in the Dawuro Zone.</p>
                          <Link to="donate" className="w-full py-4 md:py-5 bg-black dark:bg-white text-white dark:text-black font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-all shadow-xl">
                            <HiOutlineHeart size={18}/> Support This Work
                          </Link>
                       </div>
                       
                       <div className="flex flex-col gap-4 px-4 pt-4">
                         <h5 className="text-[8px] font-black uppercase text-gray-500 tracking-widest">Connect with Hub</h5>
                         <SocialAction icon={<HiOutlineGlobeAlt/>} text="Official Website" />
                         <SocialAction icon={<HiOutlineQueueList/>} text="Related Archives" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SocialAction = ({ icon, text }) => (
  <div className="flex items-center gap-4 text-gray-500 hover:text-red-600 cursor-pointer transition-colors group">
    <div className="p-2 md:p-3 bg-gray-100 dark:bg-zinc-900 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all">{icon}</div>
    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">{text}</span>
  </div>
);

export default Galleries;