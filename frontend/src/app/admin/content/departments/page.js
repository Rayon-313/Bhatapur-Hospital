"use client";

import React, { useState, useEffect } from 'react';

const BACKEND_URL = "http://localhost:4000"; 

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/departments`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setDepartments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading departments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>Loading Departments...</h2>
      </div>
    );
  }

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Medical Departments</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {departments.length > 0 ? (
          departments.map((dept) => (
            <div key={dept._id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', padding: '15px' }}>
              <h3 style={{ color: '#0070f3' }}>{dept.name}</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>{dept.description}</p>
              <button 
                onClick={() => window.location.href = `/admin/departments/edit/${dept._id}`}
                style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}
              >
                Edit Department
              </button>
            </div>
          ))
        ) : (
          <p>No departments found.</p>
        )}
      </div>
    </main>
  );
}