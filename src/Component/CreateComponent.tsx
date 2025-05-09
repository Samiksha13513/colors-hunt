import React, { useState, useRef } from 'react';
import { ChromePicker } from 'react-color';
import {
  Box,
  Button,
  styled,
  InputBase,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
const Tag = styled(Box)(({ color }: { color: string }) => ({
  backgroundColor: '#fff',
  border: `2px solid ${color}`,
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  padding: '4px 8px',
  margin: '4px',
  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
}));
const ColorDot = styled(Box)(({ color }: { color: string }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: color,
  marginRight: 8,
}));
const getColorName = (hex: string) => {
  const names: { [key: string]: string } = {
    '#000000': 'Black',
    '#ffffff': 'White',
    '#ff0000': 'Red',
    '#00ff00': 'Lime',
    '#0000ff': 'Blue',
    '#ffff00': 'Yellow',
    '#00ffff': 'Cyan',
    '#ff00ff': 'Magenta',
    '#c0c0c0': 'Silver',
    '#808080': 'Gray',
    '#800000': 'Maroon',
    '#808000': 'Olive',
    '#008000': 'Green',
    '#800080': 'Purple',
    '#008080': 'Teal',
    '#000080': 'Navy',
  };
  const hexUpper = hex.toUpperCase();
  return names[hexUpper] || hexUpper;
};
const CreatePalette: React.FC<CreatePaletteProps> = ({ onPaletteAdded }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);
  const [sectionColors, setSectionColors] = useState([
    '#bbbbbb',
    '#cccccc',
    '#dddddd',
    '#eeeeee',
  ]);
  const [search, setSearch] = useState('');
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
  const handleSubmit = async () => {
    if (sectionColors.length !== 4) {
      alert('Please select exactly 4 colors.');
      return;
    }
    const { data, error } = await supabase
      .from('color_palettes')
      .insert([{ colors: sectionColors }]);
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
      <Typography variant="h5">Create Your Palette</Typography>
      <Typography variant="body2">Click on a section to change its color</Typography>
      <StyledColorBox ref={boxRef} onClick={handleClick}>
        <ColorSection sx={{ height: '40%' }} backgroundColor={sectionColors[0]} />
        <ColorSection sx={{ height: '30%' }} backgroundColor={sectionColors[1]} />
        <ColorSection sx={{ height: '20%' }} backgroundColor={sectionColors[2]} />
        <ColorSection sx={{ height: '10%' }} backgroundColor={sectionColors[3]} />
      </StyledColorBox>
      {displayColorPicker && (
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
            color={sectionColors[activeSectionIndex ?? 0]}
            onChange={handleChange}
          />
        </Box>
      )}
      <Paper
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 320,
          padding: '2px 8px',
          mb: 3,
          backgroundColor: '#f5f5f5',
          marginTop: 5,
        }}
        elevation={1}
      >
        <IconButton sx={{ p: '6px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for palettes..."
          inputProps={{ 'aria-label': 'search for palettes' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Paper>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>Colors</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {sectionColors.map((color, idx) => (
          <Tag
            key={idx}
            color={color}
            onClick={() =>
              setSearch(prev => (prev ? `${prev}, ${getColorName(color)}` : getColorName(color)))
            }
            sx={{ cursor: 'pointer' }}
          >
            <ColorDot color={color} />
            <Typography variant="caption">{getColorName(color)}</Typography>
          </Tag>
        ))}
      </Box>
      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Collection</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {['Nature', 'Ocean', 'Sunset', 'Ocean', 'Pastel', 'Peach', 'Cream', 'Grey'].map((label, i) => (
          <Tag
            key={i}
            color="#ddd"
            onClick={() =>
              setSearch(prev => (prev ? `${prev}, ${label}` : label))
            }
            sx={{ cursor: 'pointer' }}
          >
            <Typography variant="caption">{label}</Typography>
          </Tag>
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: 3,
          maxWidth: 320,
        }}
      >
        {sectionColors.map((color, idx) => (
          <Tag key={idx} color={color}>
            <ColorDot color={color} />
            <Typography variant="caption">{getColorName(color)}</Typography>
          </Tag>
        ))}
      </Box>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ marginTop: 3, backgroundColor: '#000', color: '#fff' }}
      >
        Add to Collection
      </Button>
    </Box>
  );
};
export default CreatePalette;









