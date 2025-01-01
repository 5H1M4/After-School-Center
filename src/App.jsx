import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Events from './components/Events';
import Map from './components/Map';
import Contact from './components/Contact';
import BlogList from './components/Blog/BlogList';
import TestimonialList from './components/Testimonials/TestimonialList';
import Calendar from './components/Calendar/Calendar';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Events />
              <TestimonialList />
              <BlogList />
              <Calendar />
              <Map />
              <Contact />
            </>
          } />
          <Route path="/events" element={<Events />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}