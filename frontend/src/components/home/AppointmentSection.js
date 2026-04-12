"use client";

import { bookAppointment } from '@/lib/api/healthPackages';

export default function AppointmentSection() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const appointmentData = {
      fullName: formData.get('fullName'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      department: formData.get('department'),
      preferredDate: formData.get('date'),
      problemDescription: formData.get('message')
    };
    
    try {
      await bookAppointment(appointmentData);
      alert('Thank you for your appointment request! We have received your request and will contact you shortly to confirm your appointment.');
      e.target.reset();
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('There was an error processing your appointment request. Please try again.');
    }
  };
  
  return (
    <section style={{ padding: "2rem 0" }}>
      <h2>Need a doctor for checkup?</h2>
      <p style={{ marginTop: "0.5rem" }}>Fill in the appointment form and we will contact you shortly.</p>
      <form
        style={{ marginTop: "1rem", display: "grid", gap: "0.75rem", maxWidth: 480 }}
        onSubmit={handleSubmit}
      >
        <input type="text" name="fullName" placeholder="Full Name" required style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px" }} />
        <input type="tel" name="phone" placeholder="Phone Number" required style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px" }} />
        <input type="email" name="email" placeholder="Email" style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px" }} />
        <input type="text" name="department" placeholder="Preferred Department" style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px" }} />
        <input type="date" name="date" style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px" }} />
        <textarea name="message" placeholder="Briefly describe your problem" rows={3} style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px" }}></textarea>
        <button type="submit" style={{ padding: "0.75rem", backgroundColor: "#0b7ac4", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Book Appointment</button>
      </form>
    </section>
  );
}
