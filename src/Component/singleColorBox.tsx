import React, { useState, useRef } from 'react';
import { ChromePicker } from 'react-color';
import { Box, Button, styled } from '@mui/material';

interface ColorBoxProps {
  initialColor?: string[];
  onSave?: (palette: string[]) => void;
}

const ColorSection = styled(Box)(({ theme, backgroundColor }) => ({
  width: '100%',
  backgroundColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '1px solid',
  ...(backgroundColor !== undefined && {
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
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

const SingleColorBox: React.FC<ColorBoxProps> = ({
  initialColor = ['#BBBBBB', '#CCCCCC', '#DDDDDD', '#EEEEEE'],
  onSave,
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);
  const [sectionColors, setSectionColors] = useState(initialColor);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = boxRef.current?.getBoundingClientRect();
    if (rect) {
      const y = event.clientY - rect.top;
      const height = rect.height;
      let clickedIndex = -1;
      if (y < height * 0.4) clickedIndex = 0;
      else if (y < height * 0.6) clickedIndex = 1;
      else if (y < height * 0.8) clickedIndex = 2;
      else clickedIndex = 3;

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

  const handleSave = () => {
    if (onSave) onSave(sectionColors);
  };

  return (
    <Box sx={{ margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <StyledColorBox ref={boxRef} onClick={handleClick}>
        <ColorSection sx={{ height: '40%' }} backgroundColor={sectionColors[0]} />
        <ColorSection sx={{ height: '30%' }} backgroundColor={sectionColors[1]} />
        <ColorSection sx={{ height: '20%' }} backgroundColor={sectionColors[2]} />
        <ColorSection sx={{ height: '20%' }} backgroundColor={sectionColors[3]} />
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
            color={sectionColors[activeSectionIndex ?? 0]}
            onChange={handleChange}
          />
        </Box>
      )}

      <Button onClick={handleSave} variant="contained" sx={{ mt: 2 }}>
        Save Palette
      </Button>
    </Box>
  );
};

export default SingleColorBox;
