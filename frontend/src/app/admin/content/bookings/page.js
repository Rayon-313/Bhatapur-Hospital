"use client";

import { useState, useEffect } from "react";
import { getBookings, updateBookingStatus as updateBookingStatusAPI, deleteBooking as deleteBookingAPI } from '@/lib/api/healthPackages';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load bookings from the backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await updateBookingStatusAPI(bookingId, newStatus);
      setBookings(prev => prev.map(booking => 
        booking._id === bookingId ? { ...booking, status: newStatus } : booking
      ));
      alert(`Booking status updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating booking status:', err);
      alert('Error updating booking status');
    }
  };

  const deleteBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteBookingAPI(bookingId);
        setBookings(prev => prev.filter(booking => booking._id !== bookingId));
        alert('Booking deleted successfully');
      } catch (err) {
        console.error('Error deleting booking:', err);
        alert('Error deleting booking');
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
        <h2 style={{ color: '#1e40af' }}>Loading Bookings...</h2>
        <p>Loading booking requests...</p>
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
        <h2 style={{ color: '#dc2626' }}>Error Loading Bookings</h2>
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
      }}>Health Package Bookings</h2>

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
            All Booking Requests
          </h3>
          <span style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}>
            {bookings.length} Total
          </span>
        </div>

        {bookings.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#6b7280',
            fontSize: '1.2rem'
          }}>
            No booking requests found.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {bookings.map((booking) => (
              <div key={booking._id} style={{
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
                    booking.status === 'confirmed' ? '#10b981' : 
                    booking.status === 'completed' ? '#8b5cf6' : 
                    booking.status === 'cancelled' ? '#ef4444' : '#f59e0b',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{
                    fontSize: '1.3rem',
                    color: '#1e40af',
                    marginBottom: '0.5rem',
                    fontWeight: '600'
                  }}>{booking.packageName}</h4>
                  <p style={{
                    margin: '0.25rem 0',
                    color: '#4b5563',
                    fontWeight: '500'
                  }}>Name: {booking.fullName}</p>
                  <p style={{
                    margin: '0.25rem 0',
                    color: '#4b5563'
                  }}>Phone: {booking.phone}</p>
                  <p style={{
                    margin: '0.25rem 0',
                    color: '#4b5563'
                  }}>Email: {booking.email}</p>
                  <p style={{
                    margin: '0.25rem 0',
                    color: '#4b5563'
                  }}>Preferred Date: {new Date(booking.preferredDate).toLocaleDateString()}</p>
                  {booking.notes && (
                    <p style={{
                      margin: '0.25rem 0',
                      color: '#4b5563',
                      fontStyle: 'italic'
                    }}>Notes: {booking.notes}</p>
                  )}
                  <p style={{
                    margin: '0.25rem 0',
                    color: '#9ca3af',
                    fontSize: '0.9rem'
                  }}>Booked on: {new Date(booking.createdAt).toLocaleString()}</p>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  <select
                    value={booking.status}
                    onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
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
                    onClick={() => deleteBooking(booking._id)}
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