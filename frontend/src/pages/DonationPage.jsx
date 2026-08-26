import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineHeart, 
  HiOutlineBanknotes,
  HiOutlineCheckBadge,
  HiOutlineArrowRight,
  HiOutlineClipboardDocument,
  HiOutlineLightBulb,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineShieldCheck,
  HiOutlineXMark,
  HiOutlineInformationCircle,
  HiOutlineGlobeAlt,
  HiOutlineMicrophone
} from 'react-icons/hi2';

const paymentMethods = [
  {
    id: 'telebirr',
    name: 'Telebirr',
    color: 'bg-[#005bb7]',
    account: '0942541997',
    holder: 'Lidetu Tesfaye',
    instructions: 'Use the "Pay Merchant" option or direct transfer.'
  },
  {
    id: 'cbe',
    name: 'Commercial Bank (CBE)',
    color: 'bg-[#5e2d91]',
    account: '1000178812061',
    holder: 'Lidetu Tesfaye',
    instructions: 'Please put "Donation" in the reference field.'
  },
    {
    id: 'Dashin Bank',
    name: 'Amole Lite',
    color: 'bg-[#5e2d24]',
    account: '1234567890',
    holder: 'Lidetu Tesfaye',
    instructions: 'Use the "Amole Lite Connection" option or direct transfer.'
  }
];

const DonationPage = () => {
  const [isDark, setIsDark] = useState(true);
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [tin, setTin] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Future integration point
  };

  return (
    <div className={`bg-white dark:bg-[#0c0c0c] transition-all duration-700`}>
      <div className="min-h-screen bg-[#f4f4f4] dark:bg-[#0c0c0c] text-zinc-900 dark:text-zinc-100 font-sans">
        
        {/* TOP NAV / THEME TOGGLE */}
        <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/10 dark:bg-black/10 border-b border-zinc-200 dark:border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#cc0000]  flex items-center justify-center">
              <HiOutlineMicrophone className="text-white" />
            </div>
            <span className="font-black uppercase tracking-tighter text-xl">DMN<span className="text-[#cc0000]">.</span></span>
          </div>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2  bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-white/10 transition-transform active:scale-95"
          >
            {isDark ? <HiOutlineSun size={20} className="text-yellow-400" /> : <HiOutlineMoon size={20} className="text-[#cc0000]" />}
          </button>
        </nav>

        <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT SIDE: THE STORYTELLING */}
          <div className="space-y-12 lg:sticky lg:top-32 h-fit">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-black leading-[0.9] uppercase tracking-tighter">
                Our Voice <br/> 
                <span className="text-[#cc0000]">Has No Limit.</span>
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-md leading-relaxed">
                Dawuro Media Network isn't just a channel; it's a digital bridge for our culture. Your support keeps the lights on and the microphones live.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <HiOutlineGlobeAlt/>, title: "Global Reach", desc: "Expanding to satellite TV for our diaspora." },
                { icon: <HiOutlineHeart/>, title: "Purely Local", desc: "Owned by the community, for the community." }
              ].map((item, i) => (
                <div key={i} className="p-6  bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-white/5">
                  <div className="text-[#cc0000] mb-3 text-2xl">{item.icon}</div>
                  <h4 className="font-black uppercase text-xs tracking-widest mb-1">{item.title}</h4>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* TESTIMONIAL / REALISTIC TOUCH */}
            <div className="bg-white dark:bg-zinc-900  p-6 border-l-2 border-[#cc0000] pl-6 italic text-zinc-400 dark:text-zinc-500 text-sm">
              "We tell the stories of Tercha, the history of our elders, and the hope of our children. This network is our legacy."
              <p className="mt-2 font-black uppercase tracking-widest text-[10px] not-italic text-zinc-900 dark:text-zinc-100">— DMN Editorial Team</p>
            </div>
          </div>

          {/* RIGHT SIDE: THE ACTION CARD */}
          <div className="relative">
            <div className="bg-white dark:bg-zinc-900  shadow-2xl p-8 md:p-12 border border-zinc-100 dark:border-white/5">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="space-y-8"
                  >
                    {/* 1. AMOUNT SECTION */}
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#cc0000]">Choose Amount (ETB)</label>
                      <div className="flex items-center gap-4 bg-zinc-50 dark:bg-black/20 p-6  border-2 border-transparent focus-within:border-[#cc0000] transition-all">
                        <span className="text-3xl font-black text-zinc-400">ETB</span>
                        <input 
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Any Amount"
                          className="bg-transparent text-4xl font-black w-full outline-none"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[200, 500, 1000, 5000].map(v => (
                          <button key={v} onClick={() => setAmount(v)} className="px-4 py-2  bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black hover:bg-[#cc0000] hover:text-white transition-all uppercase tracking-widest">
                            {v} ETB
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2. PAYMENT METHOD SECTION */}
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#cc0000]">Transfer Channel</label>
                      <div className="grid grid-cols-1 gap-3">
                        {paymentMethods.map(m => (
                          <div 
                            key={m.id}
                            onClick={() => setSelectedMethod(m)}
                            className={`p-5 dark:bg-zinc-900 bg-zinc-50  border-2 cursor-pointer transition-all flex items-center justify-between ${selectedMethod?.id === m.id ? 'border-[#cc0000] bg-[#cc0000]/5' : 'border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-zinc-800/30 hover:border-zinc-300'}`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10  ${m.color} flex items-center justify-center text-white`}>
                                <HiOutlineBanknotes size={20} />
                              </div>
                              <div>
                                <h4 className="font-black text-xs uppercase tracking-tighter">{m.name}</h4>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{selectedMethod?.id === m.id ? 'Selected' : 'Click to select'}</p>
                              </div>
                            </div>
                            {selectedMethod?.id === m.id && <HiOutlineCheckBadge className="text-[#cc0000]" size={20}/>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. DYNAMIC DETAILS (If method selected) */}
                    <AnimatePresence>
                      {selectedMethod && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          className="bg-zinc-900 text-white p-6 space-y-4 shadow-xl"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-[9px] uppercase font-bold text-zinc-500">Account Number</p>
                              <p className="text-2xl font-black tracking-tighter">{selectedMethod.account}</p>
                            </div>
                            <button onClick={() => copyToClipboard(selectedMethod.account)} className="p-3 bg-white/10  hover:bg-[#cc0000] transition-colors">
                              {copied ? <HiOutlineCheckBadge size={20}/> : <HiOutlineClipboardDocument size={20}/>}
                            </button>
                          </div>
                          <div className="pt-4 border-t border-white/10">
                            <p className="text-[9px] uppercase font-bold text-zinc-500">Account Holder</p>
                            <p className="text-xs font-black uppercase tracking-widest text-[#cc0000]">{selectedMethod.holder}</p>
                          </div>
                          <p className="text-[10px] italic text-zinc-400 leading-relaxed">"{selectedMethod.instructions}"</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 4. VERIFICATION INPUT */}
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#cc0000]">Confirm Transaction</label>
                      <input 
                        type="text"
                        value={tin}
                        onChange={(e) => setTin(e.target.value)}
                        placeholder="Transaction ID (TIN / Ref)"
                        className="w-full p-5  border-2 border-transparent focus:border-zinc-300 dark:focus:border-white/20 outline-none text-sm font-bold placeholder:uppercase placeholder:tracking-widest placeholder:text-zinc-500"
                      />
                    </div>

                    <button 
                      onClick={handleSubmit}
                      disabled={!amount || !selectedMethod || !tin}
                      className="w-full py-6 bg-[#cc0000] text-white  font-black uppercase tracking-[0.3em] text-xs hover:bg-black transition-all shadow-xl shadow-[#cc0000]/20 disabled:opacity-20 disabled:grayscale"
                    >
                      Complete Donation
                    </button>

                    <div className="flex items-center justify-center gap-2 opacity-30">
                      {/* <HiOutlineShieldCheck size={16}/> */}
                      <span className="text-[9px] font-black uppercase tracking-widest">End-to-End Secure Processing <br /> Please make sure you are registered</span>
                    </div>

                  </motion.div>
                ) : (
                  /* SUCCESS STATE */
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20 space-y-6"
                  >
                    <div className="w-24 h-24 bg-green-500/10 text-green-500  flex items-center justify-center mx-auto">
                      <HiOutlineCheckBadge size={48} />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">Thank You!</h2>
                    <p className="text-sm text-zinc-500 max-w-[250px] mx-auto font-medium">
                      Your transaction <span className="text-zinc-900 dark:text-white font-black">{tin}</span> is being processed by our finance team.
                    </p>
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800  border border-zinc-100 dark:border-white/5 text-[14px] font-bold uppercase tracking-widest">
                       Integration Note: The full Automatic System will launch in soon. Manual verification is active.
                    </div>
                    <button 
                      onClick={() => { setIsSubmitted(false); setAmount(""); setTin(""); }}
                      className="text-[#cc0000] font-black uppercase tracking-widest text-xs hover:underline"
                    >
                      Make another donation
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </main>

        {/* FOOTER TICKER */}
        <footer className="mt-12 py-8 text-white/10 overflow-hidden select-none">
          <div className="flex whitespace-nowrap gap-12 text-black dark:text-white uppercase tracking-[1em] text-[10px] animate-marquee">
             <span>Support Media Independence</span>
             <span>•</span>
             <span>New Dawuro Media</span>
             <span>•</span>
             <span>Your Voice Your Identity</span>
             <span>•</span>
             <span>Protect Our Heritage</span>
             <span>•</span>
             <span>Support Media Independence</span>
          </div>
        </footer>

      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DonationPage;