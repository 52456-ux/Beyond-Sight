export default function Header() {
  return (
    <header className="header">
      <div className="container nav">
        <a className="logo" href="index.html">Beyond Sight</a>
        <nav aria-label="Main navigation">
          <ul className="nav-links">
            <li><a className="active" href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="post1.html">Articles</a></li>
            <li><a href="#resources">Resources</a></li>
            <li><a href="login.html">Log In</a></li>
            <li><a href="register.html">Register</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
