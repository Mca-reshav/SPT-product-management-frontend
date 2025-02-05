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
import { userLogin } from "../services/User.service";
import { useNavigate } from "react-router-dom";
import bannerImage from "../assets/banner.png";
import { ToastService } from "../services/Toaster.service";
import PropTypes from "prop-types";

const schema = yup.object().shape({
  emailId: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(3, "Password must be at least 3 characters")
    .required("Password is required"),
});

const Login = ({ setIsAuthenticated }) => {
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
      const response = await userLogin(data);
      if (response?.success) {
        ToastService.success(response?.message);
        setIsAuthenticated(true);
        navigate("/home");
      } else {
        ToastService.error(response?.message);
      }
    } catch (error) {
      setErrorMessage(error.message || "Login failed");
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
                Login to your account
              </Typography>
              {errorMessage && (
                <Typography color="error">{errorMessage}</Typography>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  {...register("emailId")}
                  error={!!errors.emailId}
                  helperText={errors.emailId?.message}
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
                    Login
                  </Button>
                </Box>
              </form>
              <Box mt={2} textAlign="center">
                <Typography variant="body2">
                  Not registered?{" "}
                  <Button
                    onClick={() => navigate("/register")}
                    color="secondary"
                  >
                    Register here
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

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;
