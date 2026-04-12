"use client";

import { useState, useEffect } from 'react';
import { getStories } from '@/lib/api/healthPackages';
import styles from './patientRecovery.module.css';

export default function PatientRecoveryPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await getStories();
        setStories(data);
      } catch (err) {
        console.error('Error fetching stories:', err);
        setError(err.message);
        // Fallback to default stories if API fails
        setStories([
          {
            _id: 1,
            title: "Back to Normal Life After Cardiac Surgery",
            patient: "Mr. A",
            summary:
              "After undergoing successful cardiac surgery at our hospital, Mr. A has returned to his normal daily activities.",
          },
          {
            _id: 2,
            title: "Quick Recovery from Orthopedic Injury",
            patient: "Ms. B",
            summary:
              "Ms. B made an excellent recovery with the help of our orthopedic and physiotherapy team.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Patient Recovery Stories</h2>
          <p className={styles.subtitle}>
            Read inspiring recovery stories from our patients.
          </p>
        </div>
        <div className={styles.loading}>
          Loading stories...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Patient Recovery Stories</h2>
          <p className={styles.subtitle}>
            Read inspiring recovery stories from our patients.
          </p>
        </div>
        <div className={styles.error}>
          Error loading stories: {error}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Patient Recovery Stories</h2>
        <p className={styles.subtitle}>
          Read inspiring recovery stories from our patients.
        </p>
      </div>
      <div className={styles.storiesGrid}>
        {stories.map((story) => (
          <div key={story._id} className={styles.storyCard}>
            {story.image && (
              <img 
                src={story.image} 
                alt={story.title}
                className={styles.storyImage}
              />
            )}
            <h3 className={styles.storyTitle}>{story.title}</h3>
            <p className={styles.storyPatient}>Patient: {story.patient}</p>
            <p className={styles.storySummary}>{story.summary}</p>
            {story.content && (
              <div className={styles.storyContent}>
                <p>{story.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
