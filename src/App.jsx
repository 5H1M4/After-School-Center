import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Events from './components/Events';
import Map from './components/Map';
import Contact from './components/Contact';
import Programs from './components/Programs';
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
              <Programs />
              <Events />
              <TestimonialList />
              {/*<BlogList />*/}{/*remove this comments to show the blog in scroll down in home*/}
             {/*<Calendar />*/} {/*remove this comments to show the calendar and book in scroll down in home*/}
              <Map />
              <Contact />
            </>
          } />
          <Route path="/programs" element={<Programs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}