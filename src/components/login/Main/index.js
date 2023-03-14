import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Snackbar,
} from "@mui/material";
import styles from "./styles.module.scss";

import { Link, useNavigate, Navigate } from "react-router-dom";
import TextInput from "../../common/TextInput";
import { routes } from "../../../routes";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import forthealthlogo from "../../../assets/images/fortehealthlogo.png";
import LoginImage from "../../../assets/images/login_images/login.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import { clearMessage } from "../../../redux/slices/messageSlice";

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const onSubmit = async (values) => {
    setLoading(true);

    dispatch(login(values))
      .unwrap()
      .then((response) => {
        setError(response?.user?.message);
        if (response?.user?.data?.access_token) {
          navigate("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        setError(error?.message);
        console.log("error", error);
        setLoading(false);
      });
  };

  const initialValues = {
    email: "",
    password: "",
  };
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, `Password is too short - should be 8 chars minimum`),
  });

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={loading}
        autoHideDuration={3000}
        onClose={() => setLoading(false)}
        message={error || "Loading..."}
        // action={action}
      />
      <Box className={styles.parent}>
        <Grid container className={styles.parent_main}>
          <Grid item sm={6}>
            <Box className={styles.leftBox}>
              <img src={forthealthlogo} alt="logo" />
              <Box className={styles.content}>
                <Typography variant="h2">Welcome Back!</Typography>
                <Formik
                  initialValues={initialValues}
                  validationSchema={SignupSchema}
                  onSubmit={onSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <Form onSubmit={handleSubmit} className={styles.formsBox}>
                      <Box className={styles.parentInput}>
                        <TextInput
                          label="Email"
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          onChange={handleChange}
                          value={values.email}
                        />
                        <span className={styles.error}>
                          {errors.email && touched.email && errors.email}
                        </span>
                      </Box>
                      <Box className={styles.parentInput}>
                        <TextInput
                          label="Password"
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          onChange={handleChange}
                          value={values.password}
                        />
                        <span className={styles.error}>
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </span>
                      </Box>
                      <Box className={styles.forget}>
                        <Link to={routes.FORGET_PASSWORD}>
                          Forgot Password?
                        </Link>
                      </Box>
                      <Box className={styles.Button}>
                        <Button
                          sx={{ marginBottom: "10px" }}
                          onClick={handleSubmit}
                        >
                          {loading ? (
                            <CircularProgress style={{ color: "white" }} />
                          ) : (
                            "Sign In"
                          )}
                        </Button>
                      </Box>
                      {/* <Box className={styles.bottom}>
                  <Typography align="left" variant="h5">Don’t have an account?</Typography>
                  <Link to={routes.SIGNUP}>Sign Up Now</Link>
                </Box> */}
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className={styles.img_box}>
              <img src={LoginImage} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
