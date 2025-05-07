import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Box, Typography } from '@mui/material';

const CollectionComponent: React.FC = () => {
  const palettes = useSelector((state: RootState) => state.collection.palettes);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Saved Palettes</Typography>
      {palettes.length === 0 ? (
        <Typography>No palettes saved yet.</Typography>
      ) : (
        palettes.map((palette, index) => (
          <Box key={index} sx={{ display: 'flex', mb: 1 }}>
            {palette.map((color, i) => (
              <Box
                key={i}
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: color,
                  border: '1px solid #333',
                }}
              />
            ))}
          </Box>
        ))
      )}
    </Box>
  );
};

export default CollectionComponent;
