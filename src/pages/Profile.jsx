import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [passwords, setPasswords] = useState({ old_password: '', new_password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pwSuccess, setPwSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setFormData({ username: data.username, email: data.email });
      })
      .catch(() => setError('Failed to load profile'));
  }, []);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePwChange = e => {
    setPasswords(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Update failed');
      const updatedUser = await res.json();
      setUser(updatedUser);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Could not update profile');
    }
  };

  const handlePasswordUpdate = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(passwords),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPwSuccess('Password changed successfully!');
      setPasswords({ old_password: '', new_password: '' });
      setTimeout(() => setPwSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Could not change password');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error();
      navigate('/');
    } catch {
      setError('Failed to delete profile');
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      {/* Profile Info Update */}
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">Update Profile</button>
      </form>
      {success && <p className="success">{success}</p>}

      {/* Change Password */}
      <form onSubmit={handlePasswordUpdate} style={{ marginTop: '2rem' }}>
        <h3>Change Password</h3>
        <input
          type="password"
          name="old_password"
          value={passwords.old_password}
          onChange={handlePwChange}
          placeholder="Current password"
          required
        />
        <input
          type="password"
          name="new_password"
          value={passwords.new_password}
          onChange={handlePwChange}
          placeholder="New password"
          required
        />
        <button type="submit">Change Password</button>
      </form>
      {pwSuccess && <p className="success">{pwSuccess}</p>}

      {/* Delete Account */}
      <button onClick={handleDelete} className="delete-btn" style={{ marginTop: '2rem' }}>
        Delete Account
      </button>
    </div>
  );
}

export default Profile;
