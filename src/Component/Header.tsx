import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  keyframes,
  useMediaQuery,
  useTheme,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import FaceLogo from '../assets/color-hunt-logo-face.svg';
import TongueLogo from '../assets/color-hunt-logo-tongue.svg';

import TagSelector from './TagSelector';

interface HeaderProps {
  onSelectMenu: (menu: string) => void;
  isShaking: boolean;
}

const shake = keyframes`
  0% { transform: translateX(-50%) translateY(0); }
  25% { transform: translateX(-50%) translateY(-5px); }
  50% { transform: translateX(-50%) translateY(5px); }
  75% { transform: translateX(-50%) translateY(-5px); }
  100% { transform: translateX(-50%) translateY(0); }
`;

const Header: React.FC<HeaderProps> = ({ onSelectMenu, isShaking }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (menu: string) => {
    onSelectMenu(menu);
    handleMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1, position: 'fixed', width: '100%', zIndex: 1000 }}>
      <AppBar
        elevation={0}
        sx={{
          backgroundColor: 'white',
          borderBottom: '1px solid rgb(209, 209, 209)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {/* Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative', width: 60, height: 60, overflow: 'visible' }}>
              <Box
                component="img"
                src={TongueLogo}
                alt="color-hunt-logo-tongue"
                sx={{
                  position: 'absolute',
                  bottom: '6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1,
                  animation: isShaking ? `${shake} 0.5s ease-in-out` : 'none',
                }}
              />
              <Box
                component="img"
                src={FaceLogo}
                alt="color-hunt-logo-face"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 2,
                }}
              />
            </Box>

            {!isMobile && (
              <Typography
                sx={{ fontWeight: 600, fontSize: '1.2rem', color: '#333', ml: 1 }}
              >
                Color Hunt
              </Typography>
            )}
          </Box>

          {/* Search */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, ml: 3 }}>
              <TagSelector placeholder="Search Palettes" width="100%" />
            </Box>
          )}

          {/* Menu Button */}
          <IconButton
            edge="end"
            onClick={handleMenuOpen}
            sx={{ color: 'grey.700', borderRadius: '50%' }}
          >
            <MoreVertIcon />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => handleMenuItemClick('Palettes')}>Palettes</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Create')}>Create</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Collection')}>Collection</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('About')}>About</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Services')}>Terms of Service</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Policy')}>Privacy Policy</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
