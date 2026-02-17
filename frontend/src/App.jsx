import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Items from './pages/Items';
import Services from './pages/Services';
import About from './pages/About';
import Login from './pages/Login';
import Orders from './pages/Orders'; // Public tracking
import Galleries from './pages/Galleries';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- 1. LOGIN --- */}
        <Route path="/login" element={<Login />} />

        {/* --- 2. PUBLIC ROUTES --- */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="items" element={<Items />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="my-orders" element={<Orders />} />
        </Route>
        

        {/* --- 5. REDIRECTS & 404 --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;