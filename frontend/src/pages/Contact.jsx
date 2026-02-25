import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  HiOutlineUser,
  HiOutlineEnvelope as HiOutlineMail,
  HiOutlinePhone, 
  HiOutlineMapPin, 
  HiOutlineGlobeAlt,
  HiOutlineChatBubbleLeftRight 
} from 'react-icons/hi2';

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({ user_name: '', user_email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Replace these strings with your actual EmailJS credentials
    const SERVICE_ID = "service_lja2ayl";
    const TEMPLATE_ID = "template_pds3t0h";
    const PUBLIC_KEY = "kSx08USkdx0tilF12";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then((result) => {
          alert("Message sent successfully to NDM Support! We'll get back to you soon.");
          setFormState({ user_name: '', user_email: '', message: '' });
      }, (error) => {
          alert("Failed to send message: " + error.text);
      })
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#080808] pt-32 pb-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* HEADER */}
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 font-black tracking-[0.4em] uppercase text-[10px]"
          >
            Connect With Us
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black dark:text-white uppercase tracking-tighter mt-4"
          >
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Touch</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT: CONTACT FORM */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest dark:text-gray-400">Full Name</label>
                  <input 
                    required
                    name="user_name"
                    type="text" 
                    value={formState.user_name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-zinc-900 border-none p-4 focus:ring-2 focus:ring-red-600 transition-all dark:text-white outline-none" 
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest dark:text-gray-400">Email Address</label>
                  <input 
                    required
                    name="user_email"
                    type="email" 
                    value={formState.user_email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-zinc-900 border-none p-4 focus:ring-2 focus:ring-red-600 transition-all dark:text-white outline-none" 
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest dark:text-gray-400">Message</label>
                <textarea 
                  required
                  name="message"
                  rows="5" 
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-zinc-900 border-none p-4 focus:ring-2 focus:ring-red-600 transition-all dark:text-white outline-none" 
                  placeholder="How can NDM help you?"
                ></textarea>
              </div>
              <button 
                disabled={loading}
                className="w-full md:w-auto bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-xs px-12 py-5 hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-all shadow-xl active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ContactMethod icon={<HiOutlinePhone/>} label="Call Us" detail="+251 942 541 997" />
              <ContactMethod icon={<HiOutlineMail/>} label="Email" detail="lidtmariamtesfu@gmail.com" />
            </div>
          </motion.div>

          {/* RIGHT: MAP & LOCATION */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* REAL MAP FOR TARCHA, DAWURO */}
            <div className="relative group overflow-hidden bg-zinc-100 dark:bg-zinc-900 aspect-square md:aspect-video lg:aspect-square rounded-2xl">
              <div className="absolute inset-0 hover:grayscale-0 transition-all duration-1000">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15876.543232675988!2d37.1656812!3d7.1354321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17ad99388339d391%3A0x6a0c7c340a6b579!2sTercha!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NDM Location"
                ></iframe>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 bg-white dark:bg-zinc-950 p-6 shadow-2xl border-l-4 border-red-600 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="font-black uppercase text-xs tracking-widest mb-1 dark:text-white flex items-center gap-2">
                  <HiOutlineMapPin className="text-red-600"/> Headquarters
                </h4>
                <p className="text-gray-500 text-[11px] leading-relaxed">
                  Tarcha City, Dawuro Zone, <br />
                  South West Ethiopia Peoples' Region
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

const ContactMethod = ({ icon, label, detail }) => (
  <div className="p-6 bg-gray-50 dark:bg-zinc-900 flex items-center gap-4 group hover:bg-red-600 transition-colors duration-500 rounded-xl">
    <div className="text-red-600 group-hover:text-white transition-colors">{React.cloneElement(icon, { size: 24 })}</div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-red-200">{label}</p>
      <p className="text-sm font-bold dark:text-white group-hover:text-white">{detail}</p>
    </div>
  </div>
);

const SocialLink = ({ icon, name, link }) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="dark:text-white group-hover:text-red-600 transition-colors">{icon}</div>
      <span className="text-xs font-black uppercase tracking-widest dark:text-white">{name}</span>
    </div>
    <span className="text-[10px] text-gray-500 font-bold group-hover:text-red-600 transition-all">{link}</span>
  </div>
);

export default Contact;