"use client";

import AppointmentSection from "@/components/home/AppointmentSection";
import "./page.css";

export default function ContactUsPage() {
  return (
    <div className="page">
      <div className="wrapper">
        <div className="header">
          <h1>Contact Us</h1>
          <p>Reach out to us for appointments, inquiries, or feedback.</p>
        </div>

        {/* CONTACT INFO */}
        <section className="section infoSection">
          <h2>Get In Touch</h2>

          <div className="grid">
            <div className="card">
              <div className="icon">
                <img className="phone" src="/images/phone.png" />
              </div>
              <div>
                <div className="label">Phone Number</div>
                <div className="value">+977-1-XXXX-XXXX</div>
              </div>
            </div>

            <div className="card">
              <div className="icon">
                <img className="address" src="/images/address.png" />
              </div>
              <div>
                <div className="label">Address</div>
                <div className="value">
                  Bhaktapur International Hospital, Street Name, Bhaktapur
                </div>
              </div>
            </div>

            <div className="card">
              <div className="icon">
                <img className="email" src="/images/email.png" />
              </div>
              <div>
                <div className="label">Email</div>
                <div className="value">info@bihospital.com.np</div>
              </div>
            </div>
          </div>
        </section>

        {/* APPOINTMENT */}
        <section className="section appointment">
          <h2>Book an Appointment</h2>
          <div className="appointmentBox">
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

        {/* FEEDBACK */}
        <section className="section feedback">
          <h2>Feedback Form</h2>

          <div className="feedbackBox">
            <form className="form">
              <input type="text" placeholder="Enter your name" />
              <input type="email" placeholder="Enter your email" />
              <input type="text" placeholder="Enter subject" />
              <textarea rows={5} placeholder="Share your feedback" />

              <button type="submit">Send Message</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
