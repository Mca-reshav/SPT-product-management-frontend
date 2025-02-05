import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Grid,
} from "@mui/material";
import { userRegistration } from "../services/User.service";
import { useNavigate } from "react-router-dom";
import bannerImage from "../assets/banner.png";
import { ToastService } from "../services/Toaster.service";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  emailId: yup.string().email("Invalid email").required("Email is required"),
  contactNo: yup
    .string()
    .length(10, "Contact Number must be 10 digits")
    .required("Contact Number is required"),
  password: yup
    .string()
    .min(3, "Password must be at least 3 characters")
    .required("Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await userRegistration(data);
      if (response?.success) {
        ToastService.success(response?.message);
        navigate("/login");
      } else ToastService.error(response?.message)
    } catch (error) {
      setErrorMessage(error.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#454ad2",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={bannerImage}
              alt="Banner"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Grid>

          <Grid item xs={6}>
            <Paper
              elevation={6}
              sx={{
                padding: 4,
                borderRadius: 2,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Register Yourself
              </Typography>
              {errorMessage && (
                <Typography color="error">{errorMessage}</Typography>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Name"
                  fullWidth
                  margin="normal"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  {...register("emailId")}
                  error={!!errors.emailId}
                  helperText={errors.emailId?.message}
                />
                <TextField
                  label="Contact"
                  fullWidth
                  margin="normal"
                  {...register("contactNo")}
                  error={!!errors.contactNo}
                  helperText={errors.contactNo?.message}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Register
                  </Button>
                </Box>
              </form>
              <Box mt={2} textAlign="center">
                <Typography variant="body2">
                  Already a registered user?{" "}
                  <Button
                    onClick={() => navigate("/login")}
                    color="secondary"
                  >
                    Login here
                  </Button>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Register;
