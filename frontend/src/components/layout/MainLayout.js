"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getHomeContent } from "@/lib/api/homeContent";
import { usePathname } from "next/navigation";
import "./layout.css";

export default function MainLayout({ children }) {
  const [phrases, setPhrases] = useState([
    "Caring for your health with compassion and excellence",
    "Dedicated to your wellness and recovery",
    "Providing exceptional healthcare services",
    "Your trusted partner in health",
  ]);

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchPhrases = async () => {
      try {
        const data = await getHomeContent();
        if (data?.rotatingTextPhrases?.length > 0) {
          setPhrases(data.rotatingTextPhrases);
        }
      } catch (error) {
        console.error("Failed to fetch rotating text phrases:", error);
      }
    };

    fetchPhrases();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [phrases]);

  const pathname = usePathname();
  const isAdminPanel = pathname?.startsWith("/admin");
  const isServiceDetail =
    pathname?.startsWith("/services/") && pathname !== "/services";

  const currentPhrase = phrases[currentPhraseIndex];

  return (
    <>
      {!isAdminPanel && !isServiceDetail && (
        <header className="site-header">
          <div className="header-container">
            <div className="logo-section">
              <img src="/images/logo.png" alt="Logo" className="logo-image" />

              <div className="logo-text">
                <h1>Bhaktapur International Hospital</h1>

                <p className="rotating-text">{currentPhrase}</p>
              </div>
            </div>

            <div className="nav-container">
              <button
                className="mobile-menu-button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                ☰
              </button>

              <nav
                className={`site-subnav ${
                  isMobileMenuOpen ? "mobile-menu-open" : ""
                }`}
              >
                <Link href="/">Home</Link>
                <Link href="/about">About Us</Link>
                <Link href="/departments">Departments</Link>
                <Link href="/health-packages">Health Packages</Link>
                <Link href="/contact-us">Contact Us</Link>
                <Link href="/feel-free-to-ask-us">Ask Us</Link>
                <Link href="/patient-recovery">Patient Recovery</Link>
              </nav>
            </div>
          </div>
        </header>
      )}

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} Bhaktapur International Hospital. All
          rights reserved.
        </p>
      </footer>
    </>
  );
}
