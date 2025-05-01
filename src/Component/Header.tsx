import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  InputBase,
  styled,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Logo from '../assets/Logo.png';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  border: '1px solid rgb(209, 209, 209)',
  borderRadius: '24px',
  backgroundColor: 'transparent',
  marginLeft: theme.spacing(2),
  width: '70%',
  // maxWidth: 600,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgb(131, 130, 130)',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  width: '200%',
  '& .MuiInputBase-input': {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    backgroundColor: 'transparent',
  },
}));

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, position: 'fixed', width: '100%', zIndex: 1000 }}>
      <AppBar
        elevation={0}
        sx={{
          backgroundColor: 'white',
          borderBottom: '1px solidrgb(160, 27, 27)', 
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1,width:'80' }}>
            <img src={Logo} alt="Logo" style={{ height: 60, marginRight: 28 }} />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search palettes" inputProps={{ 'aria-label': 'search' }} />
            </Search>
          </Box>

       
          <IconButton edge="end" onClick={handleMenuOpen} sx={{ color: 'grey.700',borderRadius: '50%' }}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleMenuClose}>Palettes</MenuItem>
            <MenuItem onClick={handleMenuClose}>Create</MenuItem>
            <MenuItem onClick={handleMenuClose}>Collection</MenuItem>
            <MenuItem onClick={handleMenuClose}>About</MenuItem>
            <MenuItem onClick={handleMenuClose}>Instagram</MenuItem>
            <MenuItem onClick={handleMenuClose}>Terms of Service</MenuItem>
            <MenuItem onClick={handleMenuClose}>Privacy Policy </MenuItem>
            <MenuItem onClick={handleMenuClose}>Made by Gal Singh</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
