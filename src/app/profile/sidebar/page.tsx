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

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "mx-auto min-h-screen flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
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
      <Dashboard />
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
    <div className="flex flex-col md:flex-row w-full h-full p-4 md:p-10 gap-6 bg-white dark:bg-neutral-900 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700">
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center gap-4 border-r border-neutral-200 dark:border-neutral-700 px-4">
        <Avatar className="w-28 h-28 ring ring-neutral-300 dark:ring-white ring-offset-2">
          <AvatarImage
            src={user?.user_metadata?.avatar_url}
            alt={user?.user_metadata?.full_name}
          />
          <AvatarFallback>{formData.fullName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-1">{formData.fullName}</h2>
          <span className="text-sm text-neutral-400">{formData.email}</span>
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

      <div className="flex-1 flex flex-col gap-6">
        <h3 className="text-xl font-semibold text-white mb-2">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-white">Full Name</Label>
            <Input type="text" value={formData.fullName} disabled className="mt-1" />
          </div>
          <div>
            <Label className="text-white">Email</Label>
            <Input type="email" value={formData.email} disabled className="mt-1" />
          </div>
          <div>
            <Label className="text-white">Phone</Label>
            <Input type="tel" value={formData.phone} disabled className="mt-1" />
          </div>
          <div>
            <Label className="text-white">Location</Label>
            <Input type="text" value={formData.location} disabled className="mt-1" />
          </div>
        </div>
        <div>
          <Label className="text-white">Website</Label>
          <Input type="text" value={formData.website} disabled className="mt-1" />
        </div>
        <div>
          <Label className="text-white">Bio</Label>
          <Textarea rows={4} value={formData.bio} disabled className="mt-1" />
        </div>
        <Button disabled variant="outline" className="w-fit cursor-not-allowed">
          GitHub Auth Connected
        </Button>
      </div>
    </div>
  );
};
