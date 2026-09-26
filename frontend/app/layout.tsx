import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import NavBar from "@/components/NavBar";

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
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ position: 'relative' }}>
        {/* Animated wave gradient background — fixed, behind all content */}
        <div className="wave-bg" />
        {/* Page content sits above the background layer */}
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
