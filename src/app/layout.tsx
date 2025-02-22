import "~/styles/globals.css";

import { Playfair_Display } from 'next/font/google'
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
})

export const metadata: Metadata = {
  title: "novanti",
  description: "The novel art auction-house",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
