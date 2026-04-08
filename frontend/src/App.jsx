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

import DefaultPage from './pages/DefaultPage';

// Foundation page
import OnePackage from './pages/foundation/OnePackage';
import DawuroZone from './pages/services/DawuroZone';

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
          <Route path="donate" element={<DonationPage />} />


          {/* Default page */}
          <Route path="/services/documentary" element={<DefaultPage pageTitle="Documentary" />} />
          <Route path="/services/dawuro-zone" element={<DefaultPage pageTitle="Dawuro Zone" />} />
          <Route path="/services/entertainment" element={<DefaultPage pageTitle="Entertainment" />} />
          <Route path="/services/foundation" element={<DefaultPage pageTitle="Foundation" />} />
          <Route path="/services/news" element={<DefaultPage pageTitle="News" />} />
          <Route path="/services/interview" element={<DefaultPage pageTitle="Interview" />} />
          


          {/* Foundation page */}
          <Route path="/services/foundation/package" element={<OnePackage />} />
          <Route path="/services/foundation/dawuro-zone" element={<DawuroZone />} />


        </Route>
        {/* --- 5. REDIRECTS & 404 --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;