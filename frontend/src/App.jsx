import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
// import Items from './pages/Galleries';
import Services from './pages/Services';
import About from './pages/About';
import Auth from './pages/Auth';
import Projects from './pages/Projects';
import Galleries from './pages/Galleries';

import DonationPage from './pages/DonationPage';
import UpdatePassword from './pages/UpdatePassword';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* --- 1. LOGIN --- */}
        <Route path="/login" element={<Auth />} />
        <Route path="/update-password" element={<UpdatePassword />} />

        {/* --- 2. PUBLIC ROUTES --- */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="gallery" element={<Galleries />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="our-projects" element={<Projects />} />
          <Route path="services/donate" element={<DonationPage />} />
        </Route>
        {/* --- 5. REDIRECTS & 404 --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;