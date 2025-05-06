import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Header from './Component/Header';
import Sidebar from './Component/Sidebar';
import BoxComponent from './Component/BoxComponent';

const App: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('New');

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Header />
      <Sidebar onMenuClick={(menu) => setSelectedMenu(menu)} />
      <Box sx={{ flexGrow: 1, paddingTop: '50px' }}>
        {selectedMenu === 'New' && <BoxComponent />}





        {selectedMenu === 'Popular' && <BoxComponent />}

        {selectedMenu === 'Random' && <BoxComponent />}
        {selectedMenu === 'Collection' && <BoxComponent />}
        {selectedMenu === 'Pastel' && <BoxComponent />}
        {selectedMenu === 'Palettes' && <BoxComponent />}





      </Box>
    </Box>
  );
};


export default App;
