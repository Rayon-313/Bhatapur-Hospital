"use client";

import { useState, useEffect } from "react";
import { getHealthPackages, bookHealthPackage } from "@/lib/api/healthPackages";
import styles from "./page.css";

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
        console.error("Error fetching health packages:", error);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Health Packages</h1>
          <p>
            Choose from our preventive health packages designed to keep you and
            your family healthy.
          </p>
        </div>

        <div className={styles.grid}>
          {packages.map((pkg, index) => (
            <article key={pkg._id || pkg.name} className={styles.card}>
              <div
                className={styles.badge + " " + styles["badge" + (index % 3)]}
              >
                Popular
              </div>

              <div className={styles.center}>
                <h3>{pkg.name}</h3>
                <div className={styles.price}>{pkg.price}</div>
                <p>{pkg.description}</p>
              </div>

              <div className={styles.features}>
                <h4>Package Includes:</h4>
                <ul>
                  {pkg.features.map((f, i) => (
                    <li key={i}>✓ {f}</li>
                  ))}
                </ul>
              </div>

              <button
                className={styles.button}
                onClick={() => {
                  setSelectedPackage(pkg);
                  setShowBookingModal(true);
                }}
              >
                Book Package
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showBookingModal && selectedPackage && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowBookingModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Book {selectedPackage.name}</h3>

            <div className={styles.modalBox}>
              <p>{selectedPackage.description}</p>
              <strong>{selectedPackage.price}</strong>
            </div>

            <form
              className={styles.form}
              onSubmit={async (e) => {
                e.preventDefault();

                const formData = new FormData(e.target);
                const bookingData = {
                  packageName: selectedPackage.name,
                  fullName: formData.get("fullName"),
                  phone: formData.get("phone"),
                  email: formData.get("email"),
                  preferredDate: formData.get("preferredDate"),
                  notes: formData.get("notes"),
                };

                try {
                  await bookHealthPackage(bookingData);
                  alert("Booking successful!");
                  setShowBookingModal(false);
                } catch (err) {
                  alert("Error booking package");
                }
              }}
            >
              <input name="fullName" placeholder="Full Name" required />
              <input name="phone" placeholder="Phone" required />
              <input name="email" placeholder="Email" required />
              <input type="date" name="preferredDate" required />
              <textarea name="notes" placeholder="Notes" />

              <button type="submit">Confirm Booking</button>
            </form>

            <button
              className={styles.closeBtn}
              onClick={() => setShowBookingModal(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
