import { cn } from "@/lib/utils";
import { Facebook, Twitter, Github, Linkedin, Instagram } from "lucide-react";

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "bg-neutral-900 text-neutral-300 py-12 px-4 w-full border-t border-neutral-800",
        className
      )}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-lg w-10 h-10 flex items-center justify-center">
                <span className="font-bold text-neutral-900">B</span>
              </div>
              <span className="font-bold text-xl">VIBE</span>
            </div>
            <p className="text-neutral-400 max-w-xs">
              Simplify your workflow and boost productivity with our intuitive solutions.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="hover:text-white transition p-2 rounded-full bg-neutral-800 hover:bg-neutral-700"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <FooterColumn 
            title="Product" 
            links={[
              { label: "Features", href: "#" },
              { label: "Pricing", href: "#" },
              { label: "Changelog", href: "#" },
              { label: "Roadmap", href: "#" },
            ]}
          />
          
          <FooterColumn 
            title="Resources" 
            links={[
              { label: "Documentation", href: "#" },
              { label: "Tutorials", href: "#" },
              { label: "Blog", href: "#" },
              { label: "Community", href: "#" },
            ]}
          />
          
          <FooterColumn 
            title="Company" 
            links={[
              { label: "About", href: "#" },
              { label: "Careers", href: "#" },
              { label: "Contact", href: "#" },
              { label: "Partners", href: "#" },
            ]}
          />
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-neutral-400">
            © {new Date().getFullYear()} VIBE. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Cookies
            </a>
            <a href="#" className="hover:text-white transition">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Footer column component
const FooterColumn = ({ title, links }: { title: string; links: { label: string; href: string }[] }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-white text-lg">{title}</h3>
    <ul className="space-y-3">
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.href} className="hover:text-white transition">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// Social links data
const socialLinks = [
  { icon: Github, href: "https://github.com/", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com/", label: "Facebook" },
  { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/", label: "Instagram" },
];
