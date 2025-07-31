"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt
} from "@tabler/icons-react";
import {
  GithubIcon,
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sidebar, SidebarBody, SidebarLink } from "@/app/components/UI/sidebar";
import { useAuth } from "@/Context/AuthProvider";

export default function ProfileSidebar() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "Profile",
      href: "#",
      icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    }
  ];

  // Sidebar is always open and cannot be toggled
  const open = true;
  const setOpen = () => {};

  return (
    <div
      className={cn(
        "relative w-full h-screen flex flex-row bg-gradient-to-br from-[#232526] to-[#414345] overflow-hidden"
      )}
      style={{ minHeight: '100vh', height: '100vh', paddingTop: '64px' }}
    >
      {/* Sidebar */}
      <div className="fixed top-[60px] left-0 h-[calc(100vh-64px)] w-72 z-30 flex flex-col bg-neutral-900 border-r border-neutral-800 shadow-lg select-none pointer-events-auto">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="flex flex-col justify-between h-full p-4 select-none">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto pointer-events-none">
              {/* Always show Logo, never toggle */}
              <Logo />
              <div className="mt-8 flex flex-col gap-2 pointer-events-auto">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div className="pointer-events-auto">
              <SidebarLink
                link={{
                  label: "Manu Arora",
                  href: "#",
                  icon: (
                    <img
                      src="https://assets.aceternity.com/manu.png"
                      className="h-7 w-7 shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  )
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
      </div>
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center ml-72 h-[calc(100vh-64px)]">
        <div className="w-full max-w-5xl h-[calc(100vh-96px)] bg-white/10 dark:bg-neutral-900/80 rounded-2xl shadow-2xl border border-neutral-700 p-8 md:p-16 backdrop-blur-md flex items-center justify-center">
          <Dashboard />
        </div>
      </main>
    </div>
  );
}

const Logo = () => (
  <a
    href="#"
    className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
  >
    <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium whitespace-pre text-black dark:text-white"
    >
      Acet Labs
    </motion.span>
  </a>
);

const LogoIcon = () => (
  <a
    href="#"
    className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
  >
    <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
  </a>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "India",
    website: "",
    bio: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user?.user_metadata?.full_name || "",
        email: user?.email || "",
        phone: user?.user_metadata?.phone || "",
        location: "India",
        website: `https://github.com/${user?.user_metadata?.preferred_username || ""}`,
        bio: `Hello, I'm ${user?.user_metadata?.full_name || "a developer"} using GitHub Auth.`
      });
    }
  }, [user]);

  if (!user) {
    return <div className="p-10 text-white">Loading profile...</div>;
  }

  return (
    <div className="flex flex-row w-full h-full gap-10 items-center justify-center">
      {/* Profile Card */}
      <div className="w-80 min-w-[320px] max-w-[320px] h-[calc(100vh-160px)] flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-[#232526]/80 to-[#414345]/80 rounded-2xl shadow-lg border border-neutral-700 p-8">
        <Avatar className="w-28 h-28 ring ring-neutral-300 dark:ring-white ring-offset-2">
          <AvatarImage
            src={user?.user_metadata?.avatar_url}
            alt={user?.user_metadata?.full_name}
          />
          <AvatarFallback>{formData.fullName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">{formData.fullName}</h2>
          <span className="text-sm text-neutral-300">{formData.email}</span>
        </div>
        <div className="flex flex-col items-start gap-2 w-full mt-4">
          <div className="flex items-center gap-2 text-neutral-300 text-sm">
            <MapPinIcon className="w-4 h-4" />
            <span>{formData.location}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-300 text-sm">
            <PhoneIcon className="w-4 h-4" />
            <span>{formData.phone || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-300 text-sm">
            <GlobeIcon className="w-4 h-4" />
            <a
              href={formData.website}
              className="hover:underline text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              {formData.website}
            </a>
          </div>
          <div className="flex items-center gap-2 text-neutral-300 text-sm">
            <GithubIcon className="w-4 h-4" />
            <a
              href={`https://github.com/${user?.user_metadata?.preferred_username}`}
              className="hover:underline text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              @{user?.user_metadata?.preferred_username}
            </a>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="flex-1 flex flex-col gap-3 bg-white/30 dark:bg-neutral-800/80 rounded-2xl shadow-lg border border-neutral-700 p-10 min-w-[420px] max-w-[900px] h-[calc(100vh-160px)] justify-center">
        <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-white">Full Name</Label>
            <Input type="text" value={formData.fullName} disabled className="mt-1 bg-white/60 dark:bg-neutral-900/60 text-black dark:text-white" />
          </div>
          <div>
            <Label className="text-white">Email</Label>
            <Input type="email" value={formData.email} disabled className="mt-1 bg-white/60 dark:bg-neutral-900/60 text-black dark:text-white" />
          </div>
          <div>
            <Label className="text-white">Phone</Label>
            <Input type="tel" value={formData.phone} disabled className="mt-1 bg-white/60 dark:bg-neutral-900/60 text-black dark:text-white" />
          </div>
          <div>
            <Label className="text-white">Location</Label>
            <Input type="text" value={formData.location} disabled className="mt-1 bg-white/60 dark:bg-neutral-900/60 text-black dark:text-white" />
          </div>
        </div>
        <div>
          <Label className="text-white">Website</Label>
          <Input type="text" value={formData.website} disabled className="mt-1 bg-white/60 dark:bg-neutral-900/60 text-black dark:text-white" />
        </div>
        <div>
          <Label className="text-white">Bio</Label>
          <Textarea rows={4} value={formData.bio} disabled className="mt-1 bg-white/60 dark:bg-neutral-900/60 text-black dark:text-white" />
        </div>
        <Button disabled variant="outline" className="w-fit cursor-not-allowed bg-white/60 dark:bg-neutral-900/60 text-black dark:text-white border border-neutral-400 dark:border-neutral-700">
          GitHub Auth Connected
        </Button>
      </div>
    </div>
  );
};
