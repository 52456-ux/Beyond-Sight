import React from 'react';

export default function ResourceCard({ resource }) {
  return (
    <div className="resource-card">
      <div>
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
      </div>
      <span className="badge">{resource.category}</span>
    </div>
  );
}