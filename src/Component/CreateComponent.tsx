import React, { useState, useRef } from 'react';
import { ChromePicker } from 'react-color';
import { Box, Button, styled } from '@mui/material';

interface ColorBoxProps {
  initialColor?: string[];
  onColorChange?: (color: string, sectionIndex: number) => void;
}

const ColorSection = styled(Box)(({ theme, backgroundColor }) => ({
  width: '100%',
  backgroundColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '1px solid',
  marginTop:'auto',
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
  onColorChange,
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
      if (onColorChange) {
        onColorChange(newColor.hex, activeSectionIndex);
      }
    }
  };

  const popover = {
    position: 'absolute',
  };

  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  };

  return (
    <Box sx={{ margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <StyledColorBox ref={boxRef} onClick={handleClick}>
        <ColorSection sx={{ height: '40%' }} backgroundColor={sectionColors[0]} />
        <ColorSection sx={{ height: '30%' }} backgroundColor={sectionColors[1]} />
        <ColorSection sx={{ height: '20%' }} backgroundColor={sectionColors[2]} />
        <ColorSection sx={{ height: '20%', borderBottom: 'none' }} backgroundColor={sectionColors[3]} />
      </StyledColorBox>
      {displayColorPicker ? (
        <Box sx={popover}>
          <Box sx={cover} onClick={handleClose} />
          <ChromePicker
            color={sectionColors[activeSectionIndex !== null ? activeSectionIndex : 0]}
            onChange={handleChange}
          />
        </Box>
      
      ) : null}
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ marginLeft: 'auto', marginRight: 'auto', mt: 3 }}>
        <h4>New Color Palette</h4>
      </Box>
      <Box sx={{ marginLeft: 'auto', marginRight: 'auto', mt: 1, mb: 2 }}>
        <h6>Create a new palette and contribute to Color Hunt’s collection</h6>
      </Box>
      <SingleColorBox />
    </Box>
  );
};

export default App;
