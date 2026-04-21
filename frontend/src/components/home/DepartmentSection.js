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
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginBottom: "1rem",
                  }}
                />

                <h3 style={{ margin: "0 0 10px 0" }}>{dept.name}</h3>

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
