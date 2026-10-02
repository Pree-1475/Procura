import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Procura — Research Procurement Initiative",
  description: "Procura helps researchers navigate difficult sourcing and procurement requirements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        
        {/* NAVIGATION */}
        <nav className="nav-bar">
          <div className="container nav-inner">
            <Link href="/" className="nav-brand">Procura.</Link>
            
            <div className="nav-links">
              <Link href="/#how-it-works">How It Works</Link>
              <Link href="/#sourced">What We've Sourced</Link>
              <Link href="/#about">About the Initiative</Link>
              <Link href="/track">Track Request</Link>
            </div>
            
            <div className="nav-cta">
              <Link href="/submit" className="btn btn-primary" style={{ height: "40px", padding: "0 20px", fontSize: "14px" }}>
                Submit a Requirement
              </Link>
            </div>
            
            <MobileNav />
          </div>
        </nav>
        
        {/* MAIN CONTENT */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-ink" style={{ padding: "3.5rem 0" }}>
          <div className="container footer-inner">
            <div>
              <p style={{ color: "var(--pure-white)", fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                Procura
              </p>
              <p style={{ color: "var(--soft-blue-grey)", fontSize: "14px" }}>
                An initiative by Dr. Manjesh Kumar and Harsha Kondaveeti.
              </p>
            </div>
            <div style={{ display: "flex", gap: "2rem" }}>
              <Link href="/admin/login" style={{ color: "var(--soft-blue-grey)", fontSize: "14px" }}>Admin Portal</Link>
              <Link href="/contact" style={{ color: "var(--soft-blue-grey)", fontSize: "14px" }}>Contact</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
