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

import forthealthlogo from "../../../assets/images/fortehealthlogo.png";
import TextInput from "../../common/TextInput";
import { forgot_password_code } from "../../../api/apiClass/forte.class";
import { useLocation, useNavigate } from "react-router-dom";

const Verification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;

  const ConfirmOTP = async () => {
    setLoading(true);
    try {
      const response = await forgot_password_code({ otp: OTP, email: email });
      console.log(response);
      setError(response?.data?.message);

      if (response?.data?.message == "Code verified successfully.") {
        // setLoading(false);
        navigate("/resetpassword", { state: { otp: OTP, email: email } });
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
                  <Typography variant="h6">
                    Enter Code for Verfication
                  </Typography>
                </Box>
                <Box className={styles.parentInput}>
                  <TextInput
                    label="Enter OTP Code"
                    type="text"
                    name="otp"
                    placeholder="OTP"
                    onChange={(e) => setOTP(e.target.value)}
                    value={OTP}
                  />
                </Box>
                <Box className={styles.Button}>
                  <Button sx={{ marginBottom: "10px" }} onClick={ConfirmOTP}>
                    {loading ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      "Confirm OTP"
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

export default Verification;
