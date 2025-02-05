import { useState, useEffect } from "react";
import { userProfile } from "../services/User.service";
import { Box, Typography, Paper, Avatar, CircularProgress } from "@mui/material";
import { AccountCircle, Email, Phone, EventNote } from "@mui/icons-material";
import { ToastService } from "../services/Toaster.service";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userProfile();
        if (response.success) setProfileData(response.data);
        else ToastService.error("Failed to load the profile");
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  const boxStyle = { display: "flex", alignItems: "center", justifyContent: "center", mb: 1 };
  return (
    <Box sx={{ padding: 3, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper sx={{ padding: 4, width: "100%", maxWidth: 600, textAlign: "center", background: "lightsteelblue"}}>
        <Avatar sx={{ marginBottom: 2, width: 100, height: 100, margin: "0 auto" }}>
          <AccountCircle sx={{ fontSize: 80 }} />
        </Avatar>
        <Typography variant="h5" gutterBottom>
          {profileData?.name}
        </Typography>
        <Box sx={boxStyle}>
          <Email sx={{ marginRight: 1 }} />
          <Typography variant="body1" color="textSecondary">
            {profileData?.emailId}
          </Typography>
        </Box>
        <Box sx={boxStyle}>
          <Phone sx={{ marginRight: 1 }} />
          <Typography variant="body1" color="textSecondary">
            {profileData?.contactNo}
          </Typography>
        </Box>
        <Box sx={boxStyle}>
          <EventNote sx={{ marginRight: 1 }} />
          <Typography variant="body1" color="textSecondary">
            {new Date(profileData?.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
