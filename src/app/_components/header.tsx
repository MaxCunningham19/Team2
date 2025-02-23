"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";

const navItems = [
  { title: "Home", href: "/" },
  { title: "Explore", href: "/explore" },
  { title: "Commissions", href: "/commissions" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="container fixed left-1/2 top-0 z-[5] -translate-x-1/2 transform px-4 pt-8">
      <div className="flex flex-col items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-4xl">novanti</span>
          <div className="h-8 w-8 rotate-3 border-2 border-[#FFA500]" />
        </Link>

        {/* Navigation Bar */}
        <div className="w-full max-w-xl">
          <nav className="flex items-center justify-around rounded-full border-2 border-[#745543]/20 bg-[#e6ccc0]/50 px-6 py-2 backdrop-blur-md">
            {navItems.map((item, _) => (
              <div key={item.title} className="flex items-center">
                <Link
                  href={item.href}
                  className={`${pathname === item.href ? "text-[#a88a7c] underline" : ""} relative px-2 py-1 text-[#745543] transition-colors
                      hover:text-[#a88a7c]`}
                >
                  {item.title}
                </Link>
              </div>
            ))}
            <Link href="/login">
              <Button className="rounded-full bg-[#a88a7c] px-6 text-white hover:bg-[#a88a7c]/90">
                Sign In
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
