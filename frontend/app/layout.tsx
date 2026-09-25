import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import NavBar from "@/components/NavBar";
import FallingCode from "@/components/FallingCode";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mission Control",
  description: "Scan, plan, and explore projects with AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ position: 'relative' }}>
        {/* Fixed background layer at z-index:-1, behind all content */}
        <FallingCode />
        {/* z-index:1 ensures all page content sits above the falling code layer */}
        <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AuthProvider>
            <NavBar />
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
