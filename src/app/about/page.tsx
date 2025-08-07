"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  RocketIcon,
  LightbulbIcon,
  UsersIcon,
  HandshakeIcon,
  MailIcon,
  CalendarIcon,
  MapPinIcon,
  // LinkedinIcon,
  // FacebookIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { motion } from "framer-motion";

const Page = () => {
  const teamMembers = [
    {
      name: "Mr. Amit Shashikant Kasabe",
      role: "Founder & CEO",
      bio: "A young software engineer with over 6 years of experience in verity of technologies such as MERN, PHP, AI&ML",
      avatar: "/avatars/amit.jpg",
      socials: {
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
        facebook: "https://facebook.com",
      },
    },
    {
      name: "Ms. Sonal Shashikant Kasabe",
      role: "CTO (Chief Technology Office)",
      bio: "A young 23 years old dedicated software engineer who loves to design the technical solition to problmes business faces",
      avatar: "/avatars/sonal.jpg",
      socials: {
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
        facebook: "https://facebook.com",
      },
    },
    {
      name: "Adrija Verma",
      role: "Product Lead",
      bio: "A young 24 years old Software Engineer who loves to design software products",
      avatar: "/avatars/adrija.jpg",
      socials: {
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
        facebook: "https://facebook.com",
      },
    },
  ];
  // const teamMembers = [
  //   {
  //     name: "Mr. Amit Shashikant Kasabe",
  //     role: "Founder & CEO",
  //     bio: "A young software engineer with over 6 years of experience in verity of technologies such as MERN, PHP, AI&ML",
  //     avatar: "/avatars/amit.jpg",
  //     socials: {
  //       instagram: "https://instagram.com",
  //       linkedin: "https://linkedin.com",
  //       facebook: "https://facebook.com",
  //     },
  //   },
  //   {
  //     name: "Ms. Sonal Shashikant Kasabe",
  //     role: "CTO (Chief Technology Office)",
  //     bio: "A young 23 years old dedicated software engineer who loves to design the technical solition to problmes business faces",
  //     avatar: "/avatars/sonal.jpg",
  //     socials: {
  //       instagram: "https://instagram.com",
  //       linkedin: "https://linkedin.com",
  //       facebook: "https://facebook.com",
  //     },
  //   },
  //   {
  //     name: "Adrija Verma",
  //     role: "Product Lead",
  //     bio: "A young 24 years old Software Engineer who loves to design software products",
  //     avatar: "/avatars/adrija.jpg",
  //     socials: {
  //       instagram: "https://instagram.com",
  //       linkedin: "https://linkedin.com",
  //       facebook: "https://facebook.com",
  //     },
  //   },
  // ];
  const stats = [
    {
      value: "2018",
      label: "Founded in",
      icon: <CalendarIcon className="w-5 h-5" />,
    },
    {
      value: "50+",
      label: "Team members",
      icon: <UsersIcon className="w-5 h-5" />,
    },
    {
      value: "10k+",
      label: "Active users",
      icon: <UsersIcon className="w-5 h-5" />,
    },
    {
      value: "Global",
      label: "Location",
      icon: <MapPinIcon className="w-5 h-5" />,
    },
  ];

  return (
    <>
      <Nav />
      <div className="relative min-h-screen bg-gradient-to-br from-neutral-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(20)].map((_, i) => {
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const size = Math.random() * 20 + 10;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-pink-400/20"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                }}
                animate={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>

        <div className="relative z-10 py-12 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16 pt-32 md:pt-5">
            <Badge
              variant="outline"
              className="mb-4 py-1 px-3 bg-blue-50 border-blue-200 text-blue-600"
            >
              <RocketIcon className="w-4 h-4 mr-2" />
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              We&rsquo;re on a mission to make the web better
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto font-medium">
              Creating tools that empower developers and designers to build
              amazing digital experiences with ease and efficiency.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow bg-neutral-800 border-none"
              >
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white">
                    {stat.value}
                  </h3>
                  <p className="text-gray-400 mt-2">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="my-16 bg-gray-700" />

          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <LightbulbIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-blue-600 bg-neutral-800 text-white hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Simplifying Complexity</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg text-gray-300">
                    We believe technology should empower, not confuse. Our tools
                    transform complex workflows into intuitive experiences that
                    anyone can master.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-blue-600 bg-neutral-800 text-white hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Building Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg text-gray-300">
                    We&rsquo;re more than a product - we&rsquo;re a community of creators
                    supporting each other to push boundaries and innovate
                    together.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <UsersIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold">Meet Our Team</h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, idx) => (
                <Card
                  key={idx}
                  className="bg-neutral-800 text-white group flex flex-col overflow-hidden transition-shadow hover:shadow-xl border border-white/10 h-[500px]"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Avatar className="w-full h-full rounded-none">
                      <AvatarImage
                        src={member.avatar}
                        alt={member.name}
                        className="object-cover w-full h-full"
                      />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardHeader className="px-6 pt-4 pb-2 text-center">
                    <CardTitle className="text-xl text-white">
                      {member.name}
                    </CardTitle>
                    <Badge className="w-fit bg-blue-600 text-white mt-1 mx-auto">
                      {member.role}
                    </Badge>
                  </CardHeader>
                  <CardContent className="px-6 pb-4 text-center">
                    <p className="text-white/90 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <HandshakeIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold">Our Values</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Innovation",
                  text: "Constantly exploring new ideas and approaches to solve problems in novel ways.",
                  icon: <LightbulbIcon className="w-6 h-6 text-yellow-400" />,
                  bg: "url(&rsquo;/demo-bg-1.jpg&rsquo;)",
                },
                {
                  title: "Integrity",
                  text: "Doing the right thing even when no one is watching. Honesty in all our interactions.",
                  icon: <ShieldCheckIcon className="w-6 h-6 text-green-500" />,
                  bg: "url(&rsquo;/demo-bg-2.jpg&rsquo;)",
                },
                {
                  title: "Inclusivity",
                  text: "Building products and communities where everyone feels welcome and valued.",
                  icon: <UsersIcon className="w-6 h-6 text-pink-500" />,
                  bg: "url(&rsquo;/demo-bg-3.jpg&rsquo;)",
                },
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden shadow-lg relative group border border-white/10 backdrop-blur-md"
                  style={{
                    backgroundImage: value.bg,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="bg-black/60 p-6 h-full flex flex-col justify-between group-hover:bg-black/70 transition duration-300">
                    <div className="mb-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-white/10 rounded-full">
                          {value.icon}
                        </div>
                        <h3 className="text-white text-xl font-semibold">
                          {value.title}
                        </h3>
                      </div>
                      <p className="text-gray-200 text-sm">{value.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-center text-white mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join us on our journey
            </h2>
            <p className="max-w-2xl mx-auto mb-6 text-blue-100">
              We&rsquo;re always looking for passionate individuals to join our team
              or collaborate on exciting projects.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <MailIcon className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-blue-500"
              >
                View Careers
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
