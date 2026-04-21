"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getHomeContent } from "@/lib/api/homeContent";
import { usePathname } from "next/navigation";

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
        if (
          data &&
          data.rotatingTextPhrases &&
          data.rotatingTextPhrases.length > 0
        ) {
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
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phrases]);

  const handleLogoError = () => console.log("Logo failed to load");
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const currentPhrase = phrases[currentPhraseIndex];
  const pathname = usePathname();
  const isAdminPanel = pathname && pathname.startsWith("/admin");
  const isServiceDetail =
    pathname && pathname.startsWith("/services/") && pathname !== "/services";

  return (
    <>
      {!isAdminPanel && !isServiceDetail && (
        <header className="site-header" style={{ width: "100%" }}>
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
                className={`site-subnav ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}
              >
                <b>
                  <Link href="/" onClick={closeMobileMenu}>
                    Home
                  </Link>
                </b>

                <b>
                  <Link href="/departments" onClick={closeMobileMenu}>
                    Departments
                  </Link>
                </b>
                <b>
                  <Link href="/health-packages" onClick={closeMobileMenu}>
                    Health Packages
                  </Link>
                </b>

                <b>
                  <Link href="/contact-us" onClick={closeMobileMenu}>
                    Contact Us
                  </Link>
                </b>
                <b>
                  <Link href="/feel-free-to-ask-us" onClick={closeMobileMenu}>
                    Ask Us
                  </Link>
                </b>
                <b>
                  <Link href="/about" onClick={closeMobileMenu}>
                    About Us
                  </Link>
                </b>

                <b>
                  <Link href="/patient-recovery" onClick={closeMobileMenu}>
                    Patient Recovery
                  </Link>
                </b>
              </nav>
            </div>
          </div>
        </header>
      )}

      {/* Main content now stretches to 100% of the screen edge */}
      <main className="site-main" style={{ width: "100%", minHeight: "80vh" }}>
        {children}
      </main>

      <footer
        className="site-footer"
        style={{
          width: "100%",
          backgroundColor: "var(--primary-dark)",
          color: "var(--hftext-color)",
          padding: "4rem 0 0 0",
          marginTop: "auto",
        }}
      >
        {/* INNER WRAPPER: Space-between ensures one is far left and one is far right */}
        <div
          style={{
            width: "80%",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "2rem",
            padding: "0 2rem",
          }}
        >
          {/* 1. CONTACT INFO: Now on the LEFT side of the container */}
          <div
            style={{
              flex: "0 1 400px",
              minWidth: "280px",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              textAlign: "left",
            }}
          >
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{ width: "80px", filter: "brightness(0) invert(1)" }}
            />
            <div style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "1.3rem",
                  marginBottom: "1.5rem",
                  color: "white",
                }}
              >
                Bhaktapur International Hospital
              </p>
              <p>📞 9801202550</p>
              <p>☎️ 015159266</p>
              <p>📍 P. O. Box 11796</p>
              <p>🏠 Bhaktapur, Nepal</p>
              <p>
                ✉️{" "}
                <span style={{ color: "var(--accent-color)" }}>
                  info@bihospital.com
                </span>
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              {["f", "ig", "in", "x"].map((icon) => (
                <div key={icon} style={socialIconStyle}>
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* 2. FEEDBACK FORM: Now on the RIGHT side of the container */}
          <div style={{ flex: "0 1 550px", minWidth: "300px" }}>
            <h2
              style={{
                color: "white",
                marginBottom: "1.5rem",
                fontSize: "1.8rem",
              }}
            >
              Feedback Form
            </h2>
            <div
              style={{
                padding: "1.5rem",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <form style={{ display: "grid", gap: "1rem" }}>
                <label
                  htmlFor="name"
                  style={{ color: "var(--hftext-color)", fontSize: "0.9rem" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  style={footerInputStyle}
                  required
                />
                <label
                  htmlFor="email"
                  style={{ color: "var(--hftext-color)", fontSize: "0.9rem" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  style={footerInputStyle}
                  required
                />
                <label
                  htmlFor="subject"
                  style={{ color: "var(--hftext-color)", fontSize: "0.9rem" }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Subject"
                  style={footerInputStyle}
                  required
                />
                <label
                  htmlFor="message"
                  style={{ color: "var(--hftext-color)", fontSize: "0.9rem" }}
                >
                  Message
                </label>
                <textarea
                  placeholder="Message"
                  rows={3}
                  style={footerInputStyle}
                  required
                ></textarea>
                <button type="submit" style={footerButtonStyle}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          style={{
            width: "100%",
            marginTop: "4rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "1.5rem 2rem 1.5rem 2rem",
            textAlign: "center",
            fontSize: "0.9rem",
            backgroundColor: "rgba(0,0,0,0.1)",
          }}
        >
          <p>Privacy Policy | Terms and Conditions</p>
          <p>
            © {new Date().getFullYear()} Bhaktapur International Hospital Pvt.
            Ltd. | All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

// HELPER STYLES
const footerInputStyle = {
  width: "100%",
  padding: "0.7rem",
  borderRadius: "var(--radius-md)",
  border: "1px solid rgba(255,255,255,0.2)",
  backgroundColor: "rgba(255,255,255,0.1)",
  color: "white",
  fontSize: "0.9rem",
  outline: "none",
};

const footerButtonStyle = {
  backgroundColor: "var(--secondary-color)",
  color: "white",
  padding: "0.8rem",
  borderRadius: "var(--radius-md)",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "transform 0.2s ease, opacity 0.2s ease",
};

const socialIconStyle = {
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: "white",
  color: "var(--primary-dark)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "0.8rem",
  cursor: "pointer",
};
