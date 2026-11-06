import React, { useState } from 'react';
import Header from './components/Header';
import ResourceCard from './components/ResourceCard';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [resources] = useState([
    {
      id: 1,
      title: 'Screen Reader Essentials Guide',
      description: 'Comprehensive overview of navigating web components using assistive technologies.',
      category: 'Accessibility',
    },
    {
      id: 2,
      title: 'Contrast & Color Palette Best Practices',
      description: 'Guidelines for selecting accessible contrast ratios for low-vision users.',
      category: 'Design',
    },
    {
      id: 3,
      title: 'Keyboard Navigation Workflows',
      description: 'Ensuring seamless interactive element focus without mouse input.',
      category: 'Development',
    },
  ]);

  return (
    <div className="page-container">
      <Header title="Beyond Sight" />

      <main>
        <h2 className="section-title">Featured Resources</h2>
        {resources.map((item) => (
          <ResourceCard key={item.id} resource={item} />
        ))}

        <LoginForm />
      </main>

      <Footer copyright="© 2026 Beyond Sight Project. All rights reserved." />
    </div>
  );
}