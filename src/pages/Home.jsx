import React, { useState, useEffect } from 'react';

const Home = () => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);

  const fetchSongs = (searchTerm = '') => {
  const url = `${import.meta.env.VITE_API_URL}/songs?q=${encodeURIComponent(searchTerm)}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('Network error');
      return res.json();
    })
    .then(data => {
      setSongs(data);
      setError(data.length === 0 ? 'No songs found.' : null);
    })
    .catch(() => {
      setError('Something went wrong while fetching songs.');
      setSongs([]);
    });
};

  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSongs(query);
    }, 400);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="container" data-aos="fade-up">
      <h1 data-aos="fade-down">Search & Play Music</h1>

      <div className="search-bar" data-aos="fade-up" data-aos-delay="200">
        <input
          type="text"
          placeholder="Search for songs or artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {error && <div className="error" data-aos="fade-in">{error}</div>}

      <h2 style={{ textAlign: 'center' }} data-aos="zoom-in">MUSIC</h2>

      <div className="song-list">
        {songs.map((song, i) => (
          <div
            className="song-card"
            key={song.id}
            data-aos="zoom-in"
            data-aos-delay={i * 50}
          >
            <img src={song.artworkUrl100} alt={song.trackName} />
            <h3>{song.trackName}</h3>
            <p>{song.artistName}</p>
            <audio controls src={song.previewUrl}></audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
