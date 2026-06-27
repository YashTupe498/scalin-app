import type { Metadata } from "next";
import { Inter, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["italic", "normal"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Astrophysics | Deep Space Visualization",
  description: "A high-tech scrollytelling experience into a supermassive black hole.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable} bg-black text-zinc-400 font-sans antialiased no-scrollbar overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
