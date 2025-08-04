"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Contact Info */}
          <div className="flex flex-col gap-4 h-full">
            <div className="flex-1 bg-zinc-900 p-4 rounded-lg shadow flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-gray-300 text-sm">8830231066</p>
              </div>
            </div>

            <div className="flex-1 bg-zinc-900 p-4 rounded-lg shadow flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-blue-400 underline text-sm">contact@codeseed.in</p>
              </div>
            </div>

            <div className="flex-1 bg-zinc-900 p-4 rounded-lg shadow flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-gray-300 text-sm">
                  Viman Nagar, Pune, Maharashtra - 413304
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-zinc-900 p-6 rounded-lg shadow h-full flex flex-col justify-between">
            <form className="space-y-4 h-full flex flex-col justify-between">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                rows={4}
                placeholder="Type your message here..."
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full py-2 text-sm bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
