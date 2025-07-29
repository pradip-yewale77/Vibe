"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthProvider";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { supabase } from "@/lib/supabaseClient";
import {
  FiHome,
  FiGrid,
  FiFileText,
  FiUser,
  FiLogOut,
  FiSettings,
  FiPlus,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const templates = [
  {
    title: "Landing Pages",
    href: "/templates/landing-pages",
    description: "Modern landing page designs for various industries",
  },
  {
    title: "Dashboards",
    href: "/templates/dashboards",
    description: "Analytics and admin dashboard templates",
  },
  {
    title: "E-commerce",
    href: "/templates/ecommerce",
    description: "Online store templates with product displays",
  },
  {
    title: "Portfolios",
    href: "/templates/portfolios",
    description: "Creative portfolio designs for professionals",
  },
  {
    title: "Blog Layouts",
    href: "/templates/blogs",
    description: "Content-focused layouts for bloggers",
  },
  {
    title: "Mobile Apps",
    href: "/templates/mobile",
    description: "UI designs for mobile applications",
  },
];

export function Nav() {
  const { user } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 w-8 h-8 rounded-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-white font-bold text-lg">V</span>
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            vibe
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <FiHome className="mr-2" />
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center">
                  <FiGrid className="mr-2" />
                  Templates
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-xl shadow-xl border border-gray-100 dark:border-zinc-800 overflow-hidden">
                  <div className="grid gap-4 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                    {/* Left: Template Gallery */}
                    <div className="flex flex-col justify-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-zinc-800 dark:to-zinc-900 rounded-lg">
                      <div className="mt-4 mb-2 text-lg font-medium flex items-center">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                          V
                        </span>
                        Template Gallery
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">
                        Beautiful, production-ready templates to kickstart your projects
                      </p>
                      <Button
                        size="sm"
                        className="mt-2"
                        onClick={() => router.push("/templates")}
                      >
                        <FiPlus className="mr-2" />
                        Browse Templates
                      </Button>
                    </div>

                    {/* Right: List of templates */}
                    <ul className="grid gap-2">
                      {templates.slice(0, 4).map((template) => (
                        <ListItem
                          key={template.title}
                          title={template.title}
                          href={template.href}
                        >
                          {template.description}
                        </ListItem>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <FiFileText className="mr-2" />
                    Documentation
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth Section */}
        <div className="flex items-center">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer space-x-2">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user.user_metadata?.avatar_url}
                      alt={user.user_metadata?.full_name || "User"}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {user.user_metadata?.full_name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="ml-2 font-medium hidden lg:inline-block text-gray-700 dark:text-gray-200">
                    {user.user_metadata?.full_name?.split(" ")[0] || "Account"}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-800"
              >
                <div className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user.user_metadata?.full_name || "User"}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>

                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <FiUser className="mr-2" />
                  Dashboard
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <FiSettings className="mr-2" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-gray-100 dark:bg-zinc-800" />

                <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-600">
                  <FiLogOut className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="hidden sm:inline-flex"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props} className="list-none">
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800"
        >
          <div className="text-sm font-medium leading-none flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2" />
            {title}
          </div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
