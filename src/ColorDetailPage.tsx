import React, { useEffect, useState } from 'react';
import { useParams,} from 'react-router-dom';
import {
  Box,
  Typography,
  Tooltip,
  CircularProgress,


} from '@mui/material';

import { createClient } from '@supabase/supabase-js';

const hexToRgb = (hex: string): string => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
    : 'Invalid color';
};




const ColorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [palette, setPalette] = useState<any>(null);
  const [loading, setLoading] = useState(true);
 

  const project = import.meta.env.VITE_SUPABASE_PROJECT_URL;
  const key = import.meta.env.VITE_SUPABASE_API_KEY;
  const supabase = createClient(project, key);

  useEffect(() => {
    const fetchPalette = async () => {
      const { data, error } = await supabase
        .from('color')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setPalette({
        ...data,
        colors: [
          data.colors.color1,
          data.colors.color2,
          data.colors.color3,
          data.colors.color4,
        ],
      });
      setLoading(false);
    };

    fetchPalette();
  }, [id]);


  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (!palette) return <Typography>No data found.</Typography>;

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: 340 },
          height: 320,
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          mb: 2,
        }}
      >
        {palette.colors.map((color: string, index: number) => (
          <Tooltip title={color} arrow key={index}>
            <Box
              sx={{
                flex: 1,
                backgroundColor: color,
                transition: 'opacity 0.3s',
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            />
          </Tooltip>
        ))}
      </Box>


      <Box
        sx={{
          width: { xs: '100%', sm: 509 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1.5,
          flexWrap: 'wrap',
        }}
      >
        {palette.colors.map((color: string, index: number) => {
          const rgb = hexToRgb(color);
          return (
            <Box
              key={index}
              sx={{
                flex: { sm: 1 },
                backgroundColor: '#f9f9f9',
                p: 1,
                borderRadius: 1,
                border: '1px solid #ddd',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f1f1f1',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box
                  sx={{
                    width: 14,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: color,
                    border: '1px solid #ccc',
                  }}
                />
                <Typography variant="body2" fontWeight={600}>
                  {color.toUpperCase()}
                </Typography>
              </Box>

              <Typography variant="caption" color="text.secondary">
                {rgb}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ColorDetailPage;

