import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Header from './Component/Header';
import Sidebar from './Component/Sidebar';
import BoxComponent from './Component/BoxComponent';
import CreateComponent from './Component/CreateComponent';
import CollectionComponent from './Component/CollectionComponent';

const App: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('New');
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const handlePaletteAdded = () => {
    setRefreshKey((prev) => prev + 1);
    setSelectedMenu('Collection');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Header onSelectMenu={setSelectedMenu} />
      
      
      {selectedMenu !== 'Create' && (
        <Sidebar onMenuClick={(menu) => setSelectedMenu(menu)} />
      )}

      <Box sx={{ flexGrow: 1, paddingTop: '64px' }}>
        {(selectedMenu === 'New' ||
          selectedMenu === 'Popular' ||
          selectedMenu === 'Random' ||
          selectedMenu === 'Pastel' ||
          selectedMenu === 'Palettes') && <BoxComponent />}

        {selectedMenu === 'Collection' && (
          <CollectionComponent refreshTrigger={refreshKey} />
        )}

        {selectedMenu === 'Create' && (
          <CreateComponent />
        )}
      </Box>
    </Box>
  );
};

export default App;
