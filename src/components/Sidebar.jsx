export default function Sidebar() {
  return (
    <aside className="sidebar">
      <section className="widget author-widget">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
          width="100"
          height="100"
          alt="Author profile"
        />
        <h3>Alex</h3>
        <p>Living with low vision and dedicated to helping others do the same — with practical advice, encouragement, and real stories.</p>
        <a href="about.html" className="btn btn-primary">Learn more</a>
      </section>
      <section className="widget">
        <h3 className="widget-title">Categories</h3>
        <ul className="category-list">
          <li>Personal Journey <span className="count">6</span></li>
          <li>Practical Tips <span className="count">9</span></li>
          <li>Accessibility Tools <span className="count">7</span></li>
          <li>Community <span className="count">5</span></li>
        </ul>
      </section>
      <section className="widget">
        <h3 className="widget-title">Popular</h3>
        <div className="popular-list">
          <a href="post1.html">How partial vision loss changed my life</a>
          <a href="post2.html">Everyday tools for low vision</a>
        </div>
      </section>
    </aside>
  );
}
