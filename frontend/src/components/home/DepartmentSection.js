"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";

export default function DepartmentSection({ departments = [] }) {
  const activeDepartments = departments.filter(
    (dept) => dept?.isActive !== false,
  );

  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  const scroll = (ref, dir) => {
    const container = ref.current;
    if (!container) return;

    const card = container.querySelector(".deptCard");
    if (!card) return;

    const gap = 24;
    const cardWidth = card.offsetWidth + gap;

    container.scrollBy({
      left: dir * cardWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scroll(row1Ref, 1);
      scroll(row2Ref, 1);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const mid = Math.ceil(activeDepartments.length / 2);
  const row1 = activeDepartments.slice(0, mid);
  const row2 = activeDepartments.slice(mid);

  const Row = ({ data, refObj }) => (
    <div className="rowWrapper">
      <button className="arrow left" onClick={() => scroll(refObj, -1)}>
        ❮
      </button>

      <div className="track" ref={refObj}>
        {data.map((dept) => (
          <Link
            href={`/departments/${dept._id}`}
            key={dept._id}
            className="link"
          >
            <div className="deptCard">
              <img
                src={dept.image || "/placeholder-dept.jpg"}
                className="deptImage"
                alt={dept.name}
              />

              <div className="titleRow">
                {dept.imageIcon && (
                  <img src={dept.imageIcon} className="icon" alt={dept.name} />
                )}
                <h3>{dept.name}</h3>
              </div>

              <p>{dept.description?.substring(0, 90)}...</p>
            </div>
          </Link>
        ))}
      </div>

      <button className="arrow right" onClick={() => scroll(refObj, 1)}>
        ❯
      </button>

      <style jsx>{`
        .rowWrapper {
          position: relative;
          margin-bottom: 2.5rem;
        }

        /* TRACK (horizontal scroll always) */
        .track {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 1rem 3rem;
          scroll-snap-type: x mandatory;
        }

        .track::-webkit-scrollbar {
          display: none;
        }

        .link {
          text-decoration: none;
          color: inherit;
        }
        .deptCard {
          flex: 0 0 calc((100% - 20px) / 3);
          min-width: 370px; /* 🔥 makes cards wider */
          background: #fff;
          border-radius: 18px;
          padding: 1.5rem;
          text-align: center;
          scroll-snap-align: start;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
          transition: 0.3s ease;
        }
        /* ⭐ ALWAYS 3 CARDS PER VIEW */

        .deptCard:hover {
          transform: translateY(-6px);
          border: 1px solid #18b730;
          box-shadow: 0 18px 35px rgba(0, 0, 0, 0.15);
        }

        /* IMAGE */
        .deptImage {
          width: 100%;
          height: 130px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 10px;
        }

        /* ICON SMALL */
        .icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .titleRow {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }

        h3 {
          margin: 0;
          font-size: 0.95rem;
          color: #0b7ac4;
          flex: 1;
          text-align: left;
        }

        p {
          font-size: 0.8rem;
          color: #666;
        }

        /* ARROWS */
        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          font-size: 18px;
          color: white;
          background: rgba(11, 122, 196, 0.9);
          z-index: 10;
        }

        .arrow:hover {
          background: #18b730;
        }

        .left {
          left: 0;
        }

        .right {
          right: 0;
        }

        /* 📱 MOBILE FIX (NO layout change, just better fit) */
        @media (max-width: 768px) {
          .track {
            padding: 1rem;
            gap: 16px;
          }

          .deptCard {
            flex: 0 0 calc((100% - 32px) / 3); /* STILL 3 CARDS */
            padding: 0.8rem;
          }

          .deptImage {
            height: 130px;
            width: 270px;
          }

          h3 {
            font-size: 0.75rem;
          }

          p {
            font-size: 0.7rem;
          }

          .icon {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );

  return (
    <section style={{ padding: "4rem 2rem", background: "#f7f9ff" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          color: "#0b7ac4",
          fontSize: "34px",
          fontWeight: "700",
        }}
      >
        Our Departments
      </h2>

      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        <Row data={row1} refObj={row1Ref} />
        <Row data={row2} refObj={row2Ref} />
      </div>
    </section>
  );
}
