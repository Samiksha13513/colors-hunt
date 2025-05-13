import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from './Component/Header';
import Sidebar from './Component/Sidebar';
import BoxComponent from './Component/BoxComponent';
import CreateComponent from './Component/CreateComponent';
import CollectionComponent from './Component/CollectionComponent';
import NewComponent from './Component/NewComponent';
import About from './Component/About';
import Services from './Component/Services';
import Policy from './Component/Policy';

const MainLayout: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);
  };

  const handlePaletteAdded = () => {
    setRefreshKey((prev) => prev + 1);
    navigate('/collection');
  };

  const shouldShowSidebar = !['/create', '/about', '/services', '/policy'].includes(location.pathname);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Header isShaking={isShaking} onSelectMenu={(menu) => navigate(`/${menu.toLowerCase()}`)} />

      {shouldShowSidebar && (
        <Sidebar onMenuClick={(menu) => navigate(`/${menu.toLowerCase()}`)} />
      )}

      <Box sx={{ flexGrow: 1, paddingTop: '64px' }}>
        <Routes>
        <Route path="/new" element={<NewComponent onLike={triggerShake} refreshTrigger={refreshKey} />} />
          <Route path="/popular" element={<BoxComponent onLike={triggerShake} />} />
          <Route path="/random" element={<BoxComponent onLike={triggerShake} />} />
          <Route path="/:colorname" element={<BoxComponent onLike={triggerShake} />} />
          <Route path="/palettes" element={<BoxComponent onLike={triggerShake} />} />
          <Route path="/collection" element={<CollectionComponent refreshTrigger={refreshKey} />} />
          <Route path="/create" element={<CreateComponent onPaletteAdded={handlePaletteAdded} />} />
          <Route path="/about" element={< About />} />
          <Route path="/services" element={< Services />} />
          <Route path="/policy" element={< Policy />} />
          <Route path="*" element={<BoxComponent onLike={triggerShake} />} />
        </Routes>
      </Box>
    </Box>
  );
};

const App: React.FC = () => (
  <Router>
    <MainLayout />
  </Router>
);

export default App;