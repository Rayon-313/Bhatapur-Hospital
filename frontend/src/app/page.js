// src/app/page.js

import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import AppointmentSection from "@/components/home/AppointmentSection";

import { getHomeContent } from "@/lib/api/homeContent";

// Load content from backend
async function loadHomeContent() {
  try {
    console.log("Loading home content...");
    const data = await getHomeContent();
    console.log("Received data in loadHomeContent:", data);

    await new Promise((resolve) => setTimeout(resolve, 100));

    if (
      data &&
      (data.heroTitle ||
        data.heroSubtitle ||
        data.services ||
        data.whyChooseUs ||
        data.videoPath)
    ) {
      console.log("Valid content found, using database content");
      return data;
    }
    console.log("No valid content found, using fallback");
    return null;
  } catch (err) {
    console.error("Failed to load home content:", err);
    return null;
  }
}

function HomeVideoSection({ videoPath }) {
  if (!videoPath) {
    videoPath = "/videos/hospital-tour.mp4";
  }

  const isBlob = videoPath?.startsWith("blob:");
  const validVideoPath = isBlob
    ? "/videos/hospital-tour.mp4"
    : videoPath || "/videos/hospital-tour.mp4";

  return (
    <section className="section">
      <h2 className="video-section-title">Take a look inside our hospital</h2>
      <p className="video-section-subtitle">
        Get a quick overview of our facilities, modern equipment, and friendly
        environment.
      </p>
      <div style={{ marginTop: "1rem" }}>
        <div
          className="video-container"
          style={{
            width: "100%",
            maxWidth: "800px",
            borderRadius: "8px",
            overflow: "hidden",
            position: "relative",
            margin: "0 auto",
            backgroundColor: "#000",
          }}
        >
          {/* ✅ FIXED: Added loop and muted (muted is often required for autoplay) */}
          <video
            controls
            loop
            autoPlay
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          >
            <source src={validVideoPath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* --- MOVING TEXT OVERLAY --- */}
          <div
            style={{
              position: "absolute",
              bottom: "10px", // ✅ FIXED: Lowered the text (was 50px)
              left: 0,
              width: "100%",
              background: "rgba(11, 243, 27, 0.6)",
              color: "#fff",
              padding: "8px 0",
              overflow: "hidden",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 10,
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            <div
              style={{
                display: "inline-block",
                paddingLeft: "100%",
                marginTop: "4px",
                animation: "marquee 12s linear infinite",
                color: "white",
              }}
            >
              Bhaktapur international hospital, 24/7 free ambulance, radiology,
              SSF
            </div>
          </div>

          <style
            dangerouslySetInnerHTML={{
              __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
            }
          `,
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const content = await loadHomeContent();

  const getServices = () => {
    if (!content || !content.services) {
      return [];
    }

    if (Array.isArray(content.services)) {
      return content.services.map((service) => {
        if (typeof service === "object" && service !== null) {
          return {
            title: service.title || "",
            description: service.description || "",
            imageUrl: service.imageUrl || "",
          };
        } else {
          return {
            title: typeof service === "string" ? service : String(service),
            description: "",
            imageUrl: "",
          };
        }
      });
    }
    return [];
  };

  const services = getServices();

  return (
    <>
      {content ? (
        <>
          <HomeVideoSection
            videoPath={content.videoPath || "/videos/hospital-tour.mp4"}
          />
          <section className="section" style={{ textAlign: "center" }}>
            <h2 className="hero-section-title">
              {content.heroTitle ||
                "Welcome to Bhaktapur International Hospital"}
            </h2>
            <p className="hero-section-subtitle">
              {content.heroSubtitle ||
                "We provide comprehensive medical care with state-of-the-art facilities and a team of experienced specialists dedicated to your well-being."}
            </p>
          </section>
          <ServicesSection services={services} />
          <section className="section">
            <h2 className="section-title">Why Choose Us</h2>
            <ul className="bullet-list">
              {content.whyChooseUs && Array.isArray(content.whyChooseUs) ? (
                content.whyChooseUs.map((reason, i) => (
                  <li key={i}>{reason}</li>
                ))
              ) : (
                <li>No reasons available</li>
              )}
            </ul>
          </section>
        </>
      ) : (
        <>
          <HomeVideoSection videoPath="/videos/hospital-tour.mp4" />
          <HeroSection />
          <ServicesSection />
          <WhyChooseUsSection />
        </>
      )}

      <section
        className="section"
        style={{
          padding: "4rem 0",
          background: "linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)",
        }}
      >
        <h2
          className="section-title"
          style={{
            fontSize: "2.5rem",
            color: "#0b7ac4",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Book an Appointment
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: "1",
              minWidth: "300px",
              maxWidth: "600px",
            }}
          >
            <AppointmentSection />
          </div>

          <div
            style={{
              flex: "1",
              minWidth: "300px",
              maxWidth: "600px",
              height: "500px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
              border: "1px solid #e2e8f0",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.567475141755!2d85.39413237536965!3d27.66986697620353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1a0f9e9d694b%3A0x7d6b8f1d8a0d4c5!2sBhaktapur%20International%20Hospital!5e0!3m2!1sen!2snp!4v1713516000000!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bhaktapur International Hospital Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
