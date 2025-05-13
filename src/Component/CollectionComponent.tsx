import React, { useEffect, useState } from "react";
import { Box, Tooltip, Typography, Skeleton } from "@mui/material";
import { supabase } from "../SupabaseConfig";

const CollectionComponent: React.FC<{ refreshTrigger: number }> = ({
  refreshTrigger,
}) => {
  const [palettes, setPalettes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // <-- Add loading state

  const fetchPalettes = async () => {
    const { data, error } = await supabase.from("color_palettes").select("*");

    if (error) {
      console.error("Error fetching palettes:", error);
    } else {
      // Simulate 4-second loading delay
      setTimeout(() => {
        setPalettes(data || []);
        setLoading(false); // Stop loading after 4 seconds
      }, 2000);
    }
  };

  useEffect(() => {
    fetchPalettes();
  }, [refreshTrigger]);

 async (selectedPalette: any) => {
    const formattedData = {
      color1: selectedPalette.colors[0],
      color2: selectedPalette.colors[1],
      color3: selectedPalette.colors[2],
      color4: selectedPalette.colors[3],
    };

    const {  error } = await supabase
      .from("color")
      .insert([{ colors: formattedData }]);

    if (error) {
      console.error("Error saving palette:", error);
      alert("Failed to save. Check console for details.");
    } else {
      alert("Palette saved!");
    }
  };

  return (
    <Box sx={{ p: 3, display: "flex", flexWrap: "wrap", gap: 3 }}>
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
                overflow: "hidden",
                boxShadow: 0,
                backgroundColor: "#fff",
              }}
            >
              <Box sx={{ borderRadius: 4, overflow: "hidden" }}>
                {palette.colors.map((color: any, idx: any) => (
                  <Tooltip title={color} arrow key={idx}>
                    <Box
                      sx={{
                        height: 50,
                        backgroundColor: `${color}99`,
                        color: "white",
                      }}
                    />
                  </Tooltip>
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1.5,
                  px: 2,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {formatTimeAgo(palette.created_at)}
                </Typography>
                {/* <Button
                  onClick={() => handleSubmit(palette)}
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: "none",
                    color: "black",
                    fontWeight: 500,
                    border: "1px solid rgb(223, 222, 222)",
                  }}
                >
                  Publish
                </Button> */}
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
