
import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; 
import WhatshotIcon from '@mui/icons-material/Whatshot';       
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'; 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const drawerWidth = 175;

interface SidebarProps {
  onMenuClick: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick }) => {
  const menuItems = [
    { label: 'New', icon: <AutoAwesomeIcon /> },
    { label: 'Popular', icon: <WhatshotIcon /> },
    { label: 'Random', icon: <AllInclusiveIcon /> },
    { label: 'Collection', icon: <FavoriteBorderIcon /> },
   
   // { label: 'Pastel',  },
    // { label: 'Vintage'},
    // { label: 'Retro',  },
    // { label: 'Neon',  },
    // { label: 'Gold',   },
    // { label: 'Light',   },
    // { label: 'Dark',   },
    // { label: 'Warm',  },
    // { label: 'Cold',  },
    // { label: 'Summer',  },
    // { label: 'Fall',  },
    // { label: 'Winter',   },
    // { label: 'Spring',   },>
  ];
  // console.log('menuItems:')
  const project =import.meta.env.VITE_SUPABASE_PROJECT_NAME
  const key = import.meta.env.VITE_SUPABASE_API_KEY
    console.log('Project:', project);
  console.log('Key:', key);
  return (
    <Box sx={{ display: 'flex', marginTop: '55px' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'fixed',
            top: '50px',
            borderRight: 'none', 
            boxShadow: 'none',  
          },
        }}
      >
        <Box sx={{ overflowY: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} disablePadding onClick={() => onMenuClick(item.label)}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
