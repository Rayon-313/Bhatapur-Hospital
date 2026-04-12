"use client";

import { useState, useEffect } from 'react';
import { submitQuestion, getFaqs } from '@/lib/api/healthPackages';

const fallbackFaqs = [
  {
    question: "Do I need an appointment before visiting?",
    answer: "Walk-ins are welcome for emergencies, but we recommend appointments for consultations.",
  },
  {
    question: "What are your OPD hours?",
    answer: "Our OPD is generally open from 9:00 AM to 5:00 PM, Sunday to Friday.",
  },
];

export default function FeelFreeToAskUsPage() {
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [faqs, setFaqs] = useState(fallbackFaqs);
  const [faqLoading, setFaqLoading] = useState(true);
  
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getFaqs();
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        // Use fallback FAQs if API fails
        setFaqs(fallbackFaqs);
      } finally {
        setFaqLoading(false);
      }
    };
    
    fetchFaqs();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const questionData = {
      name: formData.get('name'),
      email: formData.get('email'),
      question: formData.get('question')
    };
    
    try {
      setLoading(true);
      await submitQuestion(questionData);
      alert('Thank you for your question! We have received your query and will respond to your email shortly.');
      e.target.reset();
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('There was an error submitting your question. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)',
      padding: '2rem 1rem',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          padding: '2rem 0',
          background: 'linear-gradient(135deg, #0b7ac4 0%, #1e40af 100%)',
          borderRadius: '15px',
          color: 'white',
          boxShadow: '0 5px 15px rgba(11, 122, 196, 0.3)'
        }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '700', 
            marginBottom: '0.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>Feel Free to Ask Us</h1>
          <p style={{ 
            fontSize: '1.3rem', 
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0.5rem auto 0'
          }}>
            Browse common questions below or send us your own query.
          </p>
        </div>
        
        <div style={{ marginTop: "1rem", display: "grid", gap: "2rem", maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            borderRadius: '15px',
            border: '1px solid #d1d5db'
          }}>
            <h3 style={{
              textAlign: 'center',
              fontSize: '1.8rem',
              color: '#1e40af',
              marginBottom: '1.5rem',
              fontWeight: '600'
            }}>Frequently Asked Questions</h3>
            {faqLoading ? (
              <p style={{ textAlign: 'center', color: '#6b7280' }}>Loading FAQs...</p>
            ) : (
              <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem" }}>
                {faqs.map((item) => (
                  <li key={item._id || item.question} style={{ marginBottom: "0.75rem", padding: '0.75rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <strong style={{ color: '#0b7ac4' }}>{item.question}</strong>
                    <br />
                    <span style={{ color: '#4b5563' }}>{item.answer}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            borderRadius: '15px',
            border: '1px solid #d1d5db'
          }}>
            <h3 style={{
              textAlign: 'center',
              fontSize: '1.8rem',
              color: '#166534',
              marginBottom: '1.5rem',
              fontWeight: '600'
            }}>Ask Your Question</h3>
            <form
              style={{ marginTop: "0.75rem", display: "grid", gap: "0.75rem", maxWidth: 480, margin: '0 auto' }}
              onSubmit={handleSubmit}
            >
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                required 
                style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px", fontSize: '1rem' }}
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                required 
                style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px", fontSize: '1rem' }}
              />
              <textarea 
                name="question" 
                placeholder="Your Question" 
                rows={4} 
                required 
                style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px", fontSize: '1rem', resize: 'vertical' }}
              ></textarea>
              <button 
                type="submit" 
                disabled={loading}
                style={{ 
                  padding: "0.75rem", 
                  backgroundColor: loading ? "#9ca3af" : "#0b7ac4", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "4px", 
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: '1rem',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = "#09609d")}
                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = "#0b7ac4")}
              >
                {loading ? 'Submitting...' : 'Submit Question'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
