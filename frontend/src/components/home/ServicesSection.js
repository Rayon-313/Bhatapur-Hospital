'use client';

import Link from 'next/link';

// Helper function to create URL-friendly service title
const createUrlFriendlyTitle = (title) => {
  return encodeURIComponent(
    title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, ' ')  // Replace special chars with spaces
      .replace(/\s+/g, '-')             // Replace spaces with hyphens
  );
};

export default function ServicesSection({ services = [] }) {
  return (
    <section className="section">
      <h2 className="section-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <Link 
            href={`/services/${createUrlFriendlyTitle(service.title)}`}
            key={index}
            style={{ 
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              style={{ 
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                padding: '1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                textAlign: 'center',
                backgroundColor: 'white',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
              }}
            >
              {service.imageUrl && (
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                  style={{ width: '80px', height: '80px', objectFit: 'cover', marginBottom: '1rem', borderRadius: '4px', display: 'block', margin: '0 auto' }}
                />
              )}
              <h3 style={{ margin: '0.5rem 0' }}>{service.title}</h3>
              <p style={{ margin: '0.5rem 0' }}>{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}