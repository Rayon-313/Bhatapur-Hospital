"use client";

import AppointmentSection from "@/components/home/AppointmentSection";

export default function ContactUsPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)',
      padding: '2rem 1rem',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        maxWidth: '1200px',
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
          background: 'linear-gradient(135deg, #0b7ac4 0%, #1e40af 100%)',
          borderRadius: '15px',
          color: 'white',
          boxShadow: '0 5px 15px rgba(11, 122, 196, 0.3)'
        }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '700', 
            marginBottom: '0.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>Contact Us</h1>
          <p style={{ 
            fontSize: '1.3rem', 
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0.5rem auto 0'
          }}>
            Reach out to us for appointments, inquiries, or feedback.
          </p>
        </div>
        
        {/* Contact Information Section */}
        <section style={{
          marginBottom: '4rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          borderRadius: '15px',
          border: '1px solid #d1d5db'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.2rem',
            color: '#1e40af',
            marginBottom: '2.5rem',
            fontWeight: '600'
          }}>Get In Touch</h2>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
            gap: "1.5rem",
            margin: '0 auto'
          }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "1.5rem", 
              padding: "1.5rem",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e2e8f0",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer"
            }} onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-5px)";
              e.target.style.boxShadow = "0 12px 20px rgba(0, 0, 0, 0.15)";
            }} onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.1)";
            }}>
              <div style={{ 
                fontSize: "2.5rem", 
                color: "#0b7ac4",
                minWidth: "3rem",
                textAlign: "center"
              }}>
                📞
              </div>
              <div>
                <div style={{ 
                  fontWeight: "bold", 
                  marginBottom: "0.5rem", 
                  color: "#1e40af",
                  fontSize: "1.2rem"
                }}>Phone Number</div>
                <div style={{ fontSize: "1.1rem", color: "#374151" }}>+977-1-XXXX-XXXX</div>
              </div>
            </div>

            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "1.5rem", 
              padding: "1.5rem",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e2e8f0",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer"
            }} onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-5px)";
              e.target.style.boxShadow = "0 12px 20px rgba(0, 0, 0, 0.15)";
            }} onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.1)";
            }}>
              <div style={{ 
                fontSize: "2.5rem", 
                color: "#0b7ac4",
                minWidth: "3rem",
                textAlign: "center"
              }}>
                📍
              </div>
              <div>
                <div style={{ 
                  fontWeight: "bold", 
                  marginBottom: "0.5rem", 
                  color: "#1e40af",
                  fontSize: "1.2rem"
                }}>Address</div>
                <div style={{ fontSize: "1.1rem", color: "#374151" }}>Bhaktapur International Hospital, Street Name, Bhaktapur</div>
              </div>
            </div>

            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "1.5rem", 
              padding: "1.5rem",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e2e8f0",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer"
            }} onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-5px)";
              e.target.style.boxShadow = "0 12px 20px rgba(0, 0, 0, 0.15)";
            }} onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.1)";
            }}>
              <div style={{ 
                fontSize: "2.5rem", 
                color: "#0b7ac4",
                minWidth: "3rem",
                textAlign: "center"
              }}>
                ✉️
              </div>
              <div>
                <div style={{ 
                  fontWeight: "bold", 
                  marginBottom: "0.5rem", 
                  color: "#1e40af",
                  fontSize: "1.2rem"
                }}>Email</div>
                <div style={{ fontSize: "1.1rem", color: "#374151" }}>info@bihospital.com.np</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Appointment Form Section */}
        <section style={{
          marginBottom: '4rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)',
          borderRadius: '15px',
          border: '1px solid #d1d5db',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.2rem',
            color: '#1e40af',
            marginBottom: '2.5rem',
            fontWeight: '600'
          }}>Book an Appointment</h2>
          <div style={{ 
            padding: "2rem", 
            backgroundColor: "white", 
            borderRadius: "12px", 
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
            width: '100%',
            maxWidth: '800px'
          }}>
            <AppointmentSection />
          </div>
        </section>
        
        {/* Map Section */}
        <section style={{
          marginBottom: '4rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
          borderRadius: '15px',
          border: '1px solid #d1d5db'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.2rem',
            color: '#166534',
            marginBottom: '2.5rem',
            fontWeight: '600'
          }}>Find Us Here</h2>
          <div style={{ 
            height: "500px", 
            borderRadius: "15px", 
            overflow: "hidden", 
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)", 
            border: "1px solid #e2e8f0",
            position: "relative"
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
        </section>
        
        {/* Feedback Form Section */}
        <section style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, #fef2f2 0%, #ffe4e6 100%)',
          borderRadius: '15px',
          border: '1px solid #d1d5db'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.2rem',
            color: '#b91c1c',
            marginBottom: '2.5rem',
            fontWeight: '600'
          }}>Feedback Form</h2>
          <div style={{ padding: "2rem", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)" }}>
            <form style={{ display: 'grid', gap: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
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
                    borderRadius: '10px', 
                    border: '2px solid #f3f4f6', 
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    backgroundColor: '#f9fafb'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#b91c1c'}
                  onBlur={(e) => e.target.style.borderColor = '#f3f4f6'}
                  required
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
                    borderRadius: '10px', 
                    border: '2px solid #f3f4f6', 
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    backgroundColor: '#f9fafb'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#b91c1c'}
                  onBlur={(e) => e.target.style.borderColor = '#f3f4f6'}
                  required
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
                    borderRadius: '10px', 
                    border: '2px solid #f3f4f6', 
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    backgroundColor: '#f9fafb'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#b91c1c'}
                  onBlur={(e) => e.target.style.borderColor = '#f3f4f6'}
                  required
                />
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem', 
                  color: '#b91c1c',
                  fontSize: '1.1rem'
                }}>Message</label>
                <textarea 
                  placeholder="Share your feedback with us" 
                  rows={5}
                  style={{ 
                    width: '100%', 
                    padding: '0.8rem', 
                    borderRadius: '10px', 
                    border: '2px solid #f3f4f6', 
                    fontSize: '1rem', 
                    resize: 'vertical',
                    transition: 'border-color 0.3s ease',
                    backgroundColor: '#f9fafb'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#b91c1c'}
                  onBlur={(e) => e.target.style.borderColor = '#f3f4f6'}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                style={{ 
                  backgroundColor: '#b91c1c', 
                  color: 'white', 
                  padding: '1rem 2rem', 
                  borderRadius: '10px', 
                  border: 'none', 
                  fontSize: '1.2rem', 
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
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
