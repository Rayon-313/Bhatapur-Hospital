"use client";
import Link from "next/link";

export default function DepartmentSection({ departments = [] }) {
  const activeDepartments = departments.filter(
    (dept) => dept?.isActive !== false,
  );

  return (
    <section
      style={{
        padding: "4rem 2rem",
        background: "#fff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          color: "#0b7ac4",
          fontSize: "33px",
        }}
      >
        Our Departments
      </h2>

      {activeDepartments.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {activeDepartments.map((dept) => (
            <Link
              href={`/departments/${dept._id}`}
              key={dept._id}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {/* CARD */}
              <div className="deptCard">
                <img
                  src={dept.image || "/placeholder-dept.jpg"}
                  alt={dept.name}
                  style={{
                    width: "90%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginBottom: "1rem",
                  }}
                />

                <div
                    style={{
                      marginLeft: "3px",
                      display: "flex",
                      flexDirection: "row", // Keeps items side-by-side initially
                      flexWrap: "wrap", // CRITICAL: Allows text to move downward if long
                      alignItems: "flex-start", // Sticks the icon to the TOP left
                      gap: "12px", // Spacing between icon and text
                      overflowWrap: "anywhere", // Prevents very long words from breaking layout
                    }}
                  >
                    {dept.imageIcon && (
                      <img
                        src={dept.imageIcon}
                        alt={dept.name}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit:
                            "contain" /* Use contain for icons so they don't crop */,
                          borderRadius: "9px",
                          flexShrink: 0 /* Prevents the image from squishing */,
                          // marginTop: "4px", // Optional: aligns icon with the first line of text
                        }}
                      />
                    )}
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "clamp(0.9rem, 1.3vw, 2rem)",

                        color: "var(--primary-color)",
                        flex: "1",
                        textAlign: "left",
                      }}
                    >
                      {dept.name}
                    </h3>
                  </div>

                <p style={{ fontSize: "0.9rem", color: "#666" }}>
                  {dept.description?.substring(0, 100)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "#666",
          }}
        >
          <p>No departments currently available.</p>

          <p style={{ fontSize: "10px" }}>
            Debug: Received {departments.length} items from server.
          </p>
        </div>
      )}

      {/* INLINE CSS (SAFE FOR NEXT.JS, NO EXTRA FILE NEEDED) */}
      <style jsx>{`
        .deptCard {
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 1.5rem;
          border: 3px solid #080c67;
          border-radius: 12px;
          text-align: center;
          background-color: white;
          height: 100%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .deptCard:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        border: 3px solid #18b730;
         
      `}</style>
    </section>
  );
}
