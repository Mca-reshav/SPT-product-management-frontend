import { Avatar, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const avatarColors = [
  "#FF5733", "#33FF57", "#3357FF", "#FF33A1",
  "#FFD700", "#FF4500", "#8A2BE2", "#20B2AA"
];

const ChipAvatar = ({ name }) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "?";

  const colorIndex = name ? name.charCodeAt(0) % avatarColors.length : 0;
  const avatarColor = avatarColors[colorIndex];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: `1px solid ${avatarColor}`,
        borderRadius: "25px",
        padding: "5px 12px",
        margin: "10px",
        backgroundColor: "transparent",
        whiteSpace: "nowrap",
      }}
    >
      <Avatar
        sx={{
          bgcolor: avatarColor,
          width: 32,
          height: 32,
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#fff",
          marginRight: "8px",
          borderRadius: "50%",
        }}
      >
        {firstLetter}
      </Avatar>

      <Typography
        variant="body2"
        sx={{
          fontWeight: "bold",
          color: avatarColor,
          fontSize: "14px",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

ChipAvatar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ChipAvatar;
