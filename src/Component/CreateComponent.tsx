
import React, { useState, useRef } from 'react';
import { ChromePicker } from 'react-color';
import { Box, Button, styled } from '@mui/material';
import { supabase } from '../SupabaseConfig';

interface CreatePaletteProps {
  onPaletteAdded?: () => void; 
}

const ColorSection = styled(Box)(({ theme, backgroundColor }: any) => ({
  width: '100%',
  backgroundColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const StyledColorBox = styled(Box)({
  width: '290px',
  height: '299px',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  border: '2px solid black',
  borderRadius: '8px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '20px',
});

const CreatePalette: React.FC<CreatePaletteProps> = ({ onPaletteAdded }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);
  const [sectionColors, setSectionColors] = useState([
    '#BBBBBB',
    '#CCCCCC',
    '#DDDDDD',
    '#EEEEEE',
  ]);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = boxRef.current?.getBoundingClientRect();
    if (rect) {
      const y = event.clientY - rect.top;
      const height = rect.height;
      let clickedIndex = -1;
      if (y < height * 0.4) {
        clickedIndex = 0;
      } else if (y < height * 0.6) {
        clickedIndex = 1;
      } else if (y < height * 0.8) {
        clickedIndex = 2;
      } else {
        clickedIndex = 3;
      }
      setActiveSectionIndex(clickedIndex);
      setDisplayColorPicker(true);
    }
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
    setActiveSectionIndex(null);
  };
   
 

  const handleChange = (newColor: { hex: string }) => {
    if (activeSectionIndex !== null) {
      const updatedColors = [...sectionColors];
      updatedColors[activeSectionIndex] = newColor.hex;
      setSectionColors(updatedColors);
    }
  };

  const handleSubmit = async () => {
    if (sectionColors.length !== 4) {
      alert('Please select exactly 4 colors.');
      return;
    }
    
    const { data, error } = await supabase
      .from('color_palettes')
      .insert([
        { colors: sectionColors, },
      ]);

    if (error) {
      console.error('Error saving palette:', error);
      alert('Failed to save. Check console for details.');
    } else {
      alert('Palette saved!');
      if (onPaletteAdded) onPaletteAdded(); 
    }
  };

  return (
    <Box sx={{ margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Create Your Palette</h2>
      <p>Click on a section to change its color</p>
      <StyledColorBox ref={boxRef} onClick={handleClick}>
        <ColorSection sx={{ height: '40%' }} backgroundColor={sectionColors[0]} />
        <ColorSection sx={{ height: '30%' }} backgroundColor={sectionColors[1]} />
        <ColorSection sx={{ height: '20%' }} backgroundColor={sectionColors[2]} />
        <ColorSection sx={{ height: '10%' }} backgroundColor={sectionColors[3]} />
      </StyledColorBox>

      {displayColorPicker && (
        <Box sx={{ position: 'absolute' }}>
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
            color={sectionColors[activeSectionIndex !== null ? activeSectionIndex : 0]}
            onChange={handleChange}
          />
        </Box>
      )}

      <Button variant="contained" color="#EEEEEE" onClick={handleSubmit} sx={{ marginTop: 2 }}>
        Add to Collection
      </Button>
    </Box>
  );
};

export default CreatePalette;
