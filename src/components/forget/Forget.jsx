import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Snackbar,
} from "@mui/material";
import styles from "./styles.module.scss";

import { useNavigate } from "react-router-dom";
import forthealthlogo from "../../assets/images/fortehealthlogo.png";
import TextInput from "../common/TextInput";
import { forgot_password } from "../../api/apiClass/forte.class";

const Forget = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const ForgetPassword = async () => {
    setLoading(true);
    try {
      const response = await forgot_password({ email: email });
      console.log(response);
      setError(response?.data?.message);
      // setLoading(false);
      if (response?.data?.message == "Forgot Password OTP sent successfully") {
        navigate("/verification", { state: { email: email } });
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
                  <Typography variant="h2">Forgot Password?</Typography>
                </Box>

                <Box className={styles.parentInput}>
                  <TextInput
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="Enter Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Box>
                <Box className={styles.Button}>
                  <Button
                    sx={{ marginBottom: "10px" }}
                    onClick={ForgetPassword}
                  >
                    {loading ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      "Send Code"
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

export default Forget;
