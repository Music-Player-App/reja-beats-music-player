import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const images = [
  '/Drake Poster.jpeg',
  '/singer-main.png',
  '/kendrick lamar.jpeg',
];

function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip(true);
      setTimeout(() => {
        setCurrentImage(prev => (prev + 1) % images.length);
        setFlip(false);
      }, 500); 
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-wrapper">
      <div className="hero-left" data-aos="fade-right">
        <h1>
          Live Music Creation for <span className="highlight">Everyone</span>
        </h1>
        <p>
          Your Music, Your Rules. The Power to Add Any Song, just One Click Away. Only on Reja Beats!
        </p>
        <div className="hero-buttons" data-aos="fade-up" data-aos-delay="200">
          <Link to="/add-song" className="btn create">Add Music</Link>
          <Link to="/home" className="btn demo">▶ Play Music</Link>
        </div>
        <div className="hero-stats" data-aos="fade-up" data-aos-delay="400">
          <div><strong>10k+</strong><p>Music Templates</p></div>
          <div><strong>20k+</strong><p>Communities</p></div>
          <div><strong>15M+</strong><p>Daily Listeners</p></div>
        </div>
      </div>

      <div className="hero-right" data-aos="flip-left">
        <div className={`flip-card ${flip ? 'flip' : ''}`}>
          <img
            src={images[currentImage]}
            alt="hero"
            className="hero-img"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
