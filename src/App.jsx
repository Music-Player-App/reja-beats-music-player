import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import Home from './pages/Home';
import About from './pages/About';
import AddSong from './pages/AddSong';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import Profile from './pages/Profile'; // ← Import Profile page
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/add-song"
          element={user ? <AddSong /> : <Login onLogin={setUser} />}
        />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/logout"
          element={<Logout onLogout={() => setUser(null)} />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Login onLogin={setUser} />}
        /> {/* ← New Profile route */}
      </Routes>
    </Router>
  );
}

export default App;
