import { cn } from "@/lib/utils";
import { Facebook, Twitter, Github } from "lucide-react";

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "bg-neutral-900 text-neutral-300 py-8 px-4 w-full",
        className
      )}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">YourApp</span>
          <span className="text-xs text-neutral-400 ml-2">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/"
            className="hover:text-white transition"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={20} />
          </a>
          <a
            href="https://twitter.com/"
            className="hover:text-white transition"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://facebook.com/"
            className="hover:text-white transition"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}