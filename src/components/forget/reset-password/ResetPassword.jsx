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

import forthealthlogo from "../../../assets/images/fortehealthlogo.png";
import TextInput from "../../common/TextInput";
import { new_password } from "../../../api/apiClass/forte.class";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;
  const OTP = location?.state?.otp;

  const resetPassword = async () => {
    setLoading(true);
    try {
      const response = await new_password({
        otp: OTP,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      });
      console.log(response);
      setError(response?.data?.message);

      if (response?.data?.message == "Password Updated successfully.") {
        // setLoading(false);
        navigate("/login");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      setError(err?.message);
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={loading}
        autoHideDuration={4000}
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
                <Box>
                  <Typography variant="h6">Reset Password</Typography>
                </Box>
                <Box className={styles.parentInput}>
                  <TextInput
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Box>
                <Box className={styles.parentInput}>
                  <TextInput
                    label="Confirm password"
                    type="password"
                    name="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                </Box>
                <Box className={styles.Button}>
                  <Button sx={{ marginBottom: "10px" }} onClick={resetPassword}>
                    {loading ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      "Reset"
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className={styles.img_box}>
              <img src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=800" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ResetPassword;
