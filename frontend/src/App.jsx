import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/global.css";

// Public site components
import Loader       from "./components/Loader";
import Nav          from "./components/Nav";
import Hero         from "./components/Hero";
import Marquee      from "./components/Marquee";
import About        from "./components/About";
import Philosophy   from "./components/Philosophy";
import Divisions    from "./components/Divisions";
import Gallery      from "./components/Gallery";
import CaseStudy    from "./components/CaseStudy";
import Founder      from "./components/Founder";
import Testimonials from "./components/Testimonials";
import Journal      from "./components/Journal";
import Contact      from "./components/Contact";
import Footer       from "./components/Footer";

// Admin
import AdminDashboard from "./pages/AdminDashboard";

function PublicSite() {
  const [ready, setReady] = useState(false);
  return (
    <>
      {!ready && <Loader onDone={() => setReady(true)} />}
      <div style={{ opacity: ready ? 1 : 0, transition: "opacity 0.8s ease" }}>
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <Philosophy />
        <Divisions />
        <Gallery />
        <CaseStudy />
        <Founder />
        <Testimonials />
        <Journal />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<PublicSite />} />
        <Route path="/admin"  element={<AdminDashboard />} />
        <Route path="/admin/" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
