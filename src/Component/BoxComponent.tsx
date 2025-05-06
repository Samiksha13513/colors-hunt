import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import { createClient } from '@supabase/supabase-js';

const formatTimeAgo = (timestamp: string) => {
  const createdDate = new Date(timestamp);
  const now = new Date();
  const diffInMs = now.getTime() - createdDate.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInWeeks >= 1) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  } else if (diffInDays >= 1) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
};

const BoxComponent: React.FC = () => {
  const [palettes, setPalettes] = useState<any[]>([]);
  const [liked, setLiked] = useState<{ [key: number]: boolean }>({});
  const project = import.meta.env.VITE_SUPABASE_PROJECT_URL;
  const key = import.meta.env.VITE_SUPABASE_API_KEY;
  const supabase = createClient(project, key);

  useEffect(() => {
    const fetchColors = async () => {
      const { data, error } = await supabase.from('color').select('*');
      if (error) {
        console.error('Error fetching data from Supabase:', error);
        return;
      }

      const formattedData = data?.map((item: any) => ({
        id: item.id,
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
            width: 200,
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: 0,
            backgroundColor: '#fff',
          }}
        >
          <Box sx={{ borderRadius: 4, overflow: 'hidden'}}>
            {palette.colors.map((color: any, idx: any) => (
              <Tooltip title={color} arrow key={idx}>
                <Box
                  sx={{
                    height:50,
                    backgroundColor: `${color}99`,
                    color: 'white',
                  }}
                />
              </Tooltip>
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
              startIcon={liked[index] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            >
              {palette.likes}
            </Button>

            <Typography variant="caption" color="text.secondary">
              {formatTimeAgo(palette.createdAt)}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default BoxComponent;
