"use client";

import { useState, useEffect } from 'react';
import { getHealthPackages, bookHealthPackage } from '@/lib/api/healthPackages';

export default function HealthPackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getHealthPackages();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching health packages:', error);
        // Fallback to default packages if API fails
        setPackages([
          {
            _id: 1,
            name: "Basic Health Checkup",
            description: "Includes essential blood tests, vitals check, and physician consultation.",
            price: "Rs. 2,500",
            features: [
              "Complete Blood Count",
              "Blood Pressure Check",
              "Basic Metabolic Panel",
              "General Physician Consultation"
            ]
          },
          {
            _id: 2,
            name: "Cardiac Screening Package",
            description: "ECG, lipid profile, cardiac evaluation, and cardiologist consultation.",
            price: "Rs. 8,500",
            features: [
              "ECG Test",
              "Lipid Profile",
              "Cardiac Enzymes",
              "Cardiologist Consultation"
            ]
          },
          {
            _id: 3,
            name: "Diabetes Care Package",
            description: "Blood sugar profile, HbA1c, diet counseling, and specialist review.",
            price: "Rs. 5,200",
            features: [
              "Blood Sugar Profile",
              "HbA1c Test",
              "Dietitian Consultation",
              "Endocrinologist Review"
            ]
          },
          {
            _id: 4,
            name: "Senior Citizen Package",
            description: "Comprehensive health screening tailored for senior citizens.",
            price: "Rs. 12,000",
            features: [
              "Complete Health Checkup",
              "Bone Density Scan",
              "Vision & Hearing Tests",
              "Geriatrician Consultation"
            ]
          },
          {
            _id: 5,
            name: "Women's Health Package",
            description: "Specialized screening for women's health needs.",
            price: "Rs. 9,800",
            features: [
              "Mammography",
              "Pap Smear",
              "Hormone Profile",
              "Gynecologist Consultation"
            ]
          },
          {
            _id: 6,
            name: "Executive Health Package",
            description: "Premium comprehensive health screening with advanced diagnostics.",
            price: "Rs. 25,000",
            features: [
              "Full Body MRI",
              "Advanced Cardiac Screening",
              "Cancer Markers",
              "Specialist Consultations"
            ]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPackages();
  }, []);
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)',
      padding: '2rem 1rem',
      width: '100%',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        maxWidth: '100%',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          padding: '2rem 0',
          background: 'var(--primary-color)',
          borderRadius: '15px',
          color: 'white',
          boxShadow: '0 5px 15px rgba(11, 122, 196, 0.3)'
        }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '700', 
            marginBottom: '0.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>Health Packages</h1>
          <p style={{
            fontSize: '1.3rem', 
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0.5rem auto 0'
          }}>
            Choose from our preventive health packages designed to keep you and your family healthy.
          </p>
        </div>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
          gap: "2rem",
          marginBottom: '2rem'
        }}>
          {packages.map((pkg, index) => (
            <article
              key={pkg.name}
              style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '2rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-10px)';
                e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Package Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: index === 0 ? '#10b981' : index === 1 ? '#f59e0b' : '#8b5cf6',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                zIndex: 1
              }}>
                Popular
              </div>
              
              <div style={{
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: '#1e40af',
                  marginBottom: '0.5rem',
                  fontWeight: '700'
                }}>{pkg.name}</h3>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#0b7ac4',
                  marginBottom: '1rem'
                }}>{pkg.price}</div>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>{pkg.description}</p>
              </div>
              
              <div style={{
                marginBottom: '1.5rem'
              }}>
                <h4 style={{
                  fontSize: '1.2rem',
                  color: '#1e40af',
                  marginBottom: '1rem',
                  fontWeight: '600',
                  borderBottom: '2px solid #e2e8f0',
                  paddingBottom: '0.5rem'
                }}>Package Includes:</h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0
                }}>
                  {pkg.features.map((feature, idx) => (
                    <li 
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '0.75rem',
                        color: '#4b5563'
                      }}
                    >
                      <span style={{
                        color: '#10b981',
                        marginRight: '0.5rem',
                        fontSize: '1.2rem'
                      }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button
                onClick={() => {
                  // Store package info in state to show in modal
                  setSelectedPackage(pkg);
                  setShowBookingModal(true);
                }}
                style={{
                  width: '100%',
                  backgroundColor: '#0b7ac4',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  marginTop: '1rem'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#09609d'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#0b7ac4'}
              >
                Book Package
              </button>
            </article>
          ))}
        </div>
      </div>
      
      {/* Booking Modal */}
      {showBookingModal && selectedPackage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '30%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }} onClick={() => setShowBookingModal(false)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '2rem',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                fontSize: '1.8rem',
                color: '#1e40af',
                fontWeight: '700',
                margin: 0
              }}>Book {selectedPackage.name}</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              backgroundColor: '#f8fafc',
              borderRadius: '10px'
            }}>
              <p style={{
                margin: '0 0 0.5rem 0',
                fontWeight: '600',
                color: '#1e40af'
              }}>Package Details:</p>
              <p style={{
                margin: '0 0 0.5rem 0',
                color: '#4b5563'
              }}>{selectedPackage.description}</p>
              <p style={{
                margin: '0',
                fontWeight: 'bold',
                color: '#0b7ac4',
                fontSize: '1.2rem'
              }}>{selectedPackage.price}</p>
            </div>
            
            <div style={{
              marginBottom: '1.5rem'
            }}>
              <h4 style={{
                fontSize: '1.2rem',
                color: '#1e40af',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>Package Includes:</h4>
              <ul style={{
                listStyle: 'none',
                padding: 0
              }}>
                {selectedPackage.features.map((feature, idx) => (
                  <li 
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.5rem',
                      color: '#4b5563'
                    }}
                  >
                    <span style={{
                      color: '#10b981',
                      marginRight: '0.5rem',
                      fontSize: '1.2rem'
                    }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              
              // Get form data
              const formData = new FormData(e.target);
              const bookingData = {
                packageName: selectedPackage.name,
                fullName: formData.get('fullName'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                preferredDate: formData.get('preferredDate'),
                notes: formData.get('notes')
              };
              
              try {
                await bookHealthPackage(bookingData);
                alert(`Thank you for booking the ${selectedPackage.name}! We have received your booking request and will contact you shortly to confirm your appointment.`);
                setShowBookingModal(false);
                e.target.reset(); // Reset the form
              } catch (error) {
                console.error('Error booking package:', error);
                alert('There was an error processing your booking. Please try again.');
              }
            }} style={{
              display: 'grid',
              gap: '1rem'
            }}>
              <input type="hidden" name="packageName" value={selectedPackage?.name || ''} />
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: '#1e40af'
                }}>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    backgroundColor: '#ffffff'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0b7ac4'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: '#1e40af'
                }}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    backgroundColor: '#ffffff'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0b7ac4'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: '#1e40af'
                }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    backgroundColor: '#ffffff'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0b7ac4'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: '#1e40af'
                }}>Preferred Date</label>
                <input
                  type="date"
                  name="preferredDate"
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    backgroundColor: '#ffffff'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0b7ac4'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: '#1e40af'
                }}>Additional Notes</label>
                <textarea
                  name="notes"
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    fontSize: '1rem',
                    resize: 'vertical',
                    transition: 'border-color 0.3s ease',
                    backgroundColor: '#ffffff'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0b7ac4'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  placeholder="Any special requirements or notes"
                ></textarea>
              </div>
              
              <button
                type="submit"
                style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  marginTop: '1rem'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
