import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from './Component/Header';
import Sidebar from './Component/Sidebar';
import BoxComponent from './Component/BoxComponent';
import CreateComponent from './Component/CreateComponent';
import CollectionComponent from './Component/CollectionComponent';
import NewComponent from './Component/NewComponent';

const MainLayout: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePaletteAdded = () => {
    setRefreshKey((prev) => prev + 1);
    navigate('/collection');
  };

  const isCreatePage = location.pathname === '/create';

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Header onSelectMenu={(menu) => navigate(`/${menu.toLowerCase()}`)} />
   
      {!isCreatePage && (
        <Sidebar onMenuClick={(menu) => navigate(`/${menu.toLowerCase()}`)} />
      )}

      <Box sx={{ flexGrow: 1, paddingTop: '64px' }}>
        <Routes>
          <Route path="/new" element={<NewComponent />} />
          <Route path="/popular" element={<BoxComponent />} />
          <Route path="/random" element={<BoxComponent />} />
          <Route path="/:colorname" element={<BoxComponent />} />
          <Route path="/palettes" element={<BoxComponent />} />
          <Route path="/collection" element={<CollectionComponent refreshTrigger={refreshKey} />} />
          <Route path="/create" element={<CreateComponent onPaletteAdded={handlePaletteAdded} />} />
          <Route path="*" element={<BoxComponent />} />
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
