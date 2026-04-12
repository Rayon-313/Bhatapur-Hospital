"use client";

import { useState, useEffect } from "react";
// I am using the @/ prefix which matches your jsconfig.json
import { 
  getDepartments, 
  updateDepartment as updateDepartmentAPI, 
  deleteDepartment as deleteDepartmentAPI 
} from '@/lib/api/departments';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const data = await getDepartments();
        
        // Safety: If data is null or not an array, use an empty list instead of crashing
        if (data && Array.isArray(data)) {
          setDepartments(data);
        } else {
          setDepartments([]);
        }
        setError(null);
      } catch (err) {
        console.error('Fetch failed:', err);
        setError("Backend Connection Failed. Is your server running on Port 4000?");
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  // 1. LOADING STATE - Prevents the "Vanish" act
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '5rem' }}><h2>Loading Departments...</h2></div>;
  }

  // 2. ERROR STATE - Instead of a blank screen, it tells you WHY it's failing
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem', color: '#ef4444' }}>
        <h2>{error}</h2>
        <button 
          onClick={() => window.location.reload()} 
          style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  // 3. MAIN CONTENT - Only runs if loading is false and error is null
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Hospital Departments</h2>
      <p style={{ textAlign: 'center' }}>Manage your hospital departments here.</p>

      <div style={styles.statsRow}>
        <span style={styles.badge}>{departments.length} Total Departments</span>
      </div>

      <div style={styles.grid}>
        {departments.length === 0 ? (
          <p style={{ textAlign: 'center', width: '100%' }}>No departments found in the database.</p>
        ) : (
          departments.map((dept) => (
            <div key={dept._id || Math.random()} style={styles.card}>
              <div style={{
                ...styles.statusDot,
                backgroundColor: dept.isActive ? '#10b981' : '#ef4444'
              }}>
                {dept.isActive ? 'Active' : 'Inactive'}
              </div>
              <div style={{ position: 'relative' }}>
                <img 
                  src={dept.image || 'https://via.placeholder.com/300x150?text=No+Image+Found'} 
                  alt={dept.name}
                  style={{ width: '89%', height: '160px', objectFit: 'cover', borderRadius: '5px', marginBottom: '15px' }}
                />
                </div>
              <h3 style={styles.deptName}>{dept.name}</h3>
              <p><strong>HOD:</strong> {dept.headDoctor || 'N/A'}</p>
              <p style={styles.description}>{dept.description}</p>

              {/* Add your Toggle/Delete buttons here later if needed */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Ensure these styles are at the VERY BOTTOM of your file
const styles = {
  container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' },
  title: { textAlign: 'center', color: '#1e40af', fontSize: '2.5rem' },
  statsRow: { marginBottom: '1.5rem', textAlign: 'right' },
  badge: { backgroundColor: '#3b82f6', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
  card: { padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: 'white', position: 'relative', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  statusDot: { position: 'absolute', top: '1rem', right: '1rem', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '10px', fontSize: '0.75rem' },
  deptName: { color: '#1e40af', marginTop: '0' },
  description: { color: '#64748b', fontSize: '0.9rem', fontStyle: 'italic' },
};