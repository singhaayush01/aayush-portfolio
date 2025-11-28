"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import type { JSX } from 'react';

// --- ICON DEFINITIONS (Lucide SVGs) ---
const Icons = {
  Code: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  Cpu: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6v6H9z" /><path d="M15 9V4" /><path d="M9 9V4" /><path d="M9 15v5" /><path d="M15 15v5" /><path d="M4 9H9" /><path d="M4 15H9" /><path d="M15 9h5" /><path d="M15 15h5" /></svg>,
  Globe: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
  Rocket: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-2c-1.333 0-2-1.333-2-2V6c0-1.333.667-2 2-2h2"/><path d="M12 18V6"/><path d="m14 12-2 2-2-2"/></svg>,
  Database: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>,
  Network: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="16" y="2" width="6" height="6" rx="1"/><rect x="2" y="2" width="6" height="6" rx="1"/><rect x="9" y="16" width="6" height="6" rx="1"/><path d="M22 6c0 10-18 10-18 0"/><path d="m12 16v-6"/></svg>,
  Menu: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Linkedin: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
  Github: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.52-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5a7.35 7.35 0 0 0-4 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5-1 1-1.4 2.25-1 3.5 0 3.5 3 5.5 6 5.5-1.15.8-2 2.1-2 3.5v4"/><path d="M9 18c-3.1.2-4.1-1.3-4-2"/></svg>,
  Send: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Download: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
};

// --- DATA DEFINITIONS ---

const navItems = [
  { id: 'home', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'skills', name: 'Skills' },
  { id: 'projects', name: 'Projects' },
];

const coreSkills = [
  { icon: <Icons.Cpu />, category: 'AI & Machine Learning', skills: ['PyTorch', 'Reinforcement Learning', 'Transformers', 'LangChain', 'NLP', 'Computer Vision'] },
  { icon: <Icons.Network />, category: 'Full-Stack Development', skills: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'TypeScript', 'Responsive Design'] },
  { icon: <Icons.Code />, category: 'Core Engineering', skills: ['Java (DSA)', 'Python', 'C++', 'System Design', 'Git/GitHub', 'REST APIs'] },
  { icon: <Icons.Database />, category: 'Data & Cloud', skills: ['MongoDB', 'PostgreSQL', 'Drupal CMS', 'Vercel', 'Data Modeling (SQL)', 'Deployment Automation'] },
];

const projectCategories = [
  {
    title: "Machine Learning & AI",
    description: "Systems that learn, adapt, and reason.",
    projects: [
      {
        title: 'Super Mario Reinforcement Learning Agent',
        icon: <Icons.Rocket />,
        bulletPoints: [
          "I used Double Deep Q-Networks (DDQN), not just standard DQN, to eliminate overestimation bias, leading to a far more stable and efficient learning process for mastering Super Mario Bros.",
          "I engineered a comprehensive vision pipeline using Computer Vision (CV) preprocessing, translating raw pixel input into a focused state representation, which enabled the agent to 'see' and react in real-time.",
          "This project successfully demonstrated an agent capable of zero-shot generalization within the training environment, navigating complex platforming challenges and securing wins entirely autonomously.",
        ],
        tech: ['Python', 'PyTorch', 'Gymnasium', 'DDQN', 'CV'],
        github: 'https://github.com/singhaayush01/mario-rl',
        live: null,
        image: '/mario.png', 
      },
      {
        title: 'Cliffe College Assistant (RAG System)',
        icon: <Icons.Code />,
        bulletPoints: [
          "I architected the Retrieval-Augmented Generation (RAG) pipeline from the ground up using LangChain, effectively bridging the gap between large, unstructured PDFs and a functional AI interface.",
          "The system solved the core problem of document accessibility by converting static, siloed college handbooks into an interactive, natural language Q&A resource for students.",
          "I built a responsive, modern frontend using Next.js to deliver an intuitive chat-style interface, providing students with accurate, conversationally-generated answers in real-time.",
        ],
        tech: ['Next.js', 'LangChain', 'Python', 'Vector DB', 'React'],
        github: 'https://github.com/singhaayush01/cliffe-college-assistant',
        live: null,
        image: '/cliffe-rag.png', 
      },
      {
        title: 'TinyTextGPT',
        icon: <Icons.Cpu />,
        bulletPoints: [
          "I implemented the foundational Transformer architecture (Attention is All You Need) from scratch in PyTorch, ensuring a deep, fundamental understanding of how modern LLMs are constructed, including self-attention and masked heads.",
          "I handled the entire data preparation pipeline, including implementing custom Byte-Pair Encoding (BPE) tokenization to efficiently process large datasets of classic literature from Project Gutenberg.",
          "This was a pure learning exercise in demystifying Large Language Models, proving my ability to master and implement complex, state-of-the-art AI models without relying on high-level libraries.",
        ],
        tech: ['PyTorch', 'Transformers', 'NLP', 'Tokenization', 'Python'],
        github: 'https://github.com/singhaayush01/TinyTextGPT-Gutenberg-Text-Transformer',
        live: null,
        image: '/tinytextGpt.png', 
      },
    ]
  },
  {
    title: "Full-Stack & Systems Engineering",
    description: "Robust applications built for performance and security.",
    projects: [
      {
        title: 'RSA Cryptography Implementation',
        icon: <Icons.Code />,
        bulletPoints: [
          "I implemented the RSA public-key cryptosystem entirely in C++, forcing a rigorous focus on performance and low-level resource management not possible with higher-level languages.",
          "I solved challenging number theory and computational problems firsthand, specifically handling large integer arithmetic and efficient modular exponentiation (the backbone of modern security).",
          "This project demonstrated a foundational understanding of data security principles, successfully building a reliable system for secure, end-to-end encryption and decryption.",
        ],
        tech: ['C++', 'Cryptography', 'Number Theory', 'Systems Programming'],
        github: 'https://github.com/singhaayush01/RSA_E_D_Project',
        live: null,
        image: '/tinytextGpt.png', 
      },
      {
        title: 'Personal Portfolio Website',
        icon: <Icons.Globe />,
        bulletPoints: [
          "Engineered a high-performance Next.js application, prioritizing fast load times, code splitting, and optimal static asset delivery (via Vercel deployment) for a flawless user experience.",
          "Implemented a clean, modern, and fully responsive UI using Tailwind CSS, complete with seamless dark-mode switching and accessibility considerations.",
          "The project serves as a live, evolving documentation hub, demonstrating mastery of the modern JavaScript ecosystem (React, Next.js, and Continuous Deployment with GitHub).",
        ],
        tech: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
        github: 'https://github.com/singhaayush01/aayush-portfolio', 
        live: null,
        image: '/portfolio-website.png', 
      },
    ]
  }
];

// --- CONTACT MODAL COMPONENT ---

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  // NOTE: I've kept the Formspree endpoint you provided in the previous turn.
  const endpoint = "https://formspree.io/f/xdkrwkdv"; 

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ 
          name: formData.name,
          message: formData.message,
          // CRITICAL FIX: Send email as _replyto field.
          // This ensures the message body only reports 'Name' and 'Message', 
          // while still allowing you to reply directly to the sender.
          _replyto: formData.email, 
          _subject: `Portfolio Contact from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(onClose, 3000); 
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStatus('idle'), 500); 
  };

  const isSending = status === 'sending';

  const renderContent = () => {
    if (status === 'success') {
      return (
        <div className="text-center py-10">
          <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 text-white">
            <Icons.Check />
          </div>
          <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
          <p className="text-zinc-500 dark:text-zinc-400">Thank you for reaching out. I'll be in touch soon.</p>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" // Ensure name attribute is present
            required
            className="w-full px-4 py-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            disabled={isSending}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" // Ensure name attribute is present
            required
            className="w-full px-4 py-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            disabled={isSending}
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Message</label>
          <textarea 
            id="message" 
            name="message" // Ensure name attribute is present
            required
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white resize-none"
            placeholder="Let's build something..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            disabled={isSending}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSending || status === 'error'}
          className={`w-full py-3 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-lg shadow-indigo-500/20 
            ${isSending ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} 
            ${status === 'error' ? 'bg-red-600' : ''}`}
        >
          {isSending ? (
            <>Sending...</>
          ) : status === 'error' ? (
            <>Error! Try again.</>
          ) : (
            <>Send Message <Icons.Send /></>
          )}
        </button>
        {status === 'error' && (
          <p className="text-red-500 text-sm text-center">There was an issue sending your message. Please check your Formspree setup.</p>
        )}
      </form>
    );
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      />
      <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300 border border-zinc-200 dark:border-zinc-800">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Get in Touch</h3>
            <button onClick={handleClose} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500">
              <Icons.X />
            </button>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};


// --- MAIN APP COMPONENT ---

const App = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode === 'true' || (!savedMode && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode, mounted]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollY = window.pageYOffset + 150; 
      sections.forEach(current => {
        if (current) {
          if (scrollY > current.offsetTop && scrollY <= current.offsetTop + current.offsetHeight) {
            setActiveSection(current.getAttribute('id') as string);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  if (!mounted) return null; 

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      {/* NAVBAR */}
      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-background/80 backdrop-blur-md border-border' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 h-16 flex justify-between items-center">
          <button onClick={() => scrollToSection('home')} className="text-xl font-bold tracking-tight flex items-center gap-1 group">
            <span className="group-hover:text-accent transition-colors">Aayush</span>
          </button>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    activeSection === item.id
                      ? 'text-foreground bg-muted'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="w-px h-6 bg-border mx-2"></div>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => setIsDarkMode(prev => !prev)}
              className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-muted-foreground hover:text-foreground"
            >
              {isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border shadow-lg p-4 flex flex-col gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left py-3 px-4 rounded-lg font-medium hover:bg-muted transition-colors"
              >
                {item.name}
              </button>
            ))}
            <div className="h-px bg-border my-2"></div>
            <button onClick={() => { setIsContactModalOpen(true); setIsMobileMenuOpen(false); }} className="text-left py-3 px-4 font-medium text-accent">
                Send Message
            </button>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-left py-3 px-4 font-medium text-muted-foreground">
                {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* HERO SECTION */}
        <section id="home" className="min-h-[90vh] flex items-center px-6 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-indigo-500/10 via-background to-background dark:from-indigo-500/5"></div>
          
          <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                Software Engineer
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Crafting robust <br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-purple-600 dark:to-purple-400">intelligent</span> systems.
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm <strong>Aayush</strong>, a CS senior building at the intersection of full-stack engineering and AI. 
                I create scalable applications that solve real problems.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  View Projects
                </button>
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-6 py-3 border border-border bg-background hover:bg-muted text-foreground font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  Contact Me
                </button>
                <a 
                  href="https://github.com/singhaayush01"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 border border-border rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="GitHub"
                >
                  <Icons.Github />
                </a>
                <a 
                  href="https://www.linkedin.com/in/aayush-kumar-singh-dev/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 border border-border rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="LinkedIn"
                >
                  <Icons.Linkedin />
                </a>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end relative">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl transform rotate-12"></div>
                <img 
                  src="/aayush.png" 
                  alt="Aayush K. Singh" 
                  className={`relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl border border-border bg-muted/50 ${isDarkMode ? 'brightness-90 grayscale-10' : ''}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 px-6 border-t border-border/50">
          <div className="container mx-auto">
            <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-12">Tech Stack</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreSkills.map((cat, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center gap-3 text-foreground font-semibold">
                    <span className="p-2 rounded-lg bg-muted text-accent">{cat.icon}</span>
                    {cat.category}
                  </div>
                  <ul className="space-y-2">
                    {cat.skills.map((s, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-border"></span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 px-6 bg-muted/30 border-t border-border">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-2">Portfolio</h2>
                <h3 className="text-3xl font-bold">Selected Works</h3>
              </div>
              <a 
                href="https://github.com/singhaayush01" 
                target="_blank" 
                rel="noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
              >
                View all on GitHub <Icons.Github />
              </a>
            </div>

            <div className="grid gap-16">
              {projectCategories.map((category, i) => (
                <div key={i} className="space-y-8">
                  {category.projects.map((project, j) => (
                    <div key={j} className="group grid lg:grid-cols-12 gap-8 items-start p-6 rounded-2xl border border-border/50 bg-background hover:border-accent/30 transition-all shadow-sm hover:shadow-md">
                      {/* Image */}
                      <div className="lg:col-span-4 order-1 lg:order-0 overflow-hidden rounded-xl bg-muted border border-border">
                        {project.image ? (
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className={`w-full h-48 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isDarkMode ? 'brightness-75 hover:brightness-100' : ''}`}
                          />
                        ) : (
                          <div className="w-full h-48 lg:h-full flex items-center justify-center text-muted-foreground">
                            {React.cloneElement(project.icon, { width: 48, height: 48 })}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="lg:col-span-8 flex flex-col justify-between h-full order-2 lg:order-0">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xl font-bold group-hover:text-accent transition-colors">{project.title}</h4>
                            <div className="flex gap-2">
                              {project.github && <a href={project.github} target="_blank" className="text-muted-foreground hover:text-foreground"><Icons.Github /></a>}
                              {project.live && <a href={project.live} target="_blank" className="text-muted-foreground hover:text-foreground"><Icons.Globe /></a>}
                            </div>
                          </div>
                          
                          {/* UPDATED: Rendering bullet points */}
                          <ul className="text-muted-foreground mb-6 leading-relaxed text-sm space-y-3">
                            {project.bulletPoints.map((point, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-accent mr-2 mt-0.5">&#x2022;</span>
                                <span dangerouslySetInnerHTML={{ __html: point }} />
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.tech.map((t, k) => (
                            <span key={k} className="px-2.5 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground border border-border/50">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT / FOOTER */}
        <section id="about" className="py-24 px-6 border-t border-border">
          <div className="container mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">About Me</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I don't just write code; I build intelligent systems. I thrive at the fascinating intersection of robust Full-Stack Engineering and adaptive AI/Machine Learning. On one side, I've spent three years as a Web Developer for Youngstown State University, where I gained a deep professional commitment to system stability, digital accessibility, and ensuring flawless performance for thousands of users daily.
              </p>
              <p>
                  On the other side, my academic and personal drive is dedicated to complexity and innovation. Whether I'm wrestling with Double DQN to teach Mario new tricks or architecting serverless RAG pipelines to make documents conversational, I constantly push what code can learn. My goal is to join a forward-thinking engineering team where I can combine my front-to-back development expertise with my AI specialization to build truly impactful products. I'm eligible for exciting roles starting May 2026.
              </p>
              </div>
              <div className="mt-8">
                <a 
                  href="assets/pdf/resume_2025_nov.pdf" 
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Icons.Download /> Resume
                </a>
              </div>
            </div>
            
            <div className="bg-muted/30 p-8 rounded-2xl border border-border flex flex-col justify-center">
              <h3 className="font-semibold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8 text-sm">
                Open to opportunities. Feel free to reach out for a chat about code, AI, or cricket.
              </p>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="w-full py-3 border border-border bg-background hover:bg-muted font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Icons.Mail /> Send an Email
              </button>
            </div>
          </div>
          
          <div className="mt-24 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Aayush K. Singh.
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;