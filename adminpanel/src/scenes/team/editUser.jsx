import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Header from "../../components/Header";
import { useMediaQuery } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  TextField,
  TextareaAutosize,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";

const EditUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
  });
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/getUser/${id}`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: user.firtsName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      mobile: user.mobile,
      status: user.status,
      role: user.role,
      createdAt: user.createdAt,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .max(255)
        .required("First name is required"),
      lastName: Yup.string()
        .max(255)
        .required("Last name is required"),
      userName: Yup.string()
        .max(255)
        .required("User name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      mobile: Yup.string()
        .max(255)
        .required("Mobile is required"),
      status: Yup.string()
        .max(255)
        .required("Status is required"),
      role: Yup.string()
        .max(255)
        .required("Role is required"),
      createdAt: Yup.string()
        .max(255)
        .required("Created at is required"),
    }),
    onSubmit: (values) => {
      axios
        .put(`http://localhost:5000/users/updateUser/${id}`, values)
        .then((response) => {
          enqueueSnackbar("User updated successfully", {
            variant: "success",
          });
          navigate("/team");
        })
        .catch((error) => {
          enqueueSnackbar("Error updating user", {
            variant: "error",
          });
        });
    },
  });

  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Header />
      <Box
        sx={{
          backgroundColor: colors.background,
          minHeight: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: colors.white,
              borderRadius: 1,
              boxShadow: 1,
              p: 3,
              width: isMobile ? "100%" : "95%",
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Header title={"Edit User"} subtitle="Update Blog details" />

              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  variant="outlined"
                  margin="normal"
                  error={Boolean(
                    formik.touched.firstName && formik.errors.firstName
                  )}
                  sx={{ gridColumn: "span 2" }}
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  variant="outlined"
                  error={Boolean(
                    formik.touched.lastName && formik.errors.lastName
                  )}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                  margin="normal"
                />
              </Box>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  fullWidth
                  label="User Name"
                  name="userName"
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                  variant="outlined"
                  error={Boolean(
                    formik.touched.userName && formik.errors.userName
                  )}
                  sx={{ gridColumn: "span 2" }}
                  margin="normal"
                  helperText={formik.touched.userName && formik.errors.userName}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  variant="outlined"
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{ gridColumn: "span 2" }}
                  margin="normal"
                />
              </Box>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  fullWidth
                  label="Mobile"
                  name="mobile"
                  onChange={formik.handleChange}
                  value={formik.values.mobile}
                  variant="outlined"
                  error={Boolean(formik.touched.mobile && formik.errors.mobile)}
                  helperText={formik.touched.mobile && formik.errors.mobile}
                  sx={{ gridColumn: "span 2" }}
                  margin="normal"
                />
                <TextField
                  type="file"
                  fullWidth
                  multiple
                  label="Upload Image"
                  name="image"
                  onChange={formik.handleChange}
                  value={formik.values.image}
                  variant="outlined"
                  error={Boolean(formik.touched.image && formik.errors.image)}
                  helperText={formik.touched.image && formik.errors.image}
                  sx={{ gridColumn: "span 2" }}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  fullWidth
                  label="Status"
                  name="status"
                  onChange={formik.handleChange}
                  value={formik.values.status}
                  variant="outlined"
                  error={Boolean(formik.touched.status && formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                  sx={{ gridColumn: "span 2" }}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Role"
                  name="role"
                  onChange="formik.handleChange"
                  value={formik.values.role}
                  variant="outlined"
                  error={Boolean(formik.touched.role && formik.errors.role)}
                  helperText={formik.touched.role && formik.errors.role}
                  sx={{ gridColumn: "span 2" }}
                  margin="normal"
                />
              </Box>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0,1fr))"
                sx={{
                  "&>div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                {/* <TextField
                  type="date"
                  fullWidth
                  label="Created At"
                  name="createdAt"
                  onChange={formik.handleChange}
                  value={formik.values.createdAt}
                  variant="outlined"
                  error={Boolean(
                    formik.touched.createdAt && formik.errors.createdAt
                  )}
                  helpertext={
                    formik.touched.createdAt && formik.errors.createdAt
                  }
                  sx={{ gridColumn: "span 2" }}
                  margin="normal"
                /> */}
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Button
                  color="success"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress /> : "Update"}
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  href="/team"
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default EditUser;
