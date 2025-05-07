import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Header from './Component/Header';
import Sidebar from './Component/Sidebar';
import BoxComponent from './Component/BoxComponent';
import CreateComponent from './Component/CreateComponent';
import CollectionComponent from './Component/CollectionComponent'; 

const App: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('New');

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Header onSelectMenu={setSelectedMenu} />

      <Sidebar onMenuClick={(menu) => setSelectedMenu(menu)} />

      <Box sx={{ flexGrow: 1, paddingTop: '64px' }}>
        {(selectedMenu === 'New' ||
          selectedMenu === 'Popular' ||
          selectedMenu === 'Random' ||
          selectedMenu === 'Pastel' ||
          selectedMenu === 'Palettes') && <BoxComponent />}

        {selectedMenu === 'Create' && <CreateComponent />}
        {selectedMenu === 'Collection' && <CollectionComponent />} {/* ✅ */}
      </Box>
    </Box>
  );
};

export default App;
