import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Snackbar,
  CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import style from "./style.module.scss";
import {
  user_audit_result,
  superuser_audit_result,
} from "../../api/apiClass/forte.class";
import { useSelector } from "react-redux";

const AuditResult = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [AuditList, setAuditList] = useState([]);
  const auth = useSelector((state) => state.auth);

  const getData = async () => {
    setLoading(true);
    try {
      let response;
      if (auth?.user?.role == "super_user") {
        response = await superuser_audit_result();
        console.log(response);
        setError(response?.data?.message);
        setAuditList(response?.data?.data?.getAdminUserAudit);
      } else if (auth?.user?.role == "user") {
        response = await user_audit_result();
        console.log(response);
        setError(response?.data?.message);
        setAuditList(response?.data?.data?.getAuditResult);
      }
    } catch (error) {
      setLoading(false);
      setError(error?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
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
      <Box className={style.parent}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4">Completed Audit</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {AuditList &&
            AuditList?.map((item, index) => (
              <Grid item>
                <Box className={style.main_box}>
                  <Box>
                    <Typography variant="h5">
                      Total Score: {item?.total_score}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6">
                      Matress Brand: {item?.matress_brand}
                    </Typography>
                    <Typography variant="h6">
                      Matress Model: {item?.matress_model}
                    </Typography>
                    <Typography variant="h6">
                      Matress Type: {item?.matress_type}
                    </Typography>
                    <Typography variant="h6">
                      Matress Size: {item?.matress_size}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default AuditResult;
