"use client";
import Link from 'next/link';

export default function DepartmentSection({ departments = [] }) {
    // UPDATED FILTER: Only hide if isActive is EXPLICITLY false. 
    // If it's undefined or true, it will show.
    const activeDepartments = departments.filter(dept => dept?.isActive !== false);

    return (
        <section className="section" style={{ padding: '4rem 2rem', background: '#fff' }}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem', color: '#0b7ac4' }}>
                Our Departments
            </h2>
            
            {activeDepartments.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {activeDepartments.map((dept) => (
                        <Link 
                            href={`/departments/${dept._id}`} 
                            key={dept._id}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div style={{ 
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                padding: '1.5rem',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                textAlign: 'center',
                                backgroundColor: 'white',
                                height: '100%',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                            }}>
                                <img 
                                    src={dept.image || '/placeholder-dept.jpg'} 
                                    alt={dept.name} 
                                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%', marginBottom: '1rem' }}
                                />
                                <h3 style={{ margin: '0 0 10px 0' }}>{dept.name}</h3>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>{dept.description?.substring(0, 100)}...</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                    <p>No departments currently available.</p>
                    {/* Debug info: remove this once it works */}
                    <p style={{fontSize: '10px'}}>Debug: Received {departments.length} items from server.</p>
                </div>
            )}
        </section>
    );
}