"use client";

import { useState, useEffect } from "react";
import { getQuestions, updateQuestion as updateQuestionAPI, deleteQuestion as deleteQuestionAPI } from '@lib/api/healthPackages';

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const updateQuestion = async (questionId, updateData) => {
    try {
      const updatedQuestion = await updateQuestionAPI(questionId, updateData);
      setQuestions(prev => prev.map(question => 
        question._id === questionId ? updatedQuestion : question
      ));
      alert('Question updated successfully');
    } catch (err) {
      console.error('Error updating question:', err);
      alert('Error updating question');
    }
  };

  const deleteQuestion = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await deleteQuestionAPI(questionId);
        setQuestions(prev => prev.filter(question => question._id !== questionId));
        alert('Question deleted successfully');
      } catch (err) {
        console.error('Error deleting question:', err);
        alert('Error deleting question');
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
        <h2 style={{ color: '#1e40af' }}>Loading Questions...</h2>
        <p>Loading submitted questions...</p>
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
        <h2 style={{ color: '#dc2626' }}>Error Loading Questions</h2>
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
      }}>Submitted Questions</h2>

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
            All Submitted Questions
          </h3>
          <span style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}>
            {questions.length} Total
          </span>
        </div>

        {questions.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#6b7280',
            fontSize: '1.2rem'
          }}>
            No questions found.
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {questions.map((question) => (
              <div key={question._id} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                position: 'relative'
              }}>
                {/* Status Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: 
                    question.status === 'answered' ? '#10b981' : '#f59e0b',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{
                    fontSize: '1.3rem',
                    color: '#1e40af',
                    marginBottom: '0.5rem',
                    fontWeight: '600'
                  }}>Question from: {question.name}</h4>
                  <p style={{
                    margin: '0.25rem 0',
                    color: '#4b5563',
                    fontWeight: '500'
                  }}>Email: {question.email}</p>
                  <p style={{
                    margin: '0.25rem 0',
                    color: '#4b5563',
                    fontWeight: '600',
                    fontStyle: 'italic'
                  }}>Question: {question.question}</p>
                  {question.answer && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '8px',
                      border: '1px solid #bbf7d0'
                    }}>
                      <p style={{
                        margin: '0',
                        color: '#166534',
                        fontWeight: '600'
                      }}>Answer:</p>
                      <p style={{
                        margin: '0.5rem 0 0 0',
                        color: '#4b5563',
                        fontStyle: 'normal'
                      }}>{question.answer}</p>
                    </div>
                  )}
                  <p style={{
                    margin: '0.25rem 0',
                    color: '#9ca3af',
                    fontSize: '0.9rem'
                  }}>Submitted on: {new Date(question.createdAt).toLocaleString()}</p>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  {!question.answer ? (
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      alignItems: 'center',
                      flex: 1
                    }}>
                      <textarea
                        placeholder="Enter your answer..."
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          fontSize: '0.9rem',
                          resize: 'vertical',
                          minHeight: '60px'
                        }}
                        defaultValue={question.answer}
                      ></textarea>
                      <button
                        onClick={() => {
                          const answer = prompt('Enter your answer for this question:', question.answer || '');
                          if (answer !== null) {
                            updateQuestion(question._id, { answer, status: 'answered' });
                          }
                        }}
                        style={{
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.5rem 1rem',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
                      >
                        Answer
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        const answer = prompt('Update answer:', question.answer);
                        if (answer !== null) {
                          updateQuestion(question._id, { answer, status: 'answered' });
                        }
                      }}
                      style={{
                        backgroundColor: '#0b7ac4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        flex: 1
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#09609d'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#0b7ac4'}
                    >
                      Update Answer
                    </button>
                  )}
                  <button
                    onClick={() => updateQuestion(question._id, { status: question.status === 'answered' ? 'pending' : 'answered' })}
                    style={{
                      backgroundColor: '#f59e0b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#d97706'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#f59e0b'}
                  >
                    {question.status === 'answered' ? 'Mark Pending' : 'Mark Answered'}
                  </button>
                  <button
                    onClick={() => deleteQuestion(question._id)}
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