import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function AddSong() {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album_cover: '',
    file: null,
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const songData = new FormData();
    songData.append('title', formData.title);
    songData.append('artist', formData.artist);
    songData.append('album_cover', formData.album_cover);
    songData.append('file', formData.file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/songs`, {
        method: 'POST',
        credentials: 'include',
        body: songData, // do not set Content-Type manually
      });

      if (!res.ok) throw new Error('Failed to upload song.');

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
      setFormData({
        title: '',
        artist: '',
        album_cover: '',
        file: null,
      });
    } catch (err) {
      setError(err.message || 'Something went wrong.');
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
            name="title"
            placeholder="Song Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="artist"
            placeholder="Artist Name"
            value={formData.artist}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="album_cover"
            placeholder="Album Cover URL (image)"
            value={formData.album_cover}
            onChange={handleChange}
          />
          <input
            type="file"
            name="file"
            accept=".mp3"
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
