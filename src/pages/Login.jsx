import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' }); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form), 
      });

      if (!res.ok) throw new Error('Login failed');

      const user = await res.json();
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      onLogin(user);
      navigate('/add-song');
    } catch {
      setError('❌ Invalid credentials or server error');
    }
  };

  return (
    <div className="form-card" data-aos="fade-up">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Log In</button>
      </form>

      {error && <p>{error}</p>}

      <p style={{ marginTop: '1.5rem', color: 'white' }}>
        Don’t have an account?{' '}
        <Link to="/signup" style={{ color: '#1db954', textDecoration: 'underline' }}>
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
