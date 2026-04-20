"use client";

import { bookAppointment } from "@/lib/api/healthPackages";
import styles from "./appointment.css";

export default function AppointmentSection() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const appointmentData = {
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      department: formData.get("department"),
      preferredDate: formData.get("date"),
      problemDescription: formData.get("message"),
    };

    try {
      await bookAppointment(appointmentData);
      alert("Thank you for your appointment request!");
      e.target.reset();
    } catch (error) {
      console.error(error);
      alert("Error booking appointment");
    }
  };

  return (
    <section style={{ width: "100% !important", padding: "2rem 0" }}>
      <h2>Need a doctor for checkup?</h2>
      <p>Fill in the appointment form and we will contact you shortly.</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full Name" required />
        <input name="phone" placeholder="Phone Number" required />
        <input name="email" placeholder="Email" />
        <input name="department" placeholder="Preferred Department" />
        <input type="date" name="date" />
        <textarea
          name="message"
          placeholder="Briefly describe your problem"
          rows={3}
        />
        <button type="submit">Book Appointment</button>
      </form>
    </section>
  );
}
