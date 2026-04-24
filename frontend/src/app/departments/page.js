"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDepartments } from "@/lib/api/departments";
import "./page.css";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setError(err.message);
        setDepartments([
          { _id: 1, name: "Emergency Medicine", description: "Our emergency department provides 24/7 care.", headDoctor: "Dr. Smith", contactNumber: "+1 234 567 8900", email: "emergency@hospital.com", isActive: true, image: "" },
          { _id: 2, name: "Cardiology", description: "Specialized care for heart conditions.", headDoctor: "Dr. Johnson", contactNumber: "+1 234 567 8901", email: "cardiology@hospital.com", isActive: true, image: "" },
          { _id: 3, name: "Orthopedics", description: "Treatment for musculoskeletal injuries.", headDoctor: "Dr. Williams", contactNumber: "+1 234 567 8902", email: "orthopedics@hospital.com", isActive: true, image: "" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  if (loading) return <section className="section"><div className="service-box" style={{ textAlign: "center", padding: "2rem", margin: "0 auto" }}>Loading...</div></section>;

  return (
    <section className="section">
      <div className="department-container">
      <div className="header-title-subtitle">
        <h2 className="section-title">Departments</h2>
        <p className="section-subtitle">
          We offer a range of departments to cover your healthcare needs.
        </p>
      </div>

      <div className="services-grid">
        {(departments || [])
          .filter((dept) => dept?.isActive)
          .map((dept) => (
            <Link
              href={`/departments/${dept._id}`}
              key={dept._id}
              style={{ textDecoration: "none", color: "inherit", display: "flex" }}
            >
              <div
                className="service-box"
                style={{
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%", // Ensures it fills the responsive grid cell
                }}
              >
                {dept.image && (
                  <img
                    src={dept.image}
                    alt={dept.name}
                    style={{
                      width: "100%",      // Changed from 300px to 100%
                      height: "160px", 
                      objectFit: "cover",
                      borderRadius: "10px",
                      display: "block",
                      marginBottom: "1rem",
                    }}
                  />
                )}
                <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "1.2rem", color: "var(--primary-color)" }}>
                  {dept.name}
                </h3>
                <p style={{ margin: "0", fontSize: "1rem", color: "var(--muted-text)", lineHeight: "1.6", flex: "1" }}>
                  {dept.description}
                </p>
                
                {/* Contact info container */}
                <div style={{ marginTop: "10px", borderTop: "1px solid #f1f5f9", paddingTop: "10px" }}>
                    {dept.headDoctor && <p style={{ margin: "0", fontSize: "0.85rem", fontStyle: "italic" }}>Head: {dept.headDoctor}</p>}
                    {dept.contactNumber && <p style={{ margin: "0", fontSize: "0.85rem" }}>{dept.contactNumber}</p>}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div> </section>
  );
}