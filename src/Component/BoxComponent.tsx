
import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import colorPalettes from '../data/colors.json'; 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const BoxComponent: React.FC = () => {
  const [palettes, setPalettes] = useState<string[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1); 

  const loadMorePalettes = useCallback(() => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      setPalettes((prev) => [
        ...prev,
        ...colorPalettes.slice((page - 1) * 5, page * 5),
      ]);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 1000);
  }, [loading, page]);

  const observer = React.useRef<IntersectionObserver | null>(null);

  const lastPaletteElementRef = useCallback((node: HTMLElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMorePalettes();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, loadMorePalettes]);

  useEffect(() => {
    loadMorePalettes();
  }, [loadMorePalettes]);

  return (
    <Box sx={{ p: 3, display: 'flex', flexWrap: 'wrap', gap: 3 ,height:'100vh'}}>
      {palettes.map((palette, index) => (
        <Box
          key={index}
          ref={index === palettes.length - 1 ? lastPaletteElementRef : undefined}
          sx={{
            width: 230,
            //  height: 100,
            borderRadius: 3,
             overflow: 'hidden',
            boxShadow: 0,
            backgroundColor: '#fff',
          }}
        >
        <Box sx={{
            // width: 250,
            //  height: 200,
            borderRadius: 4,
             overflow: 'hidden',
            // boxShadow: 0,
            // backgroundColor: '#fff',
          }}>  
            {palette.map((color, idx) => (
              <Box
                key={idx}
                sx={{
                  height: 60,
                  // borderRadius: 5,
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
  size="small" 
  sx={{ 
    textTransform: 'none', 
    color: 'black', 
    fontWeight: 500, 
    border: '1px solid rgb(223, 222, 222)' ,
    justifyContent: 'space-between',
  }}
>
  <FavoriteBorderIcon />
  47
</Button>

            <Typography variant="caption" color="text.secondary">
              3 hours ago
            </Typography>
          </Box>
        </Box>
      ))}

      {loading && (
        <Box sx={{ width: '100%', textAlign: 'center', py: 2 }}>
          Loading more palettes...
        </Box>
      )}
    </Box>
  );
};

export default BoxComponent;
