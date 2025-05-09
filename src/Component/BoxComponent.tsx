import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'react-router-dom';

const generateColor = (type: string): string => {
  if (type === 'pastel') {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 85%)`;
  }
  if (type === 'vintage') {
    const vintageHues = [30, 60, 90, 150, 200];
    const hue = vintageHues[Math.floor(Math.random() * vintageHues.length)];
    return `hsl(${hue}, 30%, 60%)`;
  }
  
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
};

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
  const [loading, setLoading] = useState<boolean>(true);
  const { colorname } = useParams();

  const project = import.meta.env.VITE_SUPABASE_PROJECT_URL;
  const key = import.meta.env.VITE_SUPABASE_API_KEY;
  const supabase = createClient(project, key);

  useEffect(() => {
    const fetchColors = async () => {
      if (colorname === 'pastel' || colorname === 'vintage' || colorname === 'random') {
        // Simulate generated data
        const randomData = Array.from({ length: 8 }, () => ({
          id: Math.random().toString(36).substring(2),
          colors: Array.from({ length: 4 }, () => generateColor(colorname)),
          likes: Math.floor(Math.random() * 100),
          createdAt: new Date().toISOString(),
        }));
        setTimeout(() => {
          setPalettes(randomData);
          setLoading(false);
        }, 1000);
      } else {
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
        setTimeout(() => {
          setPalettes(formattedData || []);
          setLoading(false);
        }, 1000);
      }
    };

    setLoading(true);
    fetchColors();
  }, [colorname]);

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
      {loading
        ? [...Array(6)].map((_, index) => (
            <Box key={index} sx={{ width: 200 }}>
              <Skeleton variant="rectangular" height={200} />
              <Skeleton width="60%" sx={{ mt: 1 }} />
            </Box>
          ))
        : palettes.map((palette, index) => (
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
              <Box sx={{ borderRadius: 4, overflow: 'hidden' }}>
                {palette.colors.map((color: any, idx: any) => (
                  <Tooltip title={color} arrow key={idx}>
                    <Box
                      sx={{
                        height: 50,
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
                  }}
                  startIcon={
                    liked[index] ? <FavoriteIcon /> : <FavoriteBorderIcon />
                  }
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
