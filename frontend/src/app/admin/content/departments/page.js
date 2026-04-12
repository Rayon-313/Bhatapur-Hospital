"use client";
import { useState, useEffect } from "react";
import { getDepartments, updateDepartment as updateDepartmentAPI } from '@/lib/api/departments';

export default function AdminDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for Editing
  const [editingId, setEditingId] = useState(null); 
  const [editForm, setEditForm] = useState({ name: "", description: "", image: "", headDoctor: "" });

  useEffect(() => {
    loadDepts();
  }, []);

  const loadDepts = async () => {
    try {
      setLoading(true);
      const data = await getDepartments();
      if (Array.isArray(data)) setDepartments(data);
    } catch (err) {
      console.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (dept) => {
    setEditingId(dept._id);
    setEditForm({ 
      name: dept.name, 
      description: dept.description, 
      image: dept.image || "", 
      headDoctor: dept.headDoctor || "" 
    });
  };

  const handleSave = async (id) => {
    try {
      await updateDepartmentAPI(id, editForm);
      setEditingId(null);
      loadDepts(); 
      alert("Changes saved successfully!");
    } catch (err) {
      alert("Error saving changes.");
    }
  };

  if (loading) return <div style={styles.centerText}><h2>Loading Admin Panel...</h2></div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Department Administration</h1>
      
      <div style={styles.grid}>
        {departments.map((dept) => (
          <div key={dept._id} style={styles.card}>
            
            {editingId === dept._id ? (
              /* --- EDIT MODE --- */
              <div style={styles.formGroup}>
                <h3 style={{ marginBottom: '10px' }}>Edit Details</h3>
                <input style={styles.input} value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} placeholder="Department Name" />
                <input style={styles.input} value={editForm.image} onChange={e => setEditForm({...editForm, image: e.target.value})} placeholder="Image URL (https://...)" />
                <input style={styles.input} value={editForm.headDoctor} onChange={e => setEditForm({...editForm, headDoctor: e.target.value})} placeholder="Head Doctor" />
                <textarea style={{...styles.input, height: '80px'}} value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} placeholder="Description" />

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleSave(dept._id)} style={styles.saveBtn}>Save</button>
                  <button onClick={() => setEditingId(null)} style={styles.cancelBtn}>Cancel</button>
                </div>
              </div>
            ) : (
              /* --- VIEW MODE --- */
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <img 
                  src={dept.image || 'https://via.placeholder.com/300x150?text=No+Image+Found'} 
                  alt={dept.name}
                  style={styles.image}
                />
                <h2 style={styles.deptName}>{dept.name}</h2>
                <p><strong>Head:</strong> {dept.headDoctor || 'Not Assigned'}</p>
                <p style={styles.descriptionText}>{dept.description}</p>
                
                <div style={{ marginTop: 'auto' }}>
                  <button onClick={() => handleEditClick(dept)} style={styles.editBtn}>
                    Edit Details
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' },
  title: { textAlign: 'center', color: '#1e40af', marginBottom: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' },
  card: { border: '1px solid #ddd', borderRadius: '12px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  image: { width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' },
  deptName: { color: '#1e40af', margin: '0 0 10px 0' },
  descriptionText: { fontSize: '0.9rem', color: '#666', marginBottom: '15px', lineHeight: '1.4' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '10px', width: '100%', boxSizing: 'border-box' },
  saveBtn: { flex: 1, padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  cancelBtn: { flex: 1, padding: '10px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  editBtn: { width: '100%', padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  centerText: { textAlign: 'center', padding: '100px' }
};