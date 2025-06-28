import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-color)] max-w-7xl mx-auto relative overflow-hidden">
      {/* Animated background accent */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[var(--brand-sky)] to-transparent animate-float-smooth"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[var(--brand-fuchsia)] to-transparent animate-float-smooth" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="w-full text-center relative">
        {/* Personal Monogram */}
        <div className="mb-6 animate-fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[hsl(var(--black-700)/0.6)] rounded-full border border-[var(--border-color)] shadow-inner hover-lift group cursor-pointer relative overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--brand-sky)/0.1)] to-[hsl(var(--brand-fuchsia)/0.1)] scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></span>
            <span className="font-serif font-bold text-xl text-white relative group-hover:text-[var(--brand-sky)] transition-all duration-500 group-hover:scale-110">PN</span>
          </div>
        </div>
        
        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-6 animate-fade-up delay-150">
          <a href="https://github.com/petar-nikolic125/" className="social-link group relative hover-lift" aria-label="GitHub">
            <span className="absolute inset-0 bg-[hsl(var(--brand-sky)/0.15)] scale-0 group-hover:scale-100 rounded-full transition-transform duration-500"></span>
            <Github className="w-5 h-5 relative group-hover:rotate-[360deg] transition-transform duration-700" />
          </a>
          <a href="https://www.linkedin.com/in/petar-nikolic-957875345/" className="social-link group relative hover-lift" aria-label="LinkedIn">
            <span className="absolute inset-0 bg-[hsl(var(--brand-sky)/0.15)] scale-0 group-hover:scale-100 rounded-full transition-transform duration-500"></span>
            <Linkedin className="w-5 h-5 relative group-hover:scale-110 transition-transform duration-300" />
          </a>
          <a href="https://instagram.com/nfs.u.2" className="social-link group relative hover-lift" aria-label="Instagram">
            <span className="absolute inset-0 bg-[hsl(var(--brand-sky)/0.15)] scale-0 group-hover:scale-100 rounded-full transition-transform duration-500"></span>
            <Instagram className="w-5 h-5 relative group-hover:rotate-[10deg] transition-transform duration-300" />
          </a>
          <a href="mailto:petar.nikolic.04.7@gmail.com" className="social-link group relative hover-lift" aria-label="Email">
            <span className="absolute inset-0 bg-[hsl(var(--brand-sky)/0.15)] scale-0 group-hover:scale-100 rounded-full transition-transform duration-500"></span>
            <Mail className="w-5 h-5 relative group-hover:scale-110 transition-transform duration-300" />
          </a>
        </div>
        
        {/* Copyright */}
        <p className="text-xs text-[var(--fg-faint)] uppercase tracking-widest font-medium">
          © 2024 Petar Nikolić. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
