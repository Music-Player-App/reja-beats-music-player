import React, { useEffect, useState } from 'react';

function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setFormData({ username: data.username, email: data.email });
      })
      .catch(err => setError('Failed to load profile'));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
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

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) throw new Error();
      alert("Your profile was deleted.");
      // Optional: redirect or logout user
    } catch {
      setError('Failed to delete profile');
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

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

      <button onClick={handleDelete} className="delete-btn">
        Delete Account
      </button>

      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default Profile;
