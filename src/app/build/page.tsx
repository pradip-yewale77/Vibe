"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowUp, FaMagic, FaCoffee } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "../components/Nav";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const suggestions = [
  "Create a landing page for a fitness app",
  "Design a modern dashboard UI for an admin panel",
  "Build a personal portfolio website",
  "Generate a blog layout with dark mode",
  "Create a pricing section with 3 tiers",
  "Build a login page with animations",
  "Design a mobile app homepage with tabs",
  "Generate a contact form with validation",
  "Make a hero section with call to action",
  "Create a startup website with testimonials"
];

const Page: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [prompt]);

  useEffect(() => {
    setShowSuggestions(!prompt.trim() && !focused);
  }, [prompt, focused]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = prompt.trim();
    if (!trimmed) return;

    try {
      setIsLoading(true); // Start loading
      const response = await axios.post("http://localhost:5000/simple-site", {
        prompt: trimmed,
      });

      if (response.data.status === 1) {
        router.push("/projects");
      }

      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Failed to send request:", error);
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  return (
    <>
      {/* Navbar with higher z-index */}
      <div className="relative z-50">
        <Nav />
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
              className="text-center max-w-md px-6"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="mx-auto mb-8"
              >
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-xl rounded-full opacity-70 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center">
                    <FaCoffee className="text-white text-3xl" />
                  </div>
                </div>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white text-3xl font-bold mb-4"
              >
                Vibe is Vibing...
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-300 text-lg mb-8"
              >
                Grab a cup of coffee, we&apos;re creating your project.<br />
                You&apos;ll get it in a few minutes.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex justify-center"
              >
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 rounded-full bg-blue-500"
                      animate={{
                        y: [0, -15, 0],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={containerRef}
        className="min-h-screen pt-[80px] w-full flex items-center justify-center overflow-hidden relative
          bg-[radial-gradient(ellipse_at_top_left,#18191c_60%,rgba(44,62,80,0.97)_100%),linear-gradient(to_bottom,#18191c_30%,#3a3e5e_60%,#2e026d_80%,#fc8181_95%,#fcbd7c_100%)]"
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden z-0 max-w-full">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-pink-400/20"
              initial={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 5}px`,
                height: `${Math.random() * 20 + 5}px`,
              }}
              animate={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="w-full max-w-2xl flex flex-col items-center px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              className="mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full z-20"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{
                delay: 0.4,
                duration: 1,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            >
              <FaMagic className="text-white text-2xl" />
            </motion.div>

            <motion.h1
              className="text-white text-5xl md:text-6xl font-extrabold mb-3 tracking-tight drop-shadow-[0_2px_24px_rgba(44,62,80,0.10)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Build with <span className="bg-gradient-to-r from-blue-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">Vibe</span>
            </motion.h1>

            <motion.h2
              className="text-gray-300 text-xl font-light text-center mb-8 leading-snug max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Create stunning apps and websites by chatting with AI
            </motion.h2>
          </motion.div>

          <form className="w-full mb-3" onSubmit={handleSend}>
            <div className="relative flex items-center w-full">
              <Textarea
                ref={textareaRef}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Describe what you want to create..."
                className={`flex-1 resize-none bg-[#1e2026]/95 backdrop-blur-lg text-white border-none outline-none text-base py-5 pr-14 pl-5 rounded-2xl shadow-xl placeholder:text-gray-400 transition-all duration-300 ${focused
                  ? "ring-2 ring-pink-400 ring-offset-2 ring-offset-[#1e2026] shadow-[0_0_30px_rgba(236,72,153,0.3)]"
                  : "shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                  }`}
              />
              <motion.button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-500 to-pink-400 shadow-lg rounded-full w-11 h-11 flex items-center justify-center focus:outline-none"
                aria-label="Send"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading} // Disable during loading
              >
                <FaArrowUp className="text-white text-lg" />
              </motion.button>
            </div>
          </form>

          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                className="w-full mt-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="mb-3 text-sm text-gray-400 text-center font-medium tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Try these prompts:
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestions.map((s, i) => (
                    <motion.button
                      key={i}
                      type="button"
                      onClick={() => {
                        setPrompt(s);
                        textareaRef.current?.focus();
                      }}
                      className="bg-zinc-900/80 backdrop-blur-sm text-gray-200 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-pink-400/20 hover:text-white text-[0.95rem] font-medium transition-all shadow-sm border border-zinc-800 hover:border-blue-500/50 text-left"
                      whileHover={{
                        y: -3,
                        boxShadow: "0 5px 15px rgba(59, 130, 246, 0.2)"
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i + 0.3 }}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Page;