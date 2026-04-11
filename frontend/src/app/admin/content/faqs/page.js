"use client";

import { useState, useEffect } from "react";
import { getFaqs, createFaq as createFaqAPI, updateFaq as updateFaqAPI, deleteFaq as deleteFaqAPI } from '@lib/api/healthPackages';

export default function FaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', order: 0 });

  // Load FAQs from the backend
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getFaqs();
        setFaqs(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const handleCreateFaq = async (e) => {
    e.preventDefault();
    try {
      const createdFaq = await createFaqAPI(newFaq);
      setFaqs(prev => [...prev, createdFaq]);
      setNewFaq({ question: '', answer: '', order: 0 });
      alert('FAQ created successfully');
    } catch (err) {
      console.error('Error creating FAQ:', err);
      alert('Error creating FAQ');
    }
  };

  const handleUpdateFaq = async (id, updatedData) => {
    try {
      const updatedFaq = await updateFaqAPI(id, updatedData);
      setFaqs(prev => prev.map(faq => 
        faq._id === id ? updatedFaq : faq
      ));
      alert('FAQ updated successfully');
    } catch (err) {
      console.error('Error updating FAQ:', err);
      alert('Error updating FAQ');
    }
  };

  const handleDeleteFaq = async (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      try {
        await deleteFaqAPI(id);
        setFaqs(prev => prev.filter(faq => faq._id !== id));
        alert('FAQ deleted successfully');
      } catch (err) {
        console.error('Error deleting FAQ:', err);
        alert('Error deleting FAQ');
      }
    }
  };

  if (loading) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        <h2 style={{ color: '#1e40af' }}>Loading FAQs...</h2>
        <p>Loading frequently asked questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        <h2 style={{ color: '#dc2626' }}>Error Loading FAQs</h2>
        <p>Error: {error}</p>
      </div>
    );
  }

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
      }}>Manage FAQs</h2>

      {/* Add New FAQ Form */}
      <div style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        borderRadius: '15px',
        border: '1px solid #d1d5db',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.8rem',
          color: '#1e40af',
          marginBottom: '1.5rem',
          fontWeight: '600',
          borderBottom: '3px solid #0b7ac4',
          paddingBottom: '0.5rem'
        }}>
          Add New FAQ
        </h3>
        <form onSubmit={handleCreateFaq} style={{
          display: 'grid',
          gap: '1rem'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1e40af'
            }}>Question</label>
            <input
              type="text"
              value={newFaq.question}
              onChange={(e) => setNewFaq(prev => ({ ...prev, question: e.target.value }))}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1e40af'
            }}>Answer</label>
            <textarea
              value={newFaq.answer}
              onChange={(e) => setNewFaq(prev => ({ ...prev, answer: e.target.value }))}
              required
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            ></textarea>
          </div>
          <div>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1e40af'
            }}>Order (for display priority)</label>
            <input
              type="number"
              value={newFaq.order}
              onChange={(e) => setNewFaq(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
              min="0"
              style={{
                width: '100px',
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '1rem'
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#0b7ac4',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#09609d'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#0b7ac4'}
          >
            Add FAQ
          </button>
        </form>
      </div>

      {/* Existing FAQs List */}
      <div style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: '15px',
        border: '1px solid #d1d5db',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '1.8rem',
            color: '#1e40af',
            margin: 0,
            fontWeight: '600',
            borderBottom: '3px solid #0b7ac4',
            paddingBottom: '0.5rem'
          }}>
            All FAQs
          </h3>
          <span style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}>
            {faqs.length} Total
          </span>
        </div>

        {faqs.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#6b7280',
            fontSize: '1.2rem'
          }}>
            No FAQs found.
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {faqs.map((faq) => (
              <div key={faq._id} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{
                    fontSize: '1.3rem',
                    color: '#1e40af',
                    marginBottom: '0.5rem',
                    fontWeight: '600'
                  }}>Q: {faq.question}</h4>
                  <p style={{
                    margin: '0.25rem 0',
                    color: '#4b5563',
                    lineHeight: '1.6'
                  }}><strong>A:</strong> {faq.answer}</p>
                  <p style={{
                    margin: '0.5rem 0 0 0',
                    color: '#9ca3af',
                    fontSize: '0.9rem'
                  }}>Order: {faq.order} | Created: {new Date(faq.createdAt).toLocaleDateString()}</p>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => {
                      const newQuestion = prompt('Update question:', faq.question);
                      const newAnswer = prompt('Update answer:', faq.answer);
                      const newOrder = prompt('Update order:', faq.order);
                      
                      if (newQuestion !== null && newAnswer !== null && newOrder !== null) {
                        handleUpdateFaq(faq._id, {
                          question: newQuestion,
                          answer: newAnswer,
                          order: parseInt(newOrder) || 0
                        });
                      }
                    }}
                    style={{
                      backgroundColor: '#0b7ac4',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#09609d'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#0b7ac4'}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteFaq(faq._id)}
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
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}