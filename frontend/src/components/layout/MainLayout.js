"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getHomeContent } from "@/lib/api/homeContent";
import { reportApi } from "@/lib/api/reports"; // Import the reports API
import { usePathname } from "next/navigation";
import "./layout.css";

function RotatingText({ phrases }) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    if (!phrases.length) return;

    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [phrases]);

  return <p className="rotating-text">{phrases[currentPhraseIndex]}</p>;
}

export default function MainLayout({ children }) {
  const [phrases, setPhrases] = useState([
    "Caring for your health with compassion and excellence",
    "Dedicated to your wellness and recovery",
    "Providing exceptional healthcare services",
    "Your trusted partner in health",
  ]);

  // const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- NEW REPORTS VISIBILITY STATE ---
  const [reportConfig, setReportConfig] = useState({
    shouldShow: false,
    navLabel: "Reports",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // Fetch rotating phrases and Report visibility status
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Home Content
        const homeData = await getHomeContent();
        if (homeData?.rotatingTextPhrases?.length > 0) {
          setPhrases(homeData.rotatingTextPhrases);
        }

        // Fetch Report Visibility
        const repData = await reportApi.getReports();
        setReportConfig({
          shouldShow: repData.shouldShow,
          navLabel: repData.navLabel || "Reports",
        });
      } catch (error) {
        console.error("Failed to fetch layout data:", error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [phrases]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "/api"}/feedbacks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (response.status === 200 || response.status === 201) {
        setStatus("Success! Feedback sent.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("Sent (Check Admin)");
      }
    } catch (error) {
      setStatus("Server error.");
    }
  };

  const handleLogoError = () => console.log("Logo failed to load");
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // const currentPhrase = phrases[0];
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
                <Link href="/" onClick={closeMobileMenu}>
                  <h1>Bhaktapur International Hospital</h1>
                </Link>
                {/* <p className="rotating-text">{currentPhrase}</p> */}
                <RotatingText phrases={phrases} />
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

                {/* DYNAMIC REPORTS LINK[cite: 2] */}
                {reportConfig.shouldShow && (
                  <b>
                    <Link href="/reports" onClick={closeMobileMenu}>
                      {reportConfig.navLabel}
                    </Link>
                  </b>
                )}
              </nav>
            </div>
          </div>
        </header>
      )}

      <main className="site-main" style={{ width: "100%", minHeight: "80vh" }}>
        {children}
      </main>

      {!isAdminPanel && !isServiceDetail && (
        <footer className="site-footer">
          <div className="footer-content">
            {/* CONTACT INFO */}
            <div className="footer-contact">
              <img src="/images/logo.png" alt="Logo" className="footer-logo" />
              <div className="footer-contact-info">
                <p className="footer-hospital-name">
                  Bhaktapur International Hospital
                </p>
                <p>
                  <img src="/images/phone.png" className="footer-icon" />{" "}
                  9801202550
                </p>
                <p>
                  <img src="/images/telephone.png" className="footer-icon" />{" "}
                  015178645
                </p>
                <p>
                  <img src="/images/ambulance.png" className="footer-icon" />{" "}
                  02349234
                </p>
                <p>
                  <img
                    src="/images/footerhospital.png"
                    className="footer-icon"
                  />{" "}
                  Bhaktapur, Nepal
                </p>
                <p>
                  <img src="/images/email.png" className="footer-icon" />{" "}
                  info@bihospital.com
                </p>
              </div>
              <div className="footer-socials">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/images/linkedin.png"
                    alt="LinkedIn"
                    className="social-icon"
                  />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/images/ig.png"
                    alt="Instagram"
                    className="social-icon"
                  />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/images/twitter.png"
                    alt="Twitter"
                    className="social-icon"
                  />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/images/fb.png"
                    alt="Facebook"
                    className="social-icon"
                  />
                </a>
              </div>
            </div>

            {/* FEEDBACK FORM */}
            <div className="feedback-form">
              <h2 className="feedback-header">Feedback Form</h2>
              <div className="feedback-div">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name">Name</label>
                  <input
                    className="footerinput"
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    className="footerinput"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                  <label htmlFor="subject">Subject</label>
                  <input
                    className="footerinput"
                    id="subject"
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                  />
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="footerinput"
                    id="message"
                    placeholder="Message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                  <button type="submit">Send Message</button>
                  {status && <p className="footer-status">{status}</p>}
                </form>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} Bhaktapur International Hospital Pvt.
              Ltd. | All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </>
  );
}
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
