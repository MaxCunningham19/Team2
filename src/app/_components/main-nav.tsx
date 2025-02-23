"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    title: "Gallery",
    href: "/gallery",
  },
  {
    title: "Search",
    href: "/search",
  },
  {
    title: "Commission",
    href: "/commission",
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-6">
      {navItems.map((item, index) => (
        <React.Fragment key={item.href}>
          <Link
            href={item.href}
            className={cn(
              "relative flex items-center text-sm font-medium transition-colors hover:text-accent",
              "text-primary",
              pathname === item.href && "text-accent",
            )}
          >
            {pathname === item.href && (
              <span className="absolute -left-4 h-2 w-2 rounded-full bg-accent" />
            )}
            {item.title}
          </Link>
          {index < navItems.length - 1 && (
            <span className="text-primary">|</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
