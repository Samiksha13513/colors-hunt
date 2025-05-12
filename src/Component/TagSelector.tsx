// import React, { useState } from 'react';
// import { Box, InputBase, Typography, Chip } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { styled } from '@mui/system';

// interface TagSelectorProps {
//   placeholder?: string;
//   width?: string;
// }
// const Tag = styled(Box)<{ color?: string }>(({ color }) => ({
//   backgroundColor: '#fff',
//   border: '1px solid #ccc',
//   borderRadius: '20px',
//   padding: '6px 12px',
//   margin: '4px',
//   fontSize: '13px',
//   display: 'inline-flex',
//   alignItems: 'center',
//   cursor: 'pointer',
//   transition: '0.2s',
//   '&:hover': {
//     backgroundColor: '#f5f5f5',
//   },
// }));

// const Dot = styled('span')<{ color: string }>(({ color }) => ({
//   width: 10,
//   height: 10,
//   borderRadius: '50%',
//   backgroundColor: color,
//   marginRight: 8,
// }));

// const colorMap: Record<string, string> = {
//   Blue: '#2196f3', Teal: '#009688', Mint: '#98ff98', Green: '#4caf50', Sage: '#b2ac88',
//   Yellow: '#ffeb3b', Beige: '#f5f5dc', Brown: '#795548', Orange: '#ff9800', Peach: '#ffdab9',
//   Red: '#f44336', Maroon: '#800000', Pink: '#e91e63', Purple: '#9c27b0', Navy: '#001f3f',
//   Black: '#000000', Grey: '#9e9e9e', White: '#ffffff',
// };

// const collections = [
//   'Pastel', 'Vintage', 'Retro', 'Neon', 'Gold', 'Light', 'Dark', 'Warm', 'Cold', 'Summer',
//   'Fall', 'Winter', 'Spring', 'Happy', 'Nature', 'Earth', 'Night', 'Space', 'Rainbow',
//   'Gradient', 'Sunset', 'Sky', 'Sea', 'Kids', 'Skin', 'Food', 'Cream', 'Coffee', 'Wedding',
//   'Christmas', 'Halloween',
// ];

// const TagSelector  = ({placeholder ,width }:TagSelectorProps ) => {
//   const [search, setSearch] = useState('');
//   const [inputFocused, setInputFocused] = useState(false);
//   const [selectedTags, setSelectedTags] = useState<string[]>([]);

//   const showSuggestions = inputFocused || selectedTags.length > 0;

//   const handleAddTag = (tag: string) => {
//     if (!selectedTags.includes(tag)) {
//       setSelectedTags((prev) => [...prev, tag]);
//       setSearch((prev) => prev ? `${prev}, ${tag}` : tag);
//     }
//   };

//   const handleRemoveTag = (tagToRemove: string) => {
//     setSelectedTags((prev) => prev.filter((tag) => tag !== tagToRemove));
//     setSearch((prev) =>
//       prev
//         .split(',')
//         .map((t) => t.trim())
//         .filter((t) => t !== tagToRemove)
//         .join(', ')
//     );
//   };

//   return (
//     <Box sx={{backgroundColor: '#fff', borderRadius: 2, position: 'relative' }}>
//       <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
//         {selectedTags.map((tag) => (
//           <Chip
//             key={tag}
//             label={tag}
//             onDelete={() => handleRemoveTag(tag)}
//             sx={{ m: 0.5 }}
//           />
//         ))}
//       </Box>

//       <InputBase 
//         startAdornment={<SearchIcon sx={{ mr: 1 }} />}
//         placeholder={placeholder}
//         fullWidth
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         onFocus={() => setInputFocused(true)}
//         onBlur={() => setTimeout(() => setInputFocused(false), 150)}
//         sx={{
//           border: '1px solid #eee',
//           px: 2,
//           py: 0.5,
//          width:`${width}`,
//           display: 'flex',
//           alignItems: 'center',
//           borderRadius: 3,
//         }}
//       />

//       {showSuggestions && (
//         <Box
//           sx={{
//             position: 'absolute',
//             width,
//             zIndex: 10,
//             backgroundColor: '#fff',
//             borderRadius: 2,
//             boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
//             p: 2,
//             mt: 1,
//           }}
//         >
//           <Typography variant="subtitle2" sx={{ mt: 1, mb: 1, color: 'black' ,fontFamily: 'Inter ,sans-serif'}}>
//             Colors
//           </Typography>
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 ,color: 'black',fontFamily: 'Inter ,sans-serif'}}>
//             {Object.entries(colorMap).map(([name, hex]) => (
//               <Tag key={name} color={'black'} onClick={() => handleAddTag(name)}>
//                 <Dot color={hex} />
//                 {name}
//               </Tag>
//             ))}
//           </Box>

//           <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 ,color: 'black',fontFamily: ' Inter ,sans-serif'}}>
//             Collections
//           </Typography>
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', color: 'black',fontFamily: 'Inter ,sans-serif'}}>
//             {collections.map((item) => (
//               <Tag key={item} onClick={() => handleAddTag(item)}>
//                 {item}
//               </Tag>
//             ))}
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default TagSelector;
import React, { useState } from 'react';
import { Box, InputBase, Typography, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
const Tag = styled(Box)<{ color?: string }>(({ color }) => ({
  backgroundColor: '#fff',
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
const TagSelector = ({ placeholder, width }: { placeholder?: string; width?: string }) => {
  const [search, setSearch] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hovered, setHovered] = useState(false);
  const showSuggestions = inputFocused || selectedTags.length > 0;
  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
      setSearch((prev) => prev ? `${prev}, ${tag}` : tag);
    }
  };
  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagToRemove));
    setSearch((prev) =>
      prev
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t !== tagToRemove)
        .join(', ')
    );
  };
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        // display: 'flex',
        // flexDirection: 'row',
        borderRadius: 2,
        position: 'relative',
        width,
        border: '1px solid #eee',
        '&:hover': {
          borderColor: '#ccc',
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ display: 'flex',  flexDirection: 'row' }}>
        {selectedTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onDelete={() => handleRemoveTag(tag)}
            sx={{ m: 0.5 }}
            onDoubleClick={() => handleRemoveTag(tag)}
          />
        ))}
      </Box>
      <InputBase
        startAdornment={<SearchIcon sx={{ mr: 1 }} />}
        placeholder={placeholder}
        fullWidth
        // value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setInputFocused(true)}
        //  onBlur={() => setTimeout(() => setInputFocused(false), 150)}
        sx={{
          border: 'none',
          px: 2,
          py: 0.5,
          display: 'flex',
          alignItems: 'center',
          borderRadius: 3,
        }}
      />
      </Box>
      {(showSuggestions) && (
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2, color: 'black' }}>
            {Object.entries(colorMap).map(([name, hex]) => (
              <Tag key={name} onClick={() => handleAddTag(name)}>
                <Dot color={hex} />
                {name}
              </Tag>
            ))}
          </Box>
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, color: 'black' }}>
            Collections
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', color: 'black' }}>
            {collections.map((item) => (
              <Tag key={item} onClick={() => handleAddTag(item)}>
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