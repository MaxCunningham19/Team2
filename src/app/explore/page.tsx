"use client";
import Image from "next/image";

import Link from "next/link";
import { X, Plus, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { Button } from "../_components/ui/button";

// Filter categories and options
const filterOptions = {
  Medium: ["Ceramic", "Oil Paint", "Watercolor", "Digital", "Photography"],
  Style: ["Modern", "Contemporary", "Classical", "Abstract", "Minimalist"],
  Period: ["2000s", "1990s", "1980s", "Pre-1980"],
};

type Filter = {
  category: string;
  value: string;
};

const navItems = ["All works", "Curated", "Featured"];

export default function Page() {
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
  const [activeNavItem, setActiveNavItem] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const addFilter = (category: string, value: string) => {
    setSelectedFilters((prev) => [...prev, { category, value }]);
  };

  const removeFilter = (index: number) => {
    setSelectedFilters((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const activeNav = navRefs.current[activeNavItem];
    if (activeNav) {
      setUnderlineStyle({
        width: `${activeNav.offsetWidth}px`,
        left: `${activeNav.offsetLeft}px`,
      });
    }
  }, [activeNavItem]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-12 mt-32 space-y-6">
        <h2 className="font-serif text-7xl text-foreground">Explore</h2>

        <div className="space-y-4">
          <input
            type="search"
            placeholder="Search for..."
            className="w-full rounded-lg border border-border bg-muted px-6 py-4 text-foreground placeholder:text-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />

          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter, index) => (
              <Button
                key={index}
                className="inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-primary transition-colors hover:bg-secondary/80"
                onClick={() => removeFilter(index)}
              >
                {filter.value}
                <X className="h-4 w-4" />
              </Button>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-primary transition-colors hover:bg-secondary/80">
                <Plus className="h-4 w-4" />
                Add Filter
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {Object.entries(filterOptions).map(([category, values]) => (
                  <div key={category}>
                    <DropdownMenuLabel>{category}</DropdownMenuLabel>
                    {values.map((value) => (
                      <DropdownMenuItem
                        key={value}
                        onClick={() => addFilter(category, value)}
                      >
                        {value}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative mb-8 border-b border-primary/20">
        <ul className="flex gap-8">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href="#"
                ref={(el) => {
                  navRefs.current[index] = el;
                }}
                className={`${index === activeNavItem ? "text-foreground" :
                  "text-primary hover:text-foreground"
                  } inline-block pb-2 text-lg
                  transition-colors`}
                onClick={() => setActiveNavItem(index)}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <div
          className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
          style={underlineStyle}
        />
      </nav>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <Link
            key={item}
            href="#"
            className="group overflow-hidden rounded-lg bg-secondary/50 transition-shadow hover:shadow-lg"
          >
            <Image
              src="/images/the-great-wave.jpeg"
              alt="The Great Wave of Kanagawa"
              width={400}
              height={300}
              className="aspect-4/3 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-serif text-xl text-foreground transition-colors group-hover:text-primary">
                The Great Wave of Kanagawa
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
