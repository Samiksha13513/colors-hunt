import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import colorPalettes from '../data/colors.json';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const BoxComponent: React.FC = () => {
  const [palettes, setPalettes] = useState<string[][]>([]);

  useEffect(() => {
   
    setPalettes(colorPalettes);
  }, []);

  return (
    <Box sx={{ p: 3, display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {palettes.map((palette, index) => (
        <Box
          key={index}
          sx={{
            width: 230,
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: 0,
            backgroundColor: '#fff',
          }}
        >
          <Box sx={{ borderRadius: 4, overflow: 'hidden' }}>
            {palette.map((color, idx) => (
              <Box
                key={idx}
                sx={{
                  height: 60,
                  backgroundColor: color,
                }}
              />
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1.5,
              px: 2,
            }}
          >
            <Button
              size="small"
              sx={{
                textTransform: 'none',
                color: 'black',
                fontWeight: 500,
                border: '1px solid rgb(223, 222, 222)',
                justifyContent: 'space-between',
              }}
            >
              <FavoriteBorderIcon />
              140
            </Button>

            <Typography variant="caption" color="text.secondary">
              3 hours ago
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default BoxComponent;
