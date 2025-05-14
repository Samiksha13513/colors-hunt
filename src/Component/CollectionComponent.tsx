import React, { useEffect, useState } from "react";
import {
  Box,
  Tooltip,
  Typography,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { supabase } from "../SupabaseConfig";

const CollectionComponent: React.FC<{ refreshTrigger: number }> = ({
  refreshTrigger,
}) => {
  const [palettes, setPalettes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const theme = useTheme();
 useMediaQuery(theme.breakpoints.down("sm"));

  const fetchPalettes = async () => {
    const { data, error } = await supabase.from("color_palettes").select("*");

    if (error) {
      console.error("Error fetching palettes:", error);
    } else {
      setTimeout(() => {
        setPalettes(data || []);
        setLoading(false);
      }, 2000); 
    }
  };

  useEffect(() => {
    fetchPalettes();
  }, [refreshTrigger]);

  return (
    <Box
      sx={{
        px: 2,
        py: 3,
        display: "grid",
        gap: 3,
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)", 
          sm: "repeat(3, 1fr)", 
          md: "repeat(4, 1fr)", 
        },
      }}
    >
      {loading
        ? [...Array(6)].map((_, index) => (
            <Box key={index} sx={{ width: "100%" }}>
              <Skeleton variant="rectangular" height={200} />
              <Skeleton width="60%" sx={{ mt: 1 }} />
            </Box>
          ))
        : palettes.map((palette, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
               
                backgroundColor: "#fff",
              }}
            >
              <Box sx={{ borderRadius: 4, overflow: "hidden" }}>
                {palette.colors.map((color: any, idx: number) => (
                  <Tooltip title={color} arrow key={idx}>
                    <Box
                      sx={{
                        height: 50,
                        backgroundColor: `${color}99`,
                      }}
                    />
                  </Tooltip>
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  px: 2,
                  py: 1.5,
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {formatTimeAgo(palette.created_at)}
                </Typography>
              </Box>
            </Box>
          ))}
    </Box>
  );
};

const formatTimeAgo = (timestamp: string) => {
  const createdDate = new Date(timestamp);
  const now = new Date();
  const diffInMs = now.getTime() - createdDate.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInWeeks >= 1) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
  } else if (diffInDays >= 1) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  }
};

export default CollectionComponent;
