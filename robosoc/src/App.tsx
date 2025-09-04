import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import Home from "./home";
import AboutUs from "./aboutus";
import Projects from "./projects";
import Achievements from "./achievement";
import Inventory from "./inventory";
import ContactUs from "./contactus";
import AdminPanel from "./admin";
import LineFollowerLoader from "./components/LineFollowerLoader";
import Members from "./members"; // don’t forget to import

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (replace with actual checks if needed)
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LineFollowerLoader />;
  }

  return (
    <SmoothScrollProvider>
      <div className="App">
        <Header />
        <main className="md:ml-0 ml-16 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/members" element={<Members />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/Campaign's" element={<Inventory />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <div className="md:ml-0 ml-16 transition-all duration-300 relative z-30">
          <Footer />
        </div>
      </div>
    </SmoothScrollProvider>
  );
}

export default App;
