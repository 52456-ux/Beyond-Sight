import React from 'react';

export default function Header({ title }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <p>Accessibility & Inclusive Resources Platform</p>
    </header>
  );
}