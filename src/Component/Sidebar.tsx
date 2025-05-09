import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const drawerWidth = 175;
interface SidebarProps {
  onMenuClick: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick }) => {
  const [activeItem, setActiveItem] = useState<string>('');
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const popularRef = useRef<HTMLLIElement>(null);
  const dropdownOptions = [' Month', 'Year', 'All Time'];
  const menuItems = [
    { label: 'New', icon: <AutoAwesomeIcon /> },
    { label: 'Popular', icon: <WhatshotIcon /> },
    { label: 'Random', icon: <AllInclusiveIcon /> },
    { label: 'Collection', icon: <FavoriteBorderIcon /> },
  
    { label: 'Pastel' },
    { label: 'Vintage' },
    { label: 'Retro' },
    { label: 'Neon' },
    { label: 'Gold' },
    { label: 'Light' },
    { label: 'Dark' },
    { label: 'Warm' },
    { label: 'Cold' },
    { label: 'Summer' },
    { label: 'Fall' },
    { label: 'Winter' },
    { label: 'Spring' },
    { label: 'Random' },
    { label: 'Happy' },
    { label: 'New' },
    { label: 'Popular' },
    { label: 'Random' },
    { label: 'Collection' },
  ];
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
            top: '50px',
            borderRight: 'none',
            boxShadow: 'none',
          },
        }}
      >
        <Box
          sx={{
            overflowY: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            position: 'relative',
          }}
        >
          <ClickAwayListener onClickAway={() => setOpenDropdown(false)}>
            <List>
              {menuItems.map((item, index) => {
                const isAfterCollection = index > 3;
                const isActive = activeItem === item.label;
                const isPopular = item.label === 'Popular';
                const isDropdownActive = dropdownOptions.includes(activeItem);
                const isPopularActive = isPopular && (isActive || isDropdownActive);
                return (
                  <React.Fragment key={index}>
                    {index === 4 && <Divider sx={{ my: 1 }} />}
                    <ListItem
                      disablePadding
                      ref={isPopular ? popularRef : null}
                      onClick={() => {
                        if (isPopular) {
                          setOpenDropdown((prev) => !prev);
                        } else {
                          setActiveItem(item.label);
                          setOpenDropdown(false);
                          onMenuClick(item.label);
                        }
                      }}
                    >
                      <ListItemButton
                        selected={isPopularActive || isActive}
                        sx={{
                          backgroundColor:
                            isPopularActive || isActive ? '#E0E0E0' : 'transparent',
                          borderRadius: 1,
                          mx: 1,
                          '&:hover': {
                            backgroundColor: '#F0F0F0',
                          },
                        }}
                      >
                        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                        <ListItemText
                          primary={item.label}
                          sx={{
                            textAlign: isAfterCollection ? 'center' : 'left',
                            '& .MuiTypography-root': {
                              fontSize: isAfterCollection ? '0.75rem' : '1rem',
                            },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
             
                    {isPopular && openDropdown && (
                      <Box
                        sx={{
                          bgcolor: '#fff',
                          boxShadow: 3,
                          borderRadius: 2,
                          mt: 1,
                          mx: 2,
                          zIndex: 10,
                          overflow: 'hidden',
                        }}
                      >
                        {dropdownOptions.map((option, i) => {
                          const isSubActive = activeItem === option;
                          return (
                            <Box
                              key={i}
                              onClick={() => {
                                onMenuClick(option);
                                setOpenDropdown(false);
                                setActiveItem(option);
                              }}
                              sx={{
                                fontSize: '0.85rem',
                                px: 2,
                                py: 1,
                                cursor: 'pointer',
                                bgcolor: isSubActive ? '#E0E0E0' : 'transparent',
                                '&:hover': {
                                  backgroundColor: '#F5F5F5',
                                },
                              }}
                            >
                              {option}
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                  </React.Fragment>
                );
              })}
            </List>
          </ClickAwayListener>
        </Box>
      </Drawer>
    </Box>
  );
};
export default Sidebar;