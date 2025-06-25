import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
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
      const res = await fetch(`http://localhost:3000/users?username=${form.username}`);
      const users = await res.json();
      const user = users.find(u => u.password === form.password);

      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        onLogin(user);
        navigate('/add-song');
      } else {
        setError('❌ Invalid credentials');
      }
    } catch {
      setError('❌ Login failed');
    }
  };

  return (
    <div className="form-card" data-aos="fade-up">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
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
