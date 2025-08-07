import React from "react";
import { FloatingDock } from "./UI/floating-dock";
import {
  import {
  IconHtml,
  IconBrandTypescript,
  IconBrandCss3,
  IconBrandVscode
} from "@tabler/icons-react";

export function FloatingDockDemo() {
  const links = [
    {
      title: "HTML",
      icon: (
        <IconHtml className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "CSS",
      icon: (
        <IconBrandCss3 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Type Script",
      icon: (
        <IconBrandTypescript className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "VS Code",
      icon: (
        <IconBrandVscode className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    // {
    //   title: "VS CODE",
    //   icon: (
    //     <img
    //       src="https://assets.aceternity.com/logo-dark.png"
    //       width={20}
    //       height={20}
    //       alt="Aceternity Logo"
    //     />
    //   ),
    //   href: "#",
    // },
    
  ];
  return (
    <div className="flex items-center justify-center h-[10rem] w-full">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
