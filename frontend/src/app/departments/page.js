"use client";

import React, { useState, useEffect } from 'react';

const BACKEND_URL = "http://localhost:4000";

// Hardcoded List of Departments for "Beauty & Content"
const STATIC_DEPARTMENTS = [
  { _id: '1', name: 'Cardiology', description: 'Advanced heart care focusing on diagnosis and treatment of cardiovascular diseases.', icon: '❤️' },
  { _id: '2', name: 'Neurology', description: 'Expert care for brain and nervous system disorders using the latest medical imaging.', icon: '🧠' },
  { _id: '3', name: 'Dental Care', description: 'Comprehensive oral health services ranging from routine cleaning to oral surgery.', icon: '🦷' },
  { _id: '4', name: 'Orthopedics', description: 'Specialized treatment for bone, joint, and muscular injuries and chronic conditions.', icon: '🦴' },
  { _id: '5', name: 'Ophthalmology', description: 'Precise vision care and surgical solutions for eye-related medical issues.', icon: '👁️' },
  { _id: '6', name: 'Pediatrics', description: 'Compassionate medical care dedicated to the health and well-being of children.', icon: '🧸' }
];

function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(`${BACKEND_URL}/api/departments`);
        if (response.ok) {
          const data = await response.json();
          // Merge Backend data with our beautiful static icons if needed
          setDepartments(data.length > 0 ? data : STATIC_DEPARTMENTS);
        } else {
          setDepartments(STATIC_DEPARTMENTS);
        }
      } catch (err) {
        setDepartments(STATIC_DEPARTMENTS);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.title}>Bhaktapur International Hospital</h1>
        <p style={styles.subtitle}>Our Specialized Medical Departments</p>
        <div style={styles.underline}></div>
      </section>

      {/* Departments Grid */}
      <div style={styles.grid}>
        {departments.map((dept) => (
          <div key={dept._id} style={styles.card}>
            <div style={styles.iconBox}>
              {dept.icon || "🏥"}
            </div>
            <div style={styles.cardContent}>
              <h2 style={styles.cardTitle}>{dept.name}</h2>
              <p style={styles.cardText}>{dept.description}</p>
              <button style={styles.button}>
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Modern Professional Styles
const styles = {
  container: {
    backgroundColor: '#f4f7f6',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: '"Segoe UI", Roboto, sans-serif'
  },
  hero: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  title: {
    fontSize: '2.8rem',
    color: '#1a365d',
    margin: '0',
    fontWeight: '800'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#4a5568',
    marginTop: '10px'
  },
  underline: {
    width: '80px',
    height: '4px',
    backgroundColor: '#3182ce',
    margin: '20px auto',
    borderRadius: '2px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column'
  },
  iconBox: {
    height: '120px',
    background: 'linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '3rem'
  },
  cardContent: {
    padding: '24px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  cardTitle: {
    fontSize: '1.5rem',
    color: '#2d3748',
    marginBottom: '12px',
    fontWeight: '700'
  },
  cardText: {
    color: '#718096',
    lineHeight: '1.6',
    fontSize: '1rem',
    marginBottom: '20px',
    flexGrow: 1
  },
  button: {
    backgroundColor: '#3182ce',
    color: '#fff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s',
    width: '100%'
  }
};

export default DepartmentsPage;