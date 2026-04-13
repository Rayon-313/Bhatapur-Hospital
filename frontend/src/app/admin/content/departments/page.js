"use client";
import { useState, useEffect } from "react";
import { 
  getDepartments, 
  updateDepartment as updateDepartmentAPI, 
  createDepartment as createDepartmentAPI 
} from '@/lib/api/departments';

export default function AdminDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for Editing existing
  const [editingId, setEditingId] = useState(null); 
  const [editForm, setEditForm] = useState({ 
    name: "", description: "", image: "", headDoctor: "", contactNumber: "", email: "" 
  });

  // State for Adding new
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDept, setNewDept] = useState({ 
    name: "", description: "", image: "", headDoctor: "", contactNumber: "", email: "" 
  });

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

  // --- ADD NEW LOGIC ---
  const handleCreate = async () => {
    if (!newDept.name) return alert("Department name is required!");
    try {
      await createDepartmentAPI(newDept);
      setNewDept({ name: "", description: "", image: "", headDoctor: "", contactNumber: "", email: "" });
      setShowAddForm(false);
      loadDepts();
      alert("New department added!");
    } catch (err) {
      alert("Error adding department.");
    }
  };

  // --- EDIT LOGIC ---
  const handleEditClick = (dept) => {
    setEditingId(dept._id);
    setEditForm({
      name: dept.name,
      description: dept.description, 
      image: dept.image || "", 
      headDoctor: dept.headDoctor || "",
      contactNumber: dept.contactNumber || "",
      email: dept.email || ""
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

      {/* --- ADD NEW DEPARTMENT SECTION --- */}
      <div style={styles.addSection}>
        {!showAddForm ? (
          <button onClick={() => setShowAddForm(true)} style={styles.addNewBtn}>
            + Add New Department
          </button>
        ) : (
          <div style={styles.addForm}>
            <h3>Add New Department</h3>
            <div style={styles.formGrid}>
              <input style={styles.input} placeholder="Name" value={newDept.name} onChange={e => setNewDept({...newDept, name: e.target.value})} />
              <input style={styles.input} placeholder="Image URL" value={newDept.image} onChange={e => setNewDept({...newDept, image: e.target.value})} />
              <input style={styles.input} placeholder="Head Doctor" value={newDept.headDoctor} onChange={e => setNewDept({...newDept, headDoctor: e.target.value})} />
              <input style={styles.input} placeholder="Image URL" value={newDept.image} onChange={e => setNewDept({...newDept, image: e.target.value})} />
              <input style={styles.input} placeholder="Doctor" value={newDept.headDoctor} onChange={e => setNewDept({...newDept, headDoctor: e.target.value})} />
              <input style={styles.input} placeholder="Contact Number" value={newDept.contactNumber} onChange={e => setNewDept({...newDept, contactNumber: e.target.value})} />
              <input style={styles.input} placeholder="Email" value={newDept.email} onChange={e => setNewDept({...newDept, email: e.target.value})} />
              <textarea style={{...styles.input, gridColumn: 'span 2'}} placeholder="Description" value={newDept.description} onChange={e => setNewDept({...newDept, description: e.target.value})} />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={handleCreate} style={styles.saveBtn}>Create Department</button>
              <button onClick={() => setShowAddForm(false)} style={styles.cancelBtn}>Cancel</button>
            </div>
          </div>
        )}
      </div>
      
      {/* --- DEPARTMENT LIST --- */}
      <div style={styles.grid}>
        {departments.map((dept) => (
          <div key={dept._id} style={styles.card}>
            {editingId === dept._id ? (
              /* --- EDIT MODE --- */
              <div style={styles.formGroup}>
                <h3 style={{ marginBottom: '10px' }}>Edit Details</h3>
                <label style={styles.label}>Name</label>
                <input style={styles.input} value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                
                <label style={styles.label}>Image URL</label>
                <input style={styles.input} value={editForm.image} onChange={e => setEditForm({...editForm, image: e.target.value})} />

                <label style={styles.label}>Head Doctor</label>
                <input style={styles.input} value={editForm.headDoctor} onChange={e => setEditForm({...editForm, headDoctor: e.target.value})} />
                
                <label style={styles.label}>Image URL</label>
                <input style={styles.input} value={editForm.image} onChange={e => setEditForm({...editForm, image: e.target.value})} />
                
                <label style={styles.label}>Doctor</label>
                <input style={styles.input} value={editForm.headDoctor} onChange={e => setEditForm({...editForm, headDoctor: e.target.value})} />
                
                <label style={styles.label}>Contact Number</label>
                <input style={styles.input} value={editForm.contactNumber} onChange={e => setEditForm({...editForm, contactNumber: e.target.value})} />
                
                <label style={styles.label}>Email</label>
                <input style={styles.input} value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} />

                <label style={styles.label}>Description</label>
                <textarea style={{...styles.input, height: '80px'}} value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button onClick={() => handleSave(dept._id)} style={styles.saveBtn}>Save</button>
                  <button onClick={() => setEditingId(null)} style={styles.cancelBtn}>Cancel</button>
                </div>
              </div>
            ) : (
              /* --- VIEW MODE --- */
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <img src={dept.image || 'https://via.placeholder.com/300x150'} style={styles.image} alt="" />
                <img src={dept.image || 'https://via.placeholder.com/300x150'} style={styles.image} alt="" />
                <h2 style={styles.deptName}>{dept.name}</h2>
                <p><strong>Head:</strong> {dept.headDoctor || 'Not Assigned'}</p>
                <p><strong>Contact:</strong> {dept.contactNumber || 'N/A'}</p>
                <p><strong>Email:</strong> {dept.email || 'N/A'}</p>
                <p style={styles.descriptionText}>{dept.description}</p>
                <div style={{ marginTop: 'auto' }}>
                  <button onClick={() => handleEditClick(dept)} style={styles.editBtn}>Edit Details</button>
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
  title: { textAlign: 'center', color: '#1e40af', marginBottom: '1rem' },
  label: { fontSize: '0.8rem', fontWeight: 'bold', color: '#666', marginTop: '5px' },
  addSection: { marginBottom: '3rem', display: 'flex', justifyContent: 'center' },
  addForm: { background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '2px dashed #cbd5e1', width: '100%', maxWidth: '600px' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' },
  card: { border: '1px solid #ddd', borderRadius: '12px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  image: { width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' },
  deptName: { color: '#1e40af', margin: '0 0 10px 0' },
  descriptionText: { fontSize: '0.9rem', color: '#666', marginBottom: '15px' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box' },
  addNewBtn: { padding: '12px 24px', backgroundColor: '#1e40af', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  saveBtn: { flex: 1, padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  cancelBtn: { flex: 1, padding: '10px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  editBtn: { width: '100%', padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  centerText: { textAlign: 'center', padding: '100px' }
};