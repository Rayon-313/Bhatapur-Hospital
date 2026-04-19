"use client";

import { useState, useEffect } from "react";
import { getDepartments } from "@/lib/api/departments";
import "./page.css";

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
      <h2 className="title">Our Departments</h2>

      <div className="grid">
        {departments.map((dept) => (
          <div
            key={dept._id}
            className="card clickable"
            onClick={() => setSelectedDept(dept)}
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
              <p className="shortDesc">{dept.description?.slice(0, 100)}...</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
