import React from "react";
import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';

export default function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/api/enrollments/admin/all')
      .then(data => setEnrollments(data.enrollments))
      .catch(err => setError(err.message));
  }, []);

  return (
    <section className="page admin-report">
      <div className="pagehead">
        <div>
          <p className="eyebrow">LEARNER ACTIVITY</p>
          <h2>Recent enrollments</h2>
        </div>
      </div>
      {error && <div className="alert" role="alert">{error}</div>}
      {!error && enrollments.length === 0 && (
        <div className="empty">No enrollments to report yet.</div>
      )}
      {enrollments.length > 0 && (
        <div className="panel enrollment-list">
          {enrollments.map(enrollment => (
            <article className="admin-enrollment" key={enrollment._id}>
              <div>
                <b>{enrollment.student?.name || 'Unknown student'}</b>
                <small>{enrollment.student?.email || 'Student account unavailable'}</small>
              </div>
              <div>
                <b>{enrollment.course?.title || 'Course unavailable'}</b>
                <small>{enrollment.completed ? 'Completed' : 'In progress'}</small>
              </div>
              <div className="enrollment-progress">
                <div className="bar" aria-label={`Progress: ${enrollment.progress}%`}>
                  <span style={{ width: `${enrollment.progress}%` }} />
                </div>
                <small>{enrollment.progress}% complete</small>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

