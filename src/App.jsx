import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import './App.css';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate high-performance loading
    setIsLoaded(true);
  }, []);

  return (
    <Router>
      <div className={`flex flex-col min-h-screen font-sans bg-white antialiased text-slate-900 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
