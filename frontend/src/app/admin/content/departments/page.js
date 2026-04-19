"use client";
import { useState, useEffect } from "react";
import {
  getDepartments,
  createDepartment,
  deleteDepartment,
} from "@/lib/api/departments";

import "./page.css";

export default function AdminDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const emptyDept = {
    _id: null,
    name: "",
    description: "",
    contactNumber: "",
    email: "",
    doctors: [],
  };

  const [formDept, setFormDept] = useState(emptyDept);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED IMAGE HANDLER (size check + safe base64)
  const handleImage = (file, callback) => {
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  const addDoctor = () => {
    setFormDept({
      ...formDept,
      doctors: [...formDept.doctors, { name: "", image: "", description: "" }],
    });
  };

  const removeDoctor = (index) => {
    const updated = formDept.doctors.filter((_, i) => i !== index);
    setFormDept({ ...formDept, doctors: updated });
  };

  const updateDoctor = (index, field, value) => {
    const updated = [...formDept.doctors];
    updated[index][field] = value;
    setFormDept({ ...formDept, doctors: updated });
  };

  const handleSubmit = async () => {
    if (!formDept.name) return alert("Department name required!");
    try {
      await createDepartment(formDept);
      setFormDept(emptyDept);
      setIsEditing(false);
      loadDepartments();
    } catch {
      alert("Error saving department");
    }
  };

  // ✅ FIXED EDIT (keeps image intact)
  const handleEdit = (dept) => {
    setFormDept({
      ...dept,
      doctors:
        dept.doctors?.map((d) => ({
          ...d,
          image: d.image || "",
        })) || [],
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this department?")) return;
    try {
      await deleteDepartment(id);
      loadDepartments();
    } catch {
      alert("Error deleting");
    }
  };

  if (loading) return <div className="center">Loading...</div>;

  return (
    <div className="container">
      <h1 className="title">Department Admin Panel</h1>

      {/* --- FORM SECTION --- */}
      <div className="formCard">
        <h2>{isEditing ? "Edit Department" : "Add Department"}</h2>

        <input
          placeholder="Department Name"
          value={formDept.name}
          onChange={(e) => setFormDept({ ...formDept, name: e.target.value })}
        />
        <input
          placeholder="Contact Number"
          value={formDept.contactNumber}
          onChange={(e) =>
            setFormDept({ ...formDept, contactNumber: e.target.value })
          }
        />
        <input
          placeholder="Email"
          value={formDept.email}
          onChange={(e) => setFormDept({ ...formDept, email: e.target.value })}
        />
        <textarea
          placeholder="Department Description"
          value={formDept.description}
          onChange={(e) =>
            setFormDept({ ...formDept, description: e.target.value })
          }
        />

        <h3>Doctors</h3>

        {formDept.doctors.map((doc, index) => (
          <div key={index} className="doctorForm">
            <div className="imageInputGroup">
              <img
                src={
                  doc.image
                    ? doc.image.startsWith("data:")
                      ? doc.image // base64 preview
                      : `http://localhost:5000/${doc.image}` // backend path
                    : "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                }
                className="doctorImg"
                alt="Preview"
              />

              <input
                type="file"
                onChange={(e) =>
                  handleImage(e.target.files[0], (img) =>
                    updateDoctor(index, "image", img),
                  )
                }
              />
            </div>

            <input
              placeholder="Doctor Name"
              value={doc.name}
              onChange={(e) => updateDoctor(index, "name", e.target.value)}
            />

            <textarea
              placeholder="Doctor Description"
              value={doc.description}
              onChange={(e) =>
                updateDoctor(index, "description", e.target.value)
              }
            />

            <button className="deleteBtn" onClick={() => removeDoctor(index)}>
              Remove Doctor
            </button>
          </div>
        ))}

        <div className="btnRow">
          <button className="secondaryBtn" onClick={addDoctor}>
            + Add Doctor
          </button>
          <button className="primaryBtn" onClick={handleSubmit}>
            {isEditing ? "Update Department" : "Create Department"}
          </button>
        </div>
      </div>

      {/* --- DISPLAY LIST --- */}
      <div className="grid">
        {departments.map((d) => (
          <div key={d._id} className="card">
            <div className="cardHeader">
              <h3>{d.name}</h3>
              <p className="desc">{d.description}</p>
            </div>

            {/* ✅ IMAGE SHOWS HERE */}
            {d.doctors?.length > 0 && (
              <div className="doctorSection">
                {d.doctors.map((doc, i) => (
                  <div key={i} className="doctor">
                    <img
                      src={
                        doc.image
                          ? doc.image.startsWith("data:")
                            ? doc.image
                            : `http://localhost:5000/${doc.image}`
                          : "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                      }
                      alt={doc.name}
                      className="doctorImg"
                    />

                    <div className="doctorInfo">
                      <strong>{doc.name}</strong>
                      <p>{doc.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="cardMeta">
              <p>
                <b>Contact:</b> {d.contactNumber}
              </p>
              <p>
                <b>Email:</b> {d.email}
              </p>
            </div>

            <div className="btnRow">
              <button className="editBtn" onClick={() => handleEdit(d)}>
                Edit
              </button>
              <button className="deleteBtn" onClick={() => handleDelete(d._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
