import React, { useEffect, useState } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { supabase } from "../SupabaseConfig";

const CollectionComponent: React.FC<{ refreshTrigger: number }> = ({
  refreshTrigger,
}) => {
  const [palettes, setPalettes] = useState<any>([]);

  const fetchPalettes = async () => {
    const { data, error } = await supabase.from("color_palettes").select("*");

    if (error) {
      console.error("Error fetching palettes:", error);
    } else {
      setPalettes(data);
    }
  };
  console.log("palettes", palettes);
  useEffect(() => {
    fetchPalettes();
  }, [refreshTrigger]);

  const handleSubmit = async (selectedPalette: any) => {
    debugger;
    console.log("selectedPalette", selectedPalette);
    const formattedData = {
      color1: selectedPalette.colors[0],
      color2: selectedPalette.colors[1],
      color3: selectedPalette.colors[2],
      color4: selectedPalette.colors[3],
    };

    const { data, error } = await supabase
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
      {palettes.map(
        (palette, index) => (
          console.log("palette :: ", palette),
          (
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
                <Button
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
                </Button>
              </Box>
            </Box>
          )
        )
      )}
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
