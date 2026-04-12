"use client";

import { useState, useEffect } from "react";
import { getAppointments, updateAppointmentStatus as updateAppointmentStatusAPI, deleteAppointment as deleteAppointmentAPI } from '@/lib/api/healthPackages';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load appointments from the backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      await updateAppointmentStatusAPI(appointmentId, newStatus);
      setAppointments(prev => prev.map(appointment => 
        appointment._id === appointmentId ? { ...appointment, status: newStatus } : appointment
      ));
      alert(`Appointment status updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating appointment status:', err);
      alert('Error updating appointment status');
    }
  };

  const deleteAppointment = async (appointmentId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await deleteAppointmentAPI(appointmentId);
        setAppointments(prev => prev.filter(appointment => appointment._id !== appointmentId));
        alert('Appointment deleted successfully');
      } catch (err) {
        console.error('Error deleting appointment:', err);
        alert('Error deleting appointment');
      }
    }
  };

  if (loading) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        <h2 style={{ color: '#1e40af' }}>Loading Appointments...</h2>
        <p>Loading appointment requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        <h2 style={{ color: '#dc2626' }}>Error Loading Appointments</h2>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '2rem',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        color: '#1e40af',
        marginBottom: '2rem',
        textAlign: 'center',
        fontWeight: '700',
        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>Appointment Requests</h2>

      <div style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: '15px',
        border: '1px solid #d1d5db',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '1.8rem',
            color: '#1e40af',
            margin: 0,
            fontWeight: '600',
            borderBottom: '3px solid #0b7ac4',
            paddingBottom: '0.5rem'
          }}>
            All Appointment Requests
          </h3>
          <span style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}>
            {appointments.length} Total
          </span>
        </div>

        {appointments.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#6b7280',
            fontSize: '1.2rem'
          }}>
            No appointment requests found.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {appointments.map((appointment) => (
              <div key={appointment._id} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                position: 'relative'
              }}>
                {/* Status Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: 
                    appointment.status === 'confirmed' ? '#10b981' : 
                    appointment.status === 'completed' ? '#8b5cf6' : 
                    appointment.status === 'cancelled' ? '#ef4444' : '#f59e0b',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{
                    fontSize: '1.3rem',
                    color: '#1e40af',
                    marginBottom: '0.5rem',
                    fontWeight: '600'
                  }}>Appointment Request</h4>
                  <p style={{
                    margin: '0.25rem 0',
                    color: '#4b5563',
                    fontWeight: '500'
                  }}>Name: {appointment.fullName}</p>
                  <p style={{
                    margin: '0.25rem 0',
                    color: '#4b5563'
                  }}>Phone: {appointment.phone}</p>
                  <p style={{
                    margin: '0.25rem 0',
                    color: '#4b5563'
                  }}>Email: {appointment.email}</p>
                  <p style={{
                    margin: '0.25rem 0',
                    color: '#4b5563'
                  }}>Department: {appointment.department}</p>
                  <p style={{
                    margin: '0.25rem 0',
                    color: '#4b5563'
                  }}>Preferred Date: {new Date(appointment.preferredDate).toLocaleDateString()}</p>
                  {appointment.problemDescription && (
                    <p style={{
                      margin: '0.25rem 0',
                      color: '#4b5563',
                      fontStyle: 'italic'
                    }}>Description: {appointment.problemDescription}</p>
                  )}
                  <p style={{
                    margin: '0.25rem 0',
                    color: '#9ca3af',
                    fontSize: '0.9rem'
                  }}>Booked on: {new Date(appointment.createdAt).toLocaleString()}</p>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  <select
                    value={appointment.status}
                    onChange={(e) => updateAppointmentStatus(appointment._id, e.target.value)}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '0.9rem',
                      flex: 1,
                      minWidth: '120px'
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => deleteAppointment(appointment._id)}
                    style={{
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}