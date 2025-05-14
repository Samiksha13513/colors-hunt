import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import {
  Box,
  Button,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { supabase } from '../SupabaseConfig';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import TagSelector from '../Component/TagSelector';

interface CreatePaletteProps {
  onPaletteAdded?: () => void;
}

const StyledPaletteCard = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: '12px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  transition: '0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    height: 320,
  },
}));

const CreatePalette: React.FC<CreatePaletteProps> = ({ onPaletteAdded }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [activeColorIndex, setActiveColorIndex] = useState<number | null>(null);
  const [sectionColors, setSectionColors] = useState([
    '#bbbbbb',
    '#cccccc',
    '#dddddd',
    '#eeeeee',
  ]);
  const [hasPickedColor, setHasPickedColor] = useState(false);

  const handleClick = (index: number) => {
    setActiveColorIndex(index);
    setDisplayColorPicker(true);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
    setActiveColorIndex(null);
  };

  const handleChange = (newColor: { hex: string }) => {
    if (activeColorIndex !== null) {
      const updatedColors = [...sectionColors];
      updatedColors[activeColorIndex] = newColor.hex;
      setSectionColors(updatedColors);
      setHasPickedColor(true);
    }
  };

  const handleSubmit = async () => {
    if (sectionColors.length !== 4) {
      alert('Please select exactly 4 colors.');
      return;
    }

    const { error } = await supabase
      .from('color_palettes')
      .insert([{ colors: sectionColors }]);

    if (error) {
      console.error('Error saving palette:', error);
      alert('Failed to save. Check console for details.');
    } else {
      alert('Palette saved!');
      onPaletteAdded?.();
    }
  };

  return (
    <Box
      sx={{
        margin: '20px auto',
        px: 2,
        maxWidth: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          mb: 1,
          fontSize: '18px',
          fontWeight: 'bold',
          fontFamily: 'Inter, sans-serif',
          lineHeight: '140%',
          textAlign: 'center',
        }}
      >
        New Color Palette
      </Typography>

      <Typography
        variant="body2"
        sx={{ mb: 3, textAlign: 'center' }}
      >
        Create a new palette and contribute to Color Hunt’s collection
      </Typography>

      <StyledPaletteCard>
        {sectionColors.map((color, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              width: '100%',
              backgroundColor: color,
              cursor: 'pointer',
            }}
            onClick={() => handleClick(index)}
            title={`Click to change ${color}`}
          />
        ))}
      </StyledPaletteCard>

      {displayColorPicker && activeColorIndex !== null && (
        <Box sx={{ position: 'absolute', zIndex: 10 }}>
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            onClick={handleClose}
          />
          <ChromePicker
            color={sectionColors[activeColorIndex]}
            onChange={handleChange}
          />
        </Box>
      )}

      <Box
        sx={{
          mt: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <TagSelector
          placeholder="Add Tags"
          width={isMobile ? '100%' : '550px'}
        />
      </Box>

      {hasPickedColor && (
        <Button
          variant="outlined"
          onClick={handleSubmit}
          startIcon={<ArrowForwardIcon />}
          sx={{
            mt: 3,
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: '#797a7a',
            borderColor: '#ccc',
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            '&:hover': {
              borderColor: '#bbb',
              color: '#bbb',
            },
          }}
        >
          Submit Palette
        </Button>
      )}
    </Box>
  );
};

export default CreatePalette;
