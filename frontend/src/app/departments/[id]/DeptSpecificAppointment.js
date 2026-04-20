"use client";
import { useState } from 'react';

export default function DeptSpecificAppointment({ departmentName }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    department: departmentName, // Hardcoded from the page
    preferredDate: '',
    problemDescription: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      // We use the standard /appointments endpoint 
      // which your Admin Page is currently fetching from
// Temporarily replace the process.env line with this:
const response = await fetch(`http://localhost:4000/api/appointments`, { 
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});

      if (response.ok) {
        setStatus({ type: 'success', msg: 'Appointment booked! Check Admin panel.' });
        // Clear form
        setFormData({ ...formData, fullName: '', phone: '', email: '', preferredDate: '', problemDescription: '' });
      } else {
        throw new Error('Failed to book');
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Connection error. Is the backend running?' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
      <h3 style={{ color: '#1e40af', marginBottom: '0.5rem' }}>Book {departmentName} Appointment</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>This request will be sent directly to the hospital admin.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input 
          style={styles.input} type="text" placeholder="Full Name" required 
          value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} 
        />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            style={styles.input} type="tel" placeholder="Phone" required 
            value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} 
          />
          <input 
            style={styles.input} type="email" placeholder="Email" required 
            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
          />
        </div>
        
        {/* Fixed Department Label */}
        <div style={{ padding: '0.75rem', background: '#f1f5f9', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 'bold' }}>
           Selected Department: {departmentName}
        </div>

        <input 
          style={styles.input} type="date" required 
          value={formData.preferredDate} onChange={e => setFormData({...formData, preferredDate: e.target.value})} 
        />
        <textarea 
          style={styles.input} placeholder="Describe your problem..." rows="3"
          value={formData.problemDescription} onChange={e => setFormData({...formData, problemDescription: e.target.value})} 
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Sending...' : 'Confirm Booking'}
        </button>

        {status.msg && (
          <p style={{ textAlign: 'center', color: status.type === 'success' ? '#10b981' : '#ef4444' }}>
            {status.msg}
          </p>
        )}
      </form>
    </div>
  );
}

const styles = {
  input: { padding: '0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100%', outline: 'none' },
  button: { padding: '1rem', background: '#1e40af', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }
};