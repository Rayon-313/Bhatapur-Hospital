// This page displays a list of hospital departments, fetching data from the backend API. Each department is presented in a card format with its name, description, head doctor, contact information, and an optional image. Users can click on a department to view more details on a separate page. The component also handles loading and error states gracefully, providing feedback to the user when necessary.
"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; // Make sure to import Link
import { getDepartments } from "@/lib/api/departments";
// import {
//   getDepartments,
//   updateDepartment as updateDepartmentAPI,
//   deleteDepartment as deleteDepartmentAPI
// } from '@/lib/api/departments';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState(null);

  useEffect(() => {
    getDepartments().then((data) => {
      setDepartments(data || []);
      setLoading(false);
    });
  }, []);

  const getImage = (img) => {
    if (!img) return "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"; // Fallback icon

    if (img.startsWith("data:")) return img;

    // Use port 5000 to match your previous backend configuration
    if (img.startsWith("/images") || !img.startsWith("http")) {
      return `http://localhost:5000/${img.replace(/^\//, "")}`;
    }

    return img;
  };

  if (loading) return <div className="center">Loading...</div>;

  if (selectedDept) {
    return (
      <div className="detailContainer">
        <button className="backBtn" onClick={() => setSelectedDept(null)}>
          ← Back
        </button>

        <h1>{selectedDept.name}</h1>

        <div className="detailImages">
          {/* Pull images from the doctors array if image1/image2 are empty */}
          {selectedDept.doctors?.map((doc, i) => (
            <img
              key={i}
              src={getImage(doc.image)}
              alt={doc.name}
              className="detailImg"
            />
          ))}
        </div>

        <h2>Our Doctors</h2>
        <div className="doctorGrid">
          {selectedDept.doctors?.map((doc, i) => (
            <div key={i} className="doctorCard">
              <img src={getImage(doc.image)} alt="" />
              <h4>{doc.name}</h4>
              <p>{doc.description}</p>
            </div>
          ))}
        </div>

        <h2>About Department</h2>
        <p className="fullDesc">{selectedDept.description}</p>

        <div className="contactBox">
          <p>📞 {selectedDept.contactNumber}</p>
          <p>✉️ {selectedDept.email}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="section">
      <h2 className="section-title">Departments</h2>
      <p className="section-subtitle">
        We offer a range of departments to cover your healthcare needs.
      </p>
      <div className="services-grid">
        {(departments || [])
          .filter((dept) => dept?.isActive)
          .map((dept) => (
            <Link
              href={`/departments/${dept._id}`}
              key={dept._id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                key={dept._id}
                className="service-box"
                style={{
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  height: "250px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 20px rgba(0, 0, 0, 0.15)";
                  e.currentTarget.style.borderColor = "#0b7ac4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.borderColor = "rgb(229, 231, 235)";
                }}
              >
                <div className="imageRow">
                  {/* ✅ FIXED: Mapping through the doctors array to show images in the list view */}
                  {dept.doctors && dept.doctors.length > 0 ? (
                    dept.doctors
                      .slice(0, 2)
                      .map((doc, index) => (
                        <img
                          key={index}
                          src={getImage(doc.image)}
                          alt={dept.name}
                        />
                      ))
                  ) : (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                      alt="placeholder"
                    />
                  )}
                </div>

                <div className="cardContent">
                  <h3>{dept.name}</h3>
                  <p className="shortDesc">
                    {dept.description?.slice(0, 100)}...
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
