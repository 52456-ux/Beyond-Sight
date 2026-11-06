import React, { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('Please enter a valid email address!');
      setIsError(true);
    } else {
      setStatus(`Welcome back, ${email}!`);
      setIsError(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Account Sign In</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />
        </div>
        <button type="submit" className="submit-btn">
          Sign In
        </button>
      </form>
      {status && (
        <p className="status-message" style={{ color: isError ? '#dc2626' : '#16a34a' }}>
          {status}
        </p>
      )}
    </div>
  );
}