// src/components/HeroEnhanced.tsx  — sword-shine + footer‐style accents
import { useEffect } from "react";
import {
  FileText,
  MessageCircle,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Mail,
} from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

/* hard-coded so these always resolve */
const links = {
  resume:   "/resume.pdf",
  github:   personalInfo.social.github,
  linkedin: personalInfo.social.linkedin,
  instagram:personalInfo.social.instagram,
  mail:     `mailto:${personalInfo.social.email}`,
};

export default function HeroEnhanced() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) return;
      const k = e.key.toLowerCase();
      if (k === "r") window.open(links.resume, "_blank");
      if (k === "g") window.open(links.github, "_blank");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
      <section
          id="hero"
          className="relative overflow-hidden bg-background"
          style={{ height: "calc(100vh - 60px)" }}
      >
        {/**—footer-style background accents */}
        <div className="absolute inset-0 opacity-5">
          <div
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[var(--brand-sky)] to-transparent animate-float-smooth"
          />
          <div
              className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[var(--brand-fuchsia)] to-transparent animate-float-smooth"
              style={{ animationDelay: "3s" }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 lg:px-12">
          {/**—name + sword-shine */}
          <h1 className="hero-name relative inline-block select-none font-serif text-[clamp(3.5rem,9vw,6rem)] leading-none tracking-tight fg-base">
            {personalInfo.name}
            <span className="shine" />
          </h1>

          {/**—title & subtitle */}
          <h2 className="mt-4 font-serif italic fg-subtle text-[clamp(2rem,4vw,2.75rem)] tracking-wider">
            {personalInfo.title}
          </h2>
          <p className="mt-6 mx-auto max-w-xl fg-faint text-lg font-light">
            {personalInfo.subtitle}
          </p>

          {/**—location */}
          <p className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest fg-faint">
            <MapPin className="h-3.5 w-3.5" />
            {personalInfo.location}
          </p>

          {/**—résumé + talk CTAs */}
          <div className="mt-12 flex flex-wrap justify-center gap-4 animate-fade-up">
            <Button
                variant="outline"
                className="gap-2 px-6 border fg-base hover:bg-card"
                asChild
            >
              <a href={links.resume} target="_blank" rel="noopener">
                <FileText className="h-4 w-4" /> Résumé
              </a>
            </Button>

            <Button
                className="gap-2 px-6 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90"
                asChild
            >
              <a href={links.mail}>
                <MessageCircle className="h-4 w-4" />
                Let&apos;s Talk
              </a>
            </Button>
          </div>

          {/**—social icons, same as footer */}
          <div className="mt-12 flex justify-center gap-8 text-2xl fg-subtle animate-fade-up delay-150">
            <SocialIcon href={links.github} Icon={Github}   label="GitHub" />
            <SocialIcon href={links.linkedin} Icon={Linkedin} label="LinkedIn" />
            <SocialIcon href={links.instagram} Icon={Instagram} label="Instagram" />
            <SocialIcon href={links.mail} Icon={Mail}      label="Email" />
          </div>

          {/**—shortcut hint */}
          <p className="mt-14 text-xs fg-faint animate-fade-up delay-300">
            Press <kbd className="kbd">R</kbd> for résumé · <kbd className="kbd">G</kbd> for GitHub
          </p>
        </div>
      </section>
  );
}

function SocialIcon({
                      href,
                      Icon,
                      label,
                    }: {
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
      <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group relative hover-lift"
      >
        <span className="absolute inset-0 bg-[hsl(var(--brand-sky)/0.15)] scale-0 group-hover:scale-100 rounded-full transition-transform duration-500" />
        <Icon className="relative w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
      </a>
  );
}
