"use client";

import { useState } from "react";
import { Playfair_Display } from "next/font/google";
import { PienoModal } from "@/components/PienoModal";
import { MetaModal } from "@/components/MetaModal";
import { MoltiModal } from "@/components/MoltiModal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function Home() {
  const [isPienoOpen, setIsPienoOpen] = useState(false);
  const [isMetaOpen, setIsMetaOpen] = useState(false);
  const [isMoltiOpen, setIsMoltiOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background p-8 md:p-16">
      <h1
        className={`${playfair.variable} mb-16 font-serif text-4xl text-secondary md:mb-24 md:text-6xl`}
      >
        Commissions Options
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Pieno Card */}
        <div className="group flex flex-col justify-between rounded-3xl bg-card p-8 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
          <div>
            <div className="mb-8 flex items-center">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <div className="mx-2 h-[2px] flex-1 bg-primary"></div>
              <div className="h-3 w-3 rounded-full border-2 border-primary"></div>
            </div>
            <div className="mb-4 border-b border-primary"></div>
            <h2
              className={`${playfair.variable} mb-4 font-serif text-3xl text-secondary`}
            >
              Pieno
            </h2>
            <ul className="mb-6 list-inside list-disc space-y-2 text-primary">
              <li>Pay full amount at once</li>
              <li>Lorem</li>
              <li>Usop</li>
            </ul>
          </div>
          <button
            className="w-full rounded-full bg-primary py-2 text-white transition-colors duration-300 hover:bg-opacity-90"
            onClick={() => setIsPienoOpen(true)}
          >
            Select
          </button>
        </div>

        {/* Metà Card */}
        <div className="group flex flex-col justify-between rounded-3xl bg-card p-8 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
          <div>
            <div className="mb-8 flex items-center">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <div className="mx-2 h-[2px] flex-1 bg-primary"></div>
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <div className="mx-2 h-[2px] flex-1 bg-primary"></div>
              <div className="h-3 w-3 rounded-full border-2 border-primary"></div>
            </div>
            <div className="mb-4 border-b border-primary"></div>
            <h2
              className={`${playfair.variable} mb-4 font-serif text-3xl text-secondary`}
            >
              Metà
            </h2>
            <ul className="mb-6 list-inside list-disc space-y-2 text-primary">
              <li>Pay in two installments after milestones</li>
              <li>Lorem</li>
              <li>Usop</li>
            </ul>
          </div>
          <button
            className="w-full rounded-full bg-primary py-2 text-white transition-colors duration-300 hover:bg-opacity-90"
            onClick={() => setIsMetaOpen(true)}
          >
            Select
          </button>
        </div>

        {/* Molti Card */}
        <div className="group flex flex-col justify-between rounded-3xl bg-card p-8 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
          <div>
            <div className="mb-8 flex items-center">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <div className="mx-2 h-[2px] flex-1 bg-primary"></div>
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <div className="mx-2 h-[2px] flex-1 bg-primary"></div>
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <div className="mx-2 h-[2px] flex-1 bg-primary"></div>
              <div className="h-3 w-3 rounded-full border-2 border-primary"></div>
            </div>
            <div className="mb-4 border-b border-primary"></div>
            <h2
              className={`${playfair.variable} mb-4 font-serif text-3xl text-secondary`}
            >
              Molti
            </h2>
            <ul className="mb-6 list-inside list-disc space-y-2 text-primary">
              <li>Pay in multiple installments after milestones</li>
              <li>Lorem</li>
              <li>Usop</li>
            </ul>
          </div>
          <button
            className="w-full rounded-full bg-primary py-2 text-white transition-colors duration-300 hover:bg-opacity-90"
            onClick={() => setIsMoltiOpen(true)}
          >
            Select
          </button>
        </div>
      </div>

      <PienoModal isOpen={isPienoOpen} onClose={() => setIsPienoOpen(false)} />
      <MetaModal isOpen={isMetaOpen} onClose={() => setIsMetaOpen(false)} />
      <MoltiModal isOpen={isMoltiOpen} onClose={() => setIsMoltiOpen(false)} />
    </main>
  );
}
