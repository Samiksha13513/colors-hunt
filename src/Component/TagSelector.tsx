
import { useState, useRef, useEffect } from 'react';
import { Box, InputBase, Typography, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';


const Tag = styled(Box)<{ selected?: boolean }>(({ selected }) => ({
  backgroundColor: selected ? '#e0e0e0' : '#fff',
  border: '1px solid #ccc',
  borderRadius: '20px',
  padding: '6px 12px',
  margin: '4px',
  fontSize: '13px',
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: '0.2s',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

const Dot = styled('span')<{ color: string }>(({ color }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: color,
  marginRight: 8,
}));

const colorMap: Record<string, string> = {
  Blue: '#2196f3', Teal: '#009688', Mint: '#98ff98', Green: '#4caf50', Sage: '#b2ac88',
  Yellow: '#ffeb3b', Beige: '#f5f5dc', Brown: '#795548', Orange: '#ff9800', Peach: '#ffdab9',
  Red: '#f44336', Maroon: '#800000', Pink: '#e91e63', Purple: '#9c27b0', Navy: '#001f3f',
  Black: '#000000', Grey: '#9e9e9e', White: '#ffffff',
};

const collections = [
  'Pastel', 'Vintage', 'Retro', 'Neon', 'Gold', 'Light', 'Dark', 'Warm', 'Cold', 'Summer',
  'Fall', 'Winter', 'Spring', 'Happy', 'Nature', 'Earth', 'Night', 'Space', 'Rainbow',
  'Gradient', 'Sunset', 'Sky', 'Sea', 'Kids', 'Skin', 'Food', 'Cream', 'Coffee', 'Wedding',
  'Christmas', 'Halloween',
];

interface SelectedTag {
  name: string;
  hex?: string;
}

const TagSelector = ({ placeholder, width }: { placeholder?: string; width?: string }) => {
  const [search, setSearch] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [selectedTags, setSelectedTags] = useState<SelectedTag[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTagToggle = (tagName: string) => {
    const existingTag = selectedTags.find((tag) => tag.name === tagName);
    if (existingTag) {
      handleRemoveTag(tagName);
    } else {
      const hex = colorMap[tagName];
      setSelectedTags((prev) => [...prev, { name: tagName, hex }]);
    }
  };

  const handleRemoveTag = (tagNameToRemove: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag.name !== tagNameToRemove));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setInputFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const showSuggestions = inputFocused;
  const showSearchIcon = selectedTags.length === 0;

  return (
    <Box
      ref={containerRef}
      sx={{
        backgroundColor: '#fff',
        borderRadius: 8,
        position: 'relative',
        width,
        border: '1px solid #eee',
        '&:hover': {
          borderColor: '#ccc',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', px: 0.5, flexWrap: 'wrap' }}>
          {selectedTags.map((tag) => (
            <Chip
              key={tag.name}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {tag.hex && <Dot color={tag.hex} />}
                  {tag.name}
                </Box>
              }
              onDelete={() => handleRemoveTag(tag.name)}
              sx={{ m: 0.5 }}
              onDoubleClick={() => handleRemoveTag(tag.name)}
            />
          ))}
        </Box>
        <InputBase
          startAdornment={showSearchIcon ? <SearchIcon sx={{ mr: 1 }} /> : null}
          placeholder={placeholder}
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setInputFocused(true)}
          sx={{
            border: 'none',
            flexGrow: 1,
            minWidth: 100,
          }}
        />
      </Box>
      {showSuggestions && (
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            zIndex: 10,
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            p: 2,
            mt: 1,
          }}
        >
          <Typography variant="subtitle2" sx={{ mt: 1, mb: 1, color: 'black', fontFamily: 'sans-serif' }}>
            Colors
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2, color: 'black', fontFamily: 'sans-serif' }}>
            {Object.entries(colorMap).map(([name, hex]) => (
              <Tag
                key={name}
                onClick={() => handleTagToggle(name)}
                selected={selectedTags.some((tag) => tag.name === name)}
              >
                <Dot color={hex} />
                {name}
              </Tag>
            ))}
          </Box>
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, color: 'black', fontFamily: 'sans-serif' }}>
            Collections
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', color: 'black', fontFamily: 'sans-serif' }}>
            {collections.map((item) => (
              <Tag
                key={item}
                onClick={() => handleTagToggle(item)}
                selected={selectedTags.some((tag) => tag.name === item)}
              >
                {item}
              </Tag>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TagSelector;