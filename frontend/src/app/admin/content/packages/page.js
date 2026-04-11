"use client";

import { useState, useEffect } from "react";
import { getHealthPackages, createHealthPackage, updateHealthPackage, deleteHealthPackage } from '@lib/api/healthPackages';

export default function EditHealthPackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPackage, setCurrentPackage] = useState({
    _id: null,
    name: "",
    description: "",
    price: "",
    features: [""]
  });

  const [isEditing, setIsEditing] = useState(false);

  // Load packages from backend on mount
  useEffect(() => {
    const loadPackages = async () => {
      try {
        const data = await getHealthPackages();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching health packages:', error);
        // Fallback to default packages if API fails
        setPackages([
          {
            _id: 1,
            name: "Basic Health Checkup",
            description: "Includes essential blood tests, vitals check, and physician consultation.",
            price: "Rs. 2,500",
            features: [
              "Complete Blood Count",
              "Blood Pressure Check", 
              "Basic Metabolic Panel",
              "General Physician Consultation"
            ]
          },
          {
            _id: 2,
            name: "Cardiac Screening Package",
            description: "ECG, lipid profile, cardiac evaluation, and cardiologist consultation.",
            price: "Rs. 8,500",
            features: [
              "ECG Test",
              "Lipid Profile",
              "Cardiac Enzymes",
              "Cardiologist Consultation"
            ]
          },
          {
            _id: 3,
            name: "Diabetes Care Package",
            description: "Blood sugar profile, HbA1c, diet counseling, and specialist review.",
            price: "Rs. 5,200",
            features: [
              "Blood Sugar Profile",
              "HbA1c Test",
              "Dietitian Consultation",
              "Endocrinologist Review"
            ]
          },
          {
            _id: 4,
            name: "Senior Citizen Package",
            description: "Comprehensive health screening tailored for senior citizens.",
            price: "Rs. 12,000",
            features: [
              "Complete Health Checkup",
              "Bone Density Scan",
              "Vision & Hearing Tests",
              "Geriatrician Consultation"
            ]
          },
          {
            _id: 5,
            name: "Women's Health Package",
            description: "Specialized screening for women's health needs.",
            price: "Rs. 9,800",
            features: [
              "Mammography",
              "Pap Smear",
              "Hormone Profile",
              "Gynecologist Consultation"
            ]
          },
          {
            _id: 6,
            name: "Executive Health Package",
            description: "Premium comprehensive health screening with advanced diagnostics.",
            price: "Rs. 25,000",
            features: [
              "Full Body MRI",
              "Advanced Cardiac Screening",
              "Cancer Markers",
              "Specialist Consultations"
            ]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    loadPackages();
  }, []);

  const handleInputChange = (field, value) => {
    setCurrentPackage(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...currentPackage.features];
    updatedFeatures[index] = value;
    setCurrentPackage(prev => ({
      ...prev,
      features: updatedFeatures
    }));
  };

  const addFeatureField = () => {
    setCurrentPackage(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }));
  };

  const removeFeatureField = (index) => {
    if (currentPackage.features.length > 1) {
      const updatedFeatures = currentPackage.features.filter((_, i) => i !== index);
      setCurrentPackage(prev => ({
        ...prev,
        features: updatedFeatures
      }));
    }
  };

  const handleAddPackage = async () => {
    if (currentPackage.name && currentPackage.description && currentPackage.price) {
      try {
        if (isEditing) {
          // Update existing package
          await updateHealthPackage(currentPackage._id, {
            name: currentPackage.name,
            description: currentPackage.description,
            price: currentPackage.price,
            features: currentPackage.features
          });
          
          // Refresh the package list from the API to ensure consistency
          const updatedPackages = await getHealthPackages();
          setPackages(updatedPackages);
          alert("Health package updated successfully!");
        } else {
          // Create new package
          await createHealthPackage({
            name: currentPackage.name,
            description: currentPackage.description,
            price: currentPackage.price,
            features: currentPackage.features
          });
          
          // Refresh the package list from the API to ensure consistency
          const updatedPackages = await getHealthPackages();
          setPackages(updatedPackages);
          alert("Health package created successfully!");
        }
        
        resetForm();
      } catch (error) {
        console.error('Error saving health package:', error);
        alert("Error saving health package. Please try again.");
      }
    }
  };

  const handleEdit = (pkg) => {
    setCurrentPackage(pkg);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this health package?")) {
      try {
        await deleteHealthPackage(id);
        
        // Refresh the package list from the API to ensure consistency
        const updatedPackages = await getHealthPackages();
        setPackages(updatedPackages);
        alert("Health package deleted successfully!");
      } catch (error) {
        console.error('Error deleting health package:', error);
        alert("Error deleting health package. Please try again.");
      }
    }
  };

  const resetForm = () => {
    setCurrentPackage({
      _id: null,
      name: "",
      description: "",
      price: "",
      features: [""]
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    // This function is no longer needed since we save immediately when adding/updating
    alert("All changes have already been saved to the database!");
  };

  return (
    <div style={{
      padding: '2rem',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        color: '#1e40af',
        marginBottom: '2rem',
        textAlign: 'center',
        fontWeight: '700',
        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>Edit Health Packages</h2>

      {/* Package Management Section */}
      <div style={{
        marginBottom: '3rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: '15px',
        border: '1px solid #d1d5db',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{
          fontSize: '1.8rem',
          color: '#1e40af',
          marginBottom: '1.5rem',
          fontWeight: '600',
          borderBottom: '3px solid #0b7ac4',
          paddingBottom: '0.5rem'
        }}>
          {isEditing ? 'Edit Package' : 'Add New Package'}
        </h3>
        
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1e40af',
              fontSize: '1.1rem'
            }}>Package Name</label>
            <input
              type="text"
              value={currentPackage.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '8px',
                border: '2px solid #e5e7eb',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease',
                backgroundColor: '#ffffff'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0b7ac4'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              placeholder="Enter package name"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1e40af',
              fontSize: '1.1rem'
            }}>Description</label>
            <textarea
              value={currentPackage.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '8px',
                border: '2px solid #e5e7eb',
                fontSize: '1rem',
                resize: 'vertical',
                transition: 'border-color 0.3s ease',
                backgroundColor: '#ffffff'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0b7ac4'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              placeholder="Enter package description"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1e40af',
              fontSize: '1.1rem'
            }}>Price</label>
            <input
              type="text"
              value={currentPackage.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '8px',
                border: '2px solid #e5e7eb',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease',
                backgroundColor: '#ffffff'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0b7ac4'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              placeholder="Enter package price (e.g., Rs. 2,500)"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1e40af',
              fontSize: '1.1rem'
            }}>Features</label>
            {currentPackage.features.map((feature, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.6rem',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    fontSize: '0.9rem',
                    transition: 'border-color 0.3s ease',
                    backgroundColor: '#ffffff'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0b7ac4'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  placeholder="Enter feature"
                />
                {currentPackage.features.length > 1 && (
                  <button
                    onClick={() => removeFeatureField(index)}
                    style={{
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addFeatureField}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.6rem 1rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                marginTop: '0.5rem'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
            >
              Add Feature
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              onClick={handleAddPackage}
              style={{
                backgroundColor: '#0b7ac4',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                flex: 1
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#09609d'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#0b7ac4'}
            >
              {isEditing ? 'Update Package' : 'Add Package'}
            </button>
            
            {isEditing && (
              <button
                onClick={resetForm}
                style={{
                  backgroundColor: '#6b7280',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  flex: 1
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Existing Packages Section */}
      <div style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, #fef2f2 0%, #ffe4e6 100%)',
        borderRadius: '15px',
        border: '1px solid #d1d5db',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{
          fontSize: '1.8rem',
          color: '#b91c1c',
          marginBottom: '1.5rem',
          fontWeight: '600',
          borderBottom: '3px solid #dc2626',
          paddingBottom: '0.5rem'
        }}>
          Current Health Packages
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {packages.map((pkg) => (
            <div key={pkg._id} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s ease'
            }}>
              <h4 style={{
                fontSize: '1.3rem',
                color: '#1e40af',
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>{pkg.name}</h4>
              <div style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#0b7ac4',
                marginBottom: '1rem'
              }}>{pkg.price}</div>
              <p style={{
                color: '#6b7280',
                marginBottom: '1rem',
                lineHeight: '1.5'
              }}>{pkg.description}</p>
              <div style={{ marginBottom: '1.5rem' }}>
                <strong style={{ color: '#1e40af', fontSize: '0.9rem' }}>FEATURES:</strong>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  marginTop: '0.5rem'
                }}>
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.25rem',
                      color: '#4b5563',
                      fontSize: '0.9rem'
                    }}>
                      <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleEdit(pkg)}
                  style={{
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    flex: 1
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#d97706'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#f59e0b'}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pkg._id)}
                  style={{
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    flex: 1
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div style={{
        textAlign: 'center',
        marginTop: '3rem'
      }}>
        <button
          onClick={handleSave}
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '10px',
            border: 'none',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#059669';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#10b981';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}