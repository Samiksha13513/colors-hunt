import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { createClient } from '@supabase/supabase-js';

const BoxComponent: React.FC = () => {
  const [palettes, setPalettes] = useState<any[]>([]);
  const [liked, setLiked] = useState<{ [key: number]: boolean }>({}); // stores like state per index

  const project = import.meta.env.VITE_SUPABASE_PROJECT_URL;
  const key = import.meta.env.VITE_SUPABASE_API_KEY;
  const supabase = createClient(project, key);

  useEffect(() => {
    const fetchColors = async () => {
      const { data, error } = await supabase
        .from('color') 
        .select('*'); 
      if (error) {
        console.error('Error fetching data from Supabase:', error);
        return;
      }

      const formattedData = data?.map((item: any) => ({
        id: item.id, // assuming there's an ID to update likes later
        colors: [
          item.colors.color1,
          item.colors.color2,
          item.colors.color3,
          item.colors.color4,
        ],
        likes: item.likes,
        createdAt: item.createdat,
      }));

      setPalettes(formattedData || []);
    };

    fetchColors();
  }, []);

  const handleLikeToggle = (index: number) => {
    setPalettes(prev =>
      prev.map((palette, idx) =>
        idx === index
          ? {
              ...palette,
              likes: liked[index] ? palette.likes - 1 : palette.likes + 1,
            }
          : palette
      )
    );
    setLiked(prev => ({ ...prev, [index]: !prev[index] }));
  };

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
            {palette.colors.map((color: any, idx: any) => (
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
              onClick={() => handleLikeToggle(index)}
              size="small"
              sx={{
                textTransform: 'none',
                color: 'black',
                fontWeight: 500,
                border: '1px solid rgb(223, 222, 222)',
                justifyContent: 'space-between',
              }}
              startIcon={liked[index] ? <FavoriteIcon/> : <FavoriteBorderIcon />}
            >
              {palette.likes}
            </Button>

            <Typography variant="caption" color="text.secondary">
              {new Date(palette.createdAt).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default BoxComponent;
