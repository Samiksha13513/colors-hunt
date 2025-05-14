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

interface NewComponentProps {
  refreshTrigger: number;
  onLike?: () => void;
}

const NewComponent: React.FC<NewComponentProps> = ({
  refreshTrigger,
  onLike,
}) => {
  const [palettes, setPalettes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust breakpoint as needed
  const gridColumnCount = isMobile ? 2 : 3;

  const fetchPalettes = async () => {
    setLoading(true);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { data, error } = await supabase
      .from("color_palettes")
      .select("*")
      .gte("created_at", today.toISOString())
      .lt("created_at", tomorrow.toISOString());

    if (error) {
      console.error("Error fetching palettes:", error);
    } else {
      setPalettes(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPalettes();
  }, [refreshTrigger]);

  const handleSavePalette = async (selectedPalette: any) => {
    const formattedData = {
      color1: selectedPalette.colors[0],
      color2: selectedPalette.colors[1],
      color3: selectedPalette.colors[2],
      color4: selectedPalette.colors[3],
    };

    const { error } = await supabase
      .from("color")
      .insert([{ colors: formattedData }]);

    if (error) {
      console.error("Error saving palette:", error);
      alert("Failed to save. Check console for details.");
    } else {
      alert("Palette saved!");
      onLike?.(); // ✅ Trigger tongue animation
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(150px, 1fr))`, // Basic responsive grid
        gap: 2,
      }}
    >
      {loading
        ? [...Array(6)].map((_, index) => (
            <Box key={index}>
              <Skeleton variant="rectangular" height={150} />
              <Skeleton width="60%" sx={{ mt: 1 }} />
            </Box>
          ))
        : palettes.map((palette, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: 0,
                backgroundColor: "#fff",
              }}
            >
              <Box sx={{ borderRadius: 4, overflow: "hidden" }}>
                {palette.colors.map((color: string, idx: number) => (
                  <Tooltip title={color} arrow key={idx}>
                    <Box
                      sx={{
                        height: 35,
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

export default NewComponent;