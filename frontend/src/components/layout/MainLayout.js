'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { getHomeContent } from "@lib/api/homeContent";
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }) {
  const [phrases, setPhrases] = useState([
    "Caring for your health with compassion and excellence",
    "Dedicated to your wellness and recovery",
    "Providing exceptional healthcare services",
    "Your trusted partner in health"
  ]);
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Fetch rotating text phrases from backend
  useEffect(() => {
    const fetchPhrases = async () => {
      try {
        const data = await getHomeContent();
        if (data && data.rotatingTextPhrases && data.rotatingTextPhrases.length > 0) {
          setPhrases(data.rotatingTextPhrases);
        }
      } catch (error) {
        console.error('Failed to fetch rotating text phrases:', error);
      }
    };
    
    fetchPhrases();
  }, []);
  
  // Rotate phrases every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000); // Change phrase every 3 seconds
    
    return () => clearInterval(interval);
  }, [phrases]);
  
  const handleLogoError = () => {
    console.log('Logo failed to load');
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const currentPhrase = phrases[currentPhraseIndex];
  const pathname = usePathname();
  const isAdminPanel = pathname && pathname.startsWith('/admin');
  const isServiceDetail = pathname && pathname.startsWith('/services/') && pathname !== '/services'; // This checks if it's a service detail page like /services/[title] but not the main services page

  
  return (
    <>
      {!isAdminPanel && !isServiceDetail && (
        <header className="site-header">
          <div className="header-container">
            <div className="logo-section">
              <img 
                src="/images/logo.png" 
                alt="Bhaktapur International Hospital Logo" 
                className="logo-image"
                onError={handleLogoError}
              />
              <div className="logo-text">
                <h1>Bhaktapur International Hospital</h1>
                <p className="site-header-subtitle rotating-text">
                  {currentPhrase}
                </p>
              </div>
            </div>
            <div className="nav-container">
              <button 
                className="mobile-menu-button"
                onClick={toggleMobileMenu}
                aria-label="Toggle navigation menu"
              >
                ☰
              </button>
              <nav className={`site-subnav ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                <Link href="/" onClick={closeMobileMenu}>Home</Link>
                <Link href="/about" onClick={closeMobileMenu}>About Us</Link>
                <Link href="/departments" onClick={closeMobileMenu}>Departments</Link>
                <Link href="/health-packages" onClick={closeMobileMenu}>Health Packages</Link>
                <Link href="/contact-us" onClick={closeMobileMenu}>Contact Us</Link>
                <Link href="/feel-free-to-ask-us" onClick={closeMobileMenu}>Ask Us</Link>
                <Link href="/patient-recovery" onClick={closeMobileMenu}>Patient Recovery</Link>
                {/* Admin link hidden from public */}
              </nav>
            </div>
          </div>
        </header>
      )}
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} Bhaktapur International Hospital. All rights reserved.
        </p>
      </footer>
    </>
  );
}
