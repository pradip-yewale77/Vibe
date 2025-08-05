'use client'

import React from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'

import { Footer } from './components/Footer'
import { FloatingDockDemo } from './components/FloatingDockDemo'
import Pricing from './components/Pricing'

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      
      <Nav />

      {/* Hero Section */}
      <main className="flex-grow">
        <Hero />

        {/* Technologies Section */}
        <section className="w-full py-16 bg-zinc-950">
          <div className="container mx-auto px-6 md:px-12">
            <div className="">
              <h2 className="text-2xl text-center md:text-3xl font-bold text-white">
                Technologies Supported
              </h2>
              <div className="w-full md:w-auto">
                <FloatingDockDemo />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}

        <Pricing/>
       
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default HomePage
