"use client";

import React, { useState, useEffect } from 'react';
import type { JSX } from 'react';

// --- TYPE DEFINITIONS ---
type SocialLinkProps = {
  href: string;
  icon: JSX.Element;
  label: string;
};

// --- ICON DEFINITIONS (Lucide SVGs) ---
const Icons = {
  Code: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  Cpu: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6v6H9z" /><path d="M15 9V4" /><path d="M9 9V4" /><path d="M9 15v5" /><path d="M15 15v5" /><path d="M4 9H9" /><path d="M4 15H9" /><path d="M15 9h5" /><path d="M15 15h5" /></svg>,
  FlaskConical: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.966 21.651A2.5 2.5 0 0 1 9 19.5c0-.66.4-1.22 1-1.46"/><path d="M15 19.5a2.5 2.5 0 0 0-1.966-2.151"/><path d="M8.5 21.5c-1.66 0-3-1.34-3-3s1.34-3 3-3"/><path d="M15.5 21.5c1.66 0 3-1.34 3-3s-1.34-3-3-3"/><path d="M12 19.5V3"/><path d="M6 3h12l-.5 4-2 3-2.5 4-1 2-1.5-2-2.5-4-2-3z"/></svg>,
  Globe: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Rocket: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-2c-1.333 0-2-1.333-2-2V6c0-1.333.667-2 2-2h2"/><path d="M12 18V6"/><path d="m14 12-2 2-2-2"/></svg>,
  Database: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>,
  Network: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="16" y="2" width="6" height="6" rx="1"/><rect x="2" y="2" width="6" height="6" rx="1"/><rect x="9" y="16" width="6" height="6" rx="1"/><path d="M22 6c0 10-18 10-18 0"/><path d="m12 16v-6"/></svg>,
  Menu: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Linkedin: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
  Github: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.52-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5a7.35 7.35 0 0 0-4 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5-1 1-1.4 2.25-1 3.5 0 3.5 3 5.5 6 5.5-1.15.8-2 2.1-2 3.5v4"/><path d="M9 18c-3.1.2-4.1-1.3-4-2"/></svg>
};

// --- DATA DEFINITIONS ---

const navItems = [
  { id: 'home', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'skills', name: 'Skills' },
  { id: 'projects', name: 'Projects' },
  { id: 'contact', name: 'Contact' },
];

const coreSkills = [
  { icon: <Icons.Cpu />, category: 'AI & Machine Learning', skills: ['PyTorch', 'Reinforcement Learning', 'Transformers', 'LangChain', 'NLP', 'Computer Vision'] },
  { icon: <Icons.Network />, category: 'Full-Stack Development', skills: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'TypeScript', 'Responsive Design'] },
  { icon: <Icons.Code />, category: 'Core Engineering', skills: ['Java (DSA)', 'Python', 'C++', 'System Design', 'Git/GitHub', 'REST APIs'] },
  { icon: <Icons.Database />, category: 'Data & Cloud', skills: ['MongoDB', 'PostgreSQL', 'Drupal CMS', 'Vercel', 'Data Modeling (SQL)', 'Deployment Automation'] },
];

// RESTRUCTURED PROJECTS DATA - Grouped by Category
const projectCategories = [
  {
    title: "Machine Learning & AI",
    description: "Systems that learn, adapt, and reason.",
    projects: [
      {
        title: 'Super Mario Reinforcement Learning Agent',
        icon: <Icons.Rocket />,
        description: 'An autonomous agent that learns to navigate complex platforming environments. I implemented a Deep Q-Network (DQN) using PyTorch and Gymnasium, focusing on computer vision preprocessing (grayscale, frame resizing) to enable the agent to "see" and react in real-time.',
        tech: ['Python', 'PyTorch', 'Gymnasium', 'DQN', 'CV'],
        github: 'https://github.com/singhaayush01/mario-rl',
        live: null,
        image: '/mario.png', // ADDED: Image path
      },
      {
        title: 'Cliffe College Assistant (RAG System)',
        icon: <Icons.FlaskConical />,
        description: 'Bridging the gap between static documents and interactive AI. This Retrieval-Augmented Generation system allows students to query unstructured college handbooks using natural language. It combines a LangChain backend with a sleek Next.js frontend.',
        tech: ['Next.js', 'LangChain', 'Python', 'Vector DB', 'React'],
        github: 'https://github.com/singhaayush01/cliffe-college-assistant',
        live: null,
        image: '/cliffe-rag.png', // ADDED: Image path
      },
      {
        title: 'TinyTextGPT',
        icon: <Icons.Cpu />,
        description: 'Demystifying Large Language Models by building one from scratch. This project implements the Transformer architecture, including self-attention mechanisms and custom Byte-Pair Encoding (BPE), trained on classic literature to generate coherent text.',
        tech: ['PyTorch', 'Transformers', 'NLP', 'Tokenization', 'Python'],
        github: 'https://github.com/singhaayush01/TinyTextGPT-Gutenberg-Text-Transformer',
        live: null,
        image: '/tinytextGpt.png', // ADDED: Image path
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
        description: 'A deep dive into number theory and security. I implemented the RSA encryption algorithm in C++ from the ground up, handling large integer arithmetic and modular exponentiation to create a functional public-key cryptography system.',
        tech: ['C++', 'Cryptography', 'Number Theory', 'Systems Programming'],
        github: 'https://github.com/singhaayush01/RSA_E_D_Project',
        live: null,
        image: '/tinytextGpt.png', 
      },
      {
        title: 'Personal Portfolio Website',
        icon: <Icons.Globe />,
        description: 'A responsive, modern portfolio built with Next.js and Tailwind CSS. It showcases my projects and skills with a focus on clean design, dark mode support, and accessibility.',
        tech: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
        github: 'https://github.com/singhaayush01/aayush-portfolio', 
        live: null,
        image: '/portfolio-website.png', // ADDED: Image path
      },
    ]
  }
];

// --- UTILITY COMPONENTS ---

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center justify-center p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg hover:bg-violet-50 dark:hover:bg-gray-700 transition-all duration-300 ring-1 ring-gray-200 dark:ring-gray-700"
    aria-label={label}
  >
    <div className="text-gray-600 dark:text-gray-300 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
      {React.cloneElement(icon, { width: 24, height: 24 })}
    </div>
  </a>
);

// --- MAIN APP COMPONENT ---

const App = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  // Changed default to 'false' for Light Mode start
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // --- Effects and Handlers ---

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    document.body.classList.toggle('light', !isDarkMode);
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setIsDarkMode(savedMode === 'true');
    }
  }, []);

  useEffect(() => {
    const handleScrollState = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollY = window.pageYOffset + 150;

      sections.forEach(current => {
        if (current) {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop;
          const sectionId = current.getAttribute('id');

          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            setActiveSection(sectionId as string);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScrollState);
    return () => window.removeEventListener('scroll', handleScrollState);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* NAVBAR */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <button onClick={() => scrollToSection('home')} className="text-2xl font-bold tracking-tight group">
            <span className="text-gray-900 dark:text-white">Aayush</span>
            <span className="text-violet-600 dark:text-violet-400">.dev</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-violet-600 dark:text-violet-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => setIsDarkMode(prev => !prev)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:ring-2 hover:ring-violet-200 dark:hover:ring-violet-900 transition-all"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9h-9V3z" /><path d="M19 20h2" /><path d="M21 17h2" /><path d="M21 14h2" /><path d="M12 21v2" /><path d="M9 20h2" /><path d="M7 17h2" /><path d="M4 14h2" /><path d="M4 17h2" /><path d="M2 14h2" /><path d="M19 14h2" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300"
            >
              {isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-xl py-4 px-6 flex flex-col space-y-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left py-2 font-medium ${
                  activeSection === item.id ? 'text-violet-600 dark:text-violet-400' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <span className="text-sm text-gray-500">Switch Theme</span>
              <button
                onClick={() => setIsDarkMode(prev => !prev)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9h-9V3z" /><path d="M19 20h2" /><path d="M21 17h2" /><path d="M21 14h2" /><path d="M12 21v2" /><path d="M9 20h2" /><path d="M7 17h2" /><path d="M4 14h2" /><path d="M4 17h2" /><path d="M2 14h2" /><path d="M19 14h2" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                )}
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-violet-50/50 to-transparent dark:from-violet-900/10 dark:to-transparent z-0"></div>
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 pointer-events-none"></div>
          
          <div className="container mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center md:text-left order-2 md:order-1">
              <div className="inline-block px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-semibold tracking-wide mb-4">
                Available for Roles Starting May 2026
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                Building <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">Intelligent</span> Systems.
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto md:mx-0">
                I'm <strong>Aayush</strong>, a Computer Science senior bridging the gap between <strong>robust engineering</strong> and <strong>adaptive AI</strong>. I don't just write code; I craft solutions that think.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl"
                >
                  View My Work
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Abstract Visual / Profile Representation */}
            <div className="order-1 md:order-2 flex justify-center relative">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute inset-4 bg-indigo-500/20 rounded-full blur-2xl"></div>
                {/* Updated Image Source to use Local File */}
                <img 
                  src="/aayush.png" 
                  alt="Aayush K. Singh" 
                  className="relative z-10 w-full h-full object-cover rounded-3xl rotate-3 shadow-2xl border-4 border-white dark:border-gray-800"
                />
                
                {/* Floating Tech Badges */}
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 animate-bounce delay-700">
                  <Icons.Cpu />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 animate-bounce delay-1000">
                  <Icons.Code />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 px-6 bg-white dark:bg-gray-900">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-violet-600 dark:text-violet-400 tracking-wider uppercase mb-2">About Me</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">The Engineer & The Professional</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                My journey is defined by a dual focus: <span className="text-gray-900 dark:text-white font-medium">precision</span> and <span className="text-gray-900 dark:text-white font-medium">innovation</span>.
              </p>
              <p>
                Professionally, I’ve spent three years as a <strong>Web Developer for Youngstown State University</strong>. It’s a role that demands reliability. I manage the digital face of the Cliffe College, ensuring accessibility (WCAG), optimizing performance, and maintaining a massive Drupal CMS. I know what it takes to keep production systems running smoothly for thousands of users.
              </p>
              <p>
                But my creative drive is fueled by <strong>AI</strong>. When the early conversations about GPT began, I didn’t just listen—I started building. I taught myself the fundamentals through <strong>tinytextgpt</strong>, which led to a <strong>capstone project</strong> that was a total game-changer for me. That experience bridged the gap between code and cognition.
              </p>
              <p>
                Now, I’m bringing these two worlds together. I’m currently developing a <strong>RAG system specifically for Cliffe College</strong>. While it’s an independent project (not an official university deployment yet), it’s my way of exploring how we can make institutional data conversational, alongside fun experiments like training Reinforcement Learning agents to play Super Mario.
              </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-700">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Stats</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                    <span className="text-gray-600 dark:text-gray-400">Education</span>
                    <span className="font-semibold text-gray-900 dark:text-white">B.S. Comp Sci, YSU</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                    <span className="text-gray-600 dark:text-gray-400">Graduation</span>
                    <span className="font-semibold text-gray-900 dark:text-white">May 2026</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                    <span className="text-gray-600 dark:text-gray-400">Experience</span>
                    <span className="font-semibold text-gray-900 dark:text-white">3 Years (Web Dev)</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                    <span className="text-gray-600 dark:text-gray-400">Status</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">OPT/CPT Eligible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 px-6 bg-gray-50 dark:bg-gray-800/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-violet-600 dark:text-violet-400 tracking-wider uppercase mb-2">Skills</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Technical Arsenal</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreSkills.map((category, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{category.category}</h4>
                  <ul className="space-y-2">
                    {category.skills.map((skill, sIndex) => (
                      <li key={sIndex} className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <span className="w-1.5 h-1.5 bg-violet-400 rounded-full mr-2.5"></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 px-6 bg-white dark:bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-violet-600 dark:text-violet-400 tracking-wider uppercase mb-2">Portfolio</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Featured Projects</h3>
            </div>

            {/* Loop through Categories */}
            {projectCategories.map((category, catIndex) => (
              <div key={catIndex} className="mb-24 last:mb-0">
                <div className="mb-12 border-l-4 border-violet-500 pl-6">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{category.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
                </div>

                <div className="space-y-20">
                  {category.projects.map((project, index) => (
                    <div key={index} className="group relative grid lg:grid-cols-12 gap-8 items-center">
                      {/* Content Side */}
                      <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                        <div className="flex items-center space-x-3 mb-4 text-violet-600 dark:text-violet-400">
                          {project.icon}
                          <span className="text-sm font-bold tracking-wide uppercase">Featured Project</span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                          {project.title}
                        </h3>
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                          {project.description}
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tech.map((t, i) => (
                            <span key={i} className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full">
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          {project.github && (
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noreferrer"
                              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                              <Icons.Github />
                              <span>View Code</span>
                            </a>
                          )}
                          {project.live && (
                            <a 
                              href={project.live} 
                              target="_blank" 
                              rel="noreferrer"
                              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <Icons.Globe />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Decorative/Visual Side */}
                      <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''} relative hidden lg:block`}>
                        {project.image ? (
                          <div className="relative h-64 w-full overflow-hidden rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105" 
                            />
                          </div>
                        ) : (
                          <div className="relative bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 h-80 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-linear-to-tr from-violet-500/20 to-indigo-500/20 rounded-3xl transform rotate-3 transition-transform group-hover:rotate-2"></div>
                            <div className="w-full space-y-3 opacity-50 relative z-10">
                              <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                              <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                              <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                              <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                              <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
                                {React.cloneElement(project.icon, { width: 48, height: 48, className: "text-violet-600 dark:text-violet-400" })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 px-6 bg-gray-50 dark:bg-gray-800/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Ready to collaborate?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
              I am actively seeking full-time Software Engineering roles for <span className="font-semibold text-violet-600 dark:text-violet-400">May 2026</span>. 
              <br className="hidden md:block"/>
              Whether it's discussing AI, React, or complex backend systems, I'd love to chat.
            </p>
            
            <div className="flex justify-center gap-6">
              <SocialLink 
                href="mailto:aayushksinghdev@gmail.com" 
                icon={<Icons.Mail />} 
                label="Email Me"
              />
              <SocialLink 
                href="https://www.linkedin.com/in/aayush-kumar-singh-dev/" 
                icon={<Icons.Linkedin />} 
                label="LinkedIn"
              />
              <SocialLink 
                href="https://github.com/singhaayush01" 
                icon={<Icons.Github />} 
                label="GitHub"
              />
            </div>

            <div className="mt-16 text-sm text-gray-500 dark:text-gray-400">
              <p>&copy; {new Date().getFullYear()} Aayush K. Singh. Built with React, Tailwind, and a passion for clean code.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;