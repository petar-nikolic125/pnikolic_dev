import { useState } from 'react';
import { Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { personalInfo } from '@/data/portfolio';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = personalInfo.social.email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to build something amazing together? I'm always open to discussing new opportunities and interesting projects.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Email Card */}
          <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
            <div className="text-blue-400 mb-4">
              <Mail size={32} className="mx-auto group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
            <p className="text-gray-300 mb-4">Drop me a line anytime</p>
            <div className="space-y-3">
              <button
                onClick={handleEmailCopy}
                className="text-blue-300 hover:text-blue-200 transition-colors font-mono text-sm"
              >
                {personalInfo.social.email}
              </button>
              <div className="flex gap-2">
                <Button
                  onClick={handleEmailCopy}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-gray-300 border-gray-600 hover:bg-gray-700"
                >
                  {copied ? "Copied!" : "Copy Email"}
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <a href={`mailto:${personalInfo.social.email}`}>
                    <Send size={16} className="mr-2" />
                    Send Mail
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
            <div className="text-green-400 mb-4">
              <MapPin size={32} className="mx-auto group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Location</h3>
            <p className="text-gray-300 mb-4">Based in Belgrade, Serbia</p>
            <p className="text-sm text-gray-400">
              Open to remote work across EU & US time zones
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-white mb-8">Find me online</h3>
          <div className="flex justify-center gap-6">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gray-800/50 rounded-lg px-6 py-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
            >
              <SiGithub className="text-2xl text-gray-300 group-hover:text-white transition-colors" />
              <span className="text-gray-300 group-hover:text-white transition-colors">GitHub</span>
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gray-800/50 rounded-lg px-6 py-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
            >
              <SiLinkedin className="text-2xl text-blue-400 group-hover:text-blue-300 transition-colors" />
              <span className="text-gray-300 group-hover:text-white transition-colors">LinkedIn</span>
            </a>
            <a
              href={personalInfo.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gray-800/50 rounded-lg px-6 py-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
            >
              <SiInstagram className="text-2xl text-pink-400 group-hover:text-pink-300 transition-colors" />
              <span className="text-gray-300 group-hover:text-white transition-colors">Instagram</span>
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to start a project?</h3>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Whether you have a clear vision or just an idea, I'd love to help bring it to life. Let's discuss how we can work together.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8"
          >
            <a href={`mailto:${personalInfo.social.email}?subject=Let's work together`}>
              <MessageCircle size={20} className="mr-2" />
              Start a Conversation
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}