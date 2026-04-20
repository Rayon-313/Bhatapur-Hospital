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

        {/* MAP */}
        <section className="section map">
          <h2>Find Us Here</h2>
          <div className="mapBox">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1766.6864772580295!2d85.3654504362405!3d27.67486566437954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1b3eb720aa73%3A0xbd155722b5862ea1!2sBhaktapur%20International%20Hospital!5e0!3m2!1sne!2snp!4v1767370171204!5m2!1sne!2snp"
              width="100%"
              height="100%"
              loading="lazy"
              title="map"
            />
          </div>
        </section>

        {/* FEEDBACK
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
        </section> */}
      </div>
    </div>
  );
}
