import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Auth from './pages/Auth';
import Galleries from './pages/Galleries';

import DonationPage from './pages/DonationPage';
import UpdatePassword from './pages/UpdatePassword';
import ScrollToTop from './components/ScrollToTop';

import DefaultPage from './pages/DefaultPage';

// Foundation page
import OnePackage from './pages/OnePackage';
import DawuroZone from './pages/services/DawuroZone';
import AdminSidebarLayout from './components/AdminSidebarLayout';
import ContentsPage from './pages/ContentsPage';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userRole = localStorage.getItem('user_role');
    if (token) {
      console.log('Logged in as:', userRole || 'unknown', 'Token:', token);
    } else {
      console.log('Not logged in');
    }
  }, []);

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
          <Route path="services/content/projects" element={<ContentsPage />} />
          <Route path="donate" element={<DonationPage />} />

          {/* Default page */}
          <Route path="services/documentary" element={<DefaultPage pageTitle="Documentary" />} />
          <Route path="services/dawuro-zone" element={<DefaultPage pageTitle="Dawuro Zone" />} />
          <Route path="services/entertainment" element={<DefaultPage pageTitle="Entertainment" />} />
          <Route path="services/foundation" element={<DefaultPage pageTitle="Foundation" />} />
          <Route path="services/news" element={<DefaultPage pageTitle="News" />} />
          <Route path="services/interview" element={<DefaultPage pageTitle="Interview" />} />

          {/* Foundation page */}
          <Route path="services/foundation/package" element={<OnePackage />} />
          <Route path="services/foundation/dawuro-zone" element={<DawuroZone />} />
        </Route>

        {/* --- 3. ADMIN ROUTES --- */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['superadmin','admin','editor']} />
        }>
          <Route path="*" element={<AdminSidebarLayout />} />
        </Route>

        {/* --- 5. REDIRECTS & 404 --- */}
        <Route path="*" element={<DefaultPage pageTitle="404 - Not Found" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;