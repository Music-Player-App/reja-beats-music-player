import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function AddSong() {
  const [formData, setFormData] = useState({
    trackName: '',
    artistName: '',
    artworkUrl100: '',
    previewUrl: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/songs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to upload song.');

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
      setFormData({
        trackName: '',
        artistName: '',
        artworkUrl100: '',
        previewUrl: '',
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="add-song-container" data-aos="fade-up">
      <div className="form-card">
        <h1>Add a New Song</h1>
        <p className="add-info">
          Fill out the details below to share your track with the REJA BEATS community.
        </p>

        <form className="song-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="trackName"
            placeholder="Song Title"
            value={formData.trackName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="artistName"
            placeholder="Artist Name"
            value={formData.artistName}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="artworkUrl100"
            placeholder="Album Cover URL (image)"
            value={formData.artworkUrl100}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="previewUrl"
            placeholder="Preview Audio URL"
            value={formData.previewUrl}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">
            Upload Song
          </button>
        </form>

        {success && (
          <p className="success-message" data-aos="fade-in">
            ✅ Song uploaded successfully!
          </p>
        )}
        {error && (
          <p className="error-message" data-aos="fade-in">
            ❌ {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default AddSong;
