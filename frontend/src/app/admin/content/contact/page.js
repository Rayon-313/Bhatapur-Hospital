"use client";

import { useState, useEffect } from "react";
import AppointmentSection from "@/components/home/AppointmentSection";

export default function EditContactPage() {
  const [contactInfo, setContactInfo] = useState({
    phone: "+977-1-XXXX-XXXX",
    address: "Bhaktapur International Hospital, Street Name, Bhaktapur",
    email: "info@bihospital.com.np"
  });

  const [feedbacks, setFeedbacks] = useState([]);

  // Load contact info from backend on mount
  useEffect(() => {
    const loadContactInfo = async () => {
      // In a real implementation, you would fetch from your backend API
      // For now, using default values
    };
    loadContactInfo();
  }, []);

  const handleSave = async () => {
    // In a real implementation, you would save to your backend API
    alert("Contact information saved successfully!");
  };

  const handleInputChange = (field, value) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
      }}>Edit Contact Page</h2>

      {/* Contact Information Section */}
      <div className="card" style={{ 
        marginBottom: "3rem",
        padding: '2rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: '15px',
        border: '1px solid #d1d5db',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{
          fontSize: '1.8rem',
          color: '#1e40af',
          marginBottom: '1.5rem',
          fontWeight: '600',
          borderBottom: '3px solid #0b7ac4',
          paddingBottom: '0.5rem'
        }}>Contact Information</h3>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "2rem",
          padding: "2rem",
          backgroundColor: "white",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "1.5rem", 
            padding: "1.5rem",
            backgroundColor: "#f9fafb",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer"
          }} onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-3px)";
            e.target.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.1)";
          }} onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.05)";
          }}>
            <div style={{ 
              fontSize: "2.5rem", 
              color: "#0b7ac4",
              minWidth: "3rem",
              textAlign: "center"
            }}>
              📞
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ 
                display: "block", 
                fontWeight: "bold", 
                marginBottom: "0.5rem",
                color: '#1e40af',
                fontSize: '1.1rem'
              }}>Phone Number</label>
              <input
                type="text"
                value={contactInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                style={{ 
                  width: "100%", 
                  padding: "0.8rem", 
                  borderRadius: "8px", 
                  border: "2px solid #e5e7eb",
                  fontSize: "1rem",
                  transition: "border-color 0.3s ease",
                  backgroundColor: "#ffffff"
                }}
                onFocus={(e) => e.target.style.borderColor = '#0b7ac4'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>

          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "1.5rem", 
            padding: "1.5rem",
            backgroundColor: "#f9fafb",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer"
          }} onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-3px)";
            e.target.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.1)";
          }} onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.05)";
          }}>
            <div style={{ 
              fontSize: "2.5rem", 
              color: "#0b7ac4",
              minWidth: "3rem",
              textAlign: "center"
            }}>
              📍
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ 
                display: "block", 
                fontWeight: "bold", 
                marginBottom: "0.5rem",
                color: '#1e40af',
                fontSize: '1.1rem'
              }}>Address</label>
              <input
                type="text"
                value={contactInfo.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                style={{ 
                  width: "100%", 
                  padding: "0.8rem", 
                  borderRadius: "8px", 
                  border: "2px solid #e5e7eb",
                  fontSize: "1rem",
                  transition: "border-color 0.3s ease",
                  backgroundColor: "#ffffff"
                }}
                onFocus={(e) => e.target.style.borderColor = '#0b7ac4'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>

          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "1.5rem", 
            padding: "1.5rem",
            backgroundColor: "#f9fafb",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer"
          }} onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-3px)";
            e.target.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.1)";
          }} onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.05)";
          }}>
            <div style={{ 
              fontSize: "2.5rem", 
              color: "#0b7ac4",
              minWidth: "3rem",
              textAlign: "center"
            }}>
              ✉️
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ 
                display: "block", 
                fontWeight: "bold", 
                marginBottom: "0.5rem",
                color: '#1e40af',
                fontSize: '1.1rem'
              }}>Email</label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                style={{ 
                  width: "100%", 
                  padding: "0.8rem", 
                  borderRadius: "8px", 
                  border: "2px solid #e5e7eb",
                  fontSize: "1rem",
                  transition: "border-color 0.3s ease",
                  backgroundColor: "#ffffff"
                }}
                onFocus={(e) => e.target.style.borderColor = '#0b7ac4'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Form Section */}
      <div className="card" style={{ 
        marginBottom: "3rem",
        padding: '2rem',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)',
        borderRadius: '15px',
        border: '1px solid #d1d5db',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{
          fontSize: '1.8rem',
          color: '#1e40af',
          marginBottom: '1.5rem',
          fontWeight: '600',
          borderBottom: '3px solid #0b7ac4',
          paddingBottom: '0.5rem'
        }}>Appointment Form</h3>
        <div style={{ 
          padding: "2rem", 
          backgroundColor: "white", 
          borderRadius: "12px",
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)'
        }}>
          <AppointmentSection />
        </div>
      </div>

      {/* Map Section */}
      <div className="card" style={{ 
        marginBottom: "3rem",
        padding: '2rem',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        borderRadius: '15px',
        border: '1px solid #d1d5db',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{
          fontSize: '1.8rem',
          color: '#166534',
          marginBottom: '1.5rem',
          fontWeight: '600',
          borderBottom: '3px solid #16a34a',
          paddingBottom: '0.5rem'
        }}>Location Map</h3>
        <div style={{ 
          height: "500px", 
          borderRadius: "12px", 
          overflow: "hidden", 
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)", 
          border: "1px solid #e2e8f0"
        }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1766.6864772580295!2d85.3654504362405!3d27.67486566437954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1b3eb720aa73%3A0xbd155722b5862ea1!2sBhaktapur%20International%20Hospital!5e0!3m2!1sne!2snp!4v1767370171204!5m2!1sne!2snp" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Bhaktapur International Hospital Location"
          />
        </div>
      </div>

      {/* Feedback Form Section */}
      <div className="card" style={{ 
        padding: '2rem',
        background: 'linear-gradient(135deg, #fef2f2 0%, #ffe4e6 100%)',
        borderRadius: '15px',
        border: '1px solid #d1d5db',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{
          fontSize: '1.8rem',
          color: '#b91c1c',
          marginBottom: '1.5rem',
          fontWeight: '600',
          borderBottom: '3px solid #dc2626',
          paddingBottom: '0.5rem'
        }}>Feedback Form</h3>
        <div style={{ 
          padding: "2rem", 
          backgroundColor: "white", 
          borderRadius: "12px",
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)'
        }}>
          <form style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: '#b91c1c',
                fontSize: '1.1rem'
              }}>Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                style={{ 
                  width: '100%', 
                  padding: '0.8rem', 
                  borderRadius: '8px', 
                  border: '2px solid #f3f4f6', 
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  backgroundColor: '#ffffff'
                }}
                onFocus={(e) => e.target.style.borderColor = '#b91c1c'}
                onBlur={(e) => e.target.style.borderColor = '#f3f4f6'}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: '#b91c1c',
                fontSize: '1.1rem'
              }}>Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{ 
                  width: '100%', 
                  padding: '0.8rem', 
                  borderRadius: '8px', 
                  border: '2px solid #f3f4f6', 
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  backgroundColor: '#ffffff'
                }}
                onFocus={(e) => e.target.style.borderColor = '#b91c1c'}
                onBlur={(e) => e.target.style.borderColor = '#f3f4f6'}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: '#b91c1c',
                fontSize: '1.1rem'
              }}>Subject</label>
              <input 
                type="text" 
                placeholder="Enter subject" 
                style={{ 
                  width: '100%', 
                  padding: '0.8rem', 
                  borderRadius: '8px', 
                  border: '2px solid #f3f4f6', 
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  backgroundColor: '#ffffff'
                }}
                onFocus={(e) => e.target.style.borderColor = '#b91c1c'}
                onBlur={(e) => e.target.style.borderColor = '#f3f4f6'}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: '#b91c1c',
                fontSize: '1.1rem'
              }}>Feedback Message</label>
              <textarea 
                placeholder="Share your feedback with us" 
                rows={5}
                style={{ 
                  width: '100%', 
                  padding: '0.8rem', 
                  borderRadius: '8px', 
                  border: '2px solid #f3f4f6', 
                  fontSize: '1rem', 
                  resize: 'vertical',
                  transition: 'border-color 0.3s ease',
                  backgroundColor: '#ffffff'
                }}
                onFocus={(e) => e.target.style.borderColor = '#b91c1c'}
                onBlur={(e) => e.target.style.borderColor = '#f3f4f6'}
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              style={{ 
                backgroundColor: '#b91c1c', 
                color: 'white', 
                padding: '1rem 2rem', 
                borderRadius: '8px', 
                border: 'none', 
                fontSize: '1.1rem', 
                fontWeight: 'bold', 
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
                width: '100%',
                marginTop: '1rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#991b1b';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#b91c1c';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-md" style={{ 
        textAlign: 'center',
        marginTop: '3rem'
      }}>
        <button 
          onClick={handleSave} 
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '10px',
            border: 'none',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#059669';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#10b981';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}