"use client";

import Link from "next/link";
import "../../app/globals.css";
import { TemplateContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
// Helper function to create URL-friendly service title
const createUrlFriendlyTitle = (title) => {
  return encodeURIComponent(
    title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, " ") // Replace special chars with spaces
      .replace(/\s+/g, "-"), // Replace spaces with hyphens
  );
};

export default function ServicesSection({ services = [] }) {
  return (
    <section className="section" >
      <h2 className="section-title" >Our Services</h2>
      <div className="services-grid" style={{display:"grid",
        gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",
        gap:"2rem",
        maxWidth:"1500px", 
        margin:"0 auto"
        }}>
        {services.map((service, index) => (
          <Link
            href={`/services/${createUrlFriendlyTitle(service.title)}`}
            key={index}
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              
            }}
          >
            <div //homepage-service-box
              style={{
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                padding: "1rem",
                border: "1px solid #e0e0e0",
                borderRadius: "9px",
                borderColor: " #080c67",
                borderStyle: "solid",
                borderWidth: "2.5px",
                transitionDuration: "0.8s",
                width: "100%",              textAlign: "center",
                backgroundColor: "white",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px rgba(0, 0, 0, 0.15)";
                e.currentTarget.style.borderColor = " #18b730";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
                e.currentTarget.style.borderColor = " #1f168b";
              }}
            >
              {service.imageUrl && (
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  style={{
                    width: "90%",
                    height: "150px",
                    objectFit: "cover",
                    marginBottom: "1rem",
                    borderRadius: "12px",
                    // display: "block",
                    marginBottom: "1rem",
                  }}
                />
              )}
              <h3 style={{ margin: "0.5rem 0" }}>{service.title}</h3>
              <p style={{ margin: "0.5rem 0", 
                overflow: "hidden",
              }}>{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
