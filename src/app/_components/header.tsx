"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";

const navItems = [
  { title: "Gallery", href: "/gallery" },
  { title: "Search", href: "/search" },
  { title: "Commission", href: "/commission" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="container fixed top-0 z-[5] mx-auto px-4 pt-8">
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-4xl text-[#745543]">novanti</span>
          <div className="h-8 w-8 rotate-3 border-2 border-[#FFA500]" />
        </Link>

        {/* Navigation Bar */}
        <div className="w-full max-w-xl">
          <nav className="flex items-center justify-between rounded-full border-2 border-[#745543]/20 bg-[#e6ccc0]/50 px-6 py-2">
            <div className="relative flex items-center gap-4">
              {navItems.map((item, index) => (
                <div key={item.title} className="flex items-center">
                  {index > 0 && (
                    <div className="mx-4 h-4 w-px bg-[#745543]/30" />
                  )}
                  <Link
                    href={item.href}
                    className={`relative px-2 py-1 text-[#745543] transition-colors hover:text-[#a88a7c] ${pathname === item.href ? "text-[#a88a7c]" : ""
                      }`}
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
              <div
                className="absolute bottom-0 h-0.5 bg-[#a88a7c] transition-all duration-300 ease-in-out"
                style={{
                  left:
                    pathname === "/gallery"
                      ? "0%"
                      : pathname === "/search"
                        ? "33.33%"
                        : "66.66%",
                  width: "60px",
                  transform: "translateX(10%)",
                }}
              />
            </div>
            <Button className="rounded-full bg-[#a88a7c] px-6 text-white hover:bg-[#a88a7c]/90">
              Sign In
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
