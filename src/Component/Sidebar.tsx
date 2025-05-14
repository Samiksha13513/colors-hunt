import React, { useState, useRef } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  ClickAwayListener,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const popularRef = useRef<HTMLLIElement>(null);

  const dropdownOptions = ['Month', 'Year', 'All Time'];
  const menuItems = [
    { label: 'New', icon: <AutoAwesomeIcon /> },
    { label: 'Popular', icon: <WhatshotIcon /> },
    { label: 'Random', icon: <AllInclusiveIcon /> },
    { label: 'Collection', icon: <FavoriteBorderIcon /> },
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
    { label: 'Happy' },
  ];

  const drawerContent = (
    <Box
      sx={{
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        mt: isMobile ? 0 : '50px',
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
                      if (isMobile) setMobileOpen(false);
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
                      '&:hover': { backgroundColor: '#F0F0F0' },
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
                            if (isMobile) setMobileOpen(false);
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
  );

  return (
    <Box sx={{ display: 'flex', marginTop: isMobile ? 0 : '55px' }}>
      <CssBaseline />

      {isMobile && (
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setMobileOpen(!mobileOpen)}
          sx={{ position: 'fixed', top: 10, left: 10, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              top: 0,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        // Desktop Drawer
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
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
