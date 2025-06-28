// src/components/StickyNav.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import {
  Home as HomeIcon,
  Briefcase,
  Code as CodeIcon,
  FolderOpen,
  Mail,
  type LucideProps,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  isHash: boolean;
}

const navItems: NavItem[] = [
  { id: 'hero',           label: 'Home',            href: '#hero',            isHash: true  },
  { id: 'experience',     label: 'Experience',      href: '#experience',      isHash: true  },
  { id: 'skills',         label: 'Skills',          href: '#skills',          isHash: true  },
  { id: 'projects-grid',  label: 'Projects (Grid)', href: '/projects/grid',   isHash: false },
  { id: 'projects-table', label: 'Projects (Table)',href: '/projects/table',  isHash: false },
  { id: 'contact',        label: 'Contact',         href: '#contact',         isHash: true  },
];

// now typed to the LucideProps that each icon actually accepts
const navIcons: Record<string, React.ComponentType<LucideProps>> = {
  hero:            HomeIcon,
  experience:      Briefcase,
  skills:          CodeIcon,
  'projects-grid':  FolderOpen,
  'projects-table': CodeIcon,
  contact:         Mail,
};

export default function StickyNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling past hero (80vh)
      const heroThreshold = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > heroThreshold);

      // highlight the last hash-section we’ve scrolled past
      const scrollPos = window.scrollY + window.innerHeight * 0.3;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const { id, isHash } = navItems[i];
        if (!isHash) continue;
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string,
      isHash: boolean
  ) => {
    if (!isHash) {
      // let Wouter handle it
      return;
    }
    e.preventDefault();
    const target = href.slice(1);
    const el = document.getElementById(target);
    if (!el) return;
    const headerOffset = 80;
    const top = el.offsetTop - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
      <nav
          className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
      >
        <div className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-16 space-x-2">
              {navItems.map(({ id, label, href, isHash }) => {
                const Icon = navIcons[id];
                const isActive = isHash
                    ? activeSection === id
                    : window.location.pathname === href;

                // for hash links use <a>, for routes use Wouter’s <Link>
                const Component = isHash ? 'a' : Link;

                return (
                    <Component
                        key={id}
                        href={href}
                        onClick={(e: any) => handleClick(e, href, isHash)}
                        className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    flex items-center gap-1
                    ${isActive
                            ? 'text-blue-400 bg-blue-500/10 shadow-sm'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'}
                  `}
                    >
                      <Icon size={16} />
                      <span className="hidden sm:inline">{label}</span>
                    </Component>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
  );
}
