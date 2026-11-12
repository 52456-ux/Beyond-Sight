import { useEffect, useState } from 'react';
import Header from './components/Header';
import PostCard from './components/PostCard';
import ResourceManager from './components/ResourceManager';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './App.css';

const posts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop',
    imageAlt: 'Laptop on a desk',
    meta: 'September 15, 2026 · Personal Journey · Alex',
    title: 'How partial vision loss changed my life — and gave it new purpose',
    description: 'When my vision started fading, I thought my world was shrinking. Instead, it opened a path I never expected: helping others who walk the same road.',
    href: 'post1.html',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop',
    imageAlt: 'Ocean and beach',
    meta: 'September 10, 2026 · Practical Tips · Alex',
    title: 'Everyday tools that make life with low vision easier',
    description: 'From screen readers and magnification apps to simple home adjustments — practical things that can help people become more independent.',
    href: 'post2.html',
  },
];

export default function App() {
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    fetch('/api/status')
      .then((response) => {
        if (!response.ok) throw new Error('Server is not available');
        return response.json();
      })
      .then((data) => setApiStatus(data.status === 'ok' ? 'online' : 'offline'))
      .catch(() => setApiStatus('offline'));
  }, []);

  return (
    <div>
      <Header />
      <section className="hero">
        <div className="container">
          <h1>Welcome to Beyond Sight</h1>
          <p>Living with low vision and helping others find their way</p>
          <a href="#posts" className="btn btn-light">Read the articles</a>
        </div>
      </section>

      <main className="container">
        <div className="layout">
          <section className="posts" id="posts">
            <h2 className="section-title">Latest posts</h2>
            {posts.map((post) => <PostCard key={post.id} post={post} />)}
          </section>
          <Sidebar />
        </div>

        <section className="react-resources" id="resources">
          <div className="resources-heading">
            <div>
              <p className="eyebrow">REACT + EXPRESS</p>
              <h2 className="section-title">Accessibility resources</h2>
              <p className="section-description">
                This list is loaded from the Node.js backend. You can search,
                add and delete resources.
              </p>
            </div>
            <span className={`api-status ${apiStatus}`}>
              {apiStatus === 'checking' ? 'Checking server…' :
                apiStatus === 'online' ? 'Backend connected' : 'Backend offline'}
            </span>
          </div>
          <ResourceManager />
        </section>
      </main>
      <Footer />
    </div>
  );
}
