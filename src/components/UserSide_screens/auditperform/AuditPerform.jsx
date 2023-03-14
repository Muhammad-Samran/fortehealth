import {
  Box,
  Grid,
  Typography,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get_audit_site } from "../../../api/apiClass/forte.class";
import style from "./style.module.scss";

const AuditPerform = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [AuditList, setAuditList] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    setLoading(true);
    try {
      const response = await get_audit_site();
      console.log(response);
      setError(response?.data?.message);
      setAuditList(response?.data?.data?.getAdminSites[0]);
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
      {" "}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={loading}
        autoHideDuration={4000}
        onClose={() => setLoading(false)}
        message={error || "Loading..."}
        // action={action}
      />{" "}
      <Box className={style.parent}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4">Audit to Perform</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {AuditList &&
            AuditList?.admin_audit_list?.map((item, index) => (
              <Grid item>
                <Box
                  className={style.main_box}
                  onClick={() =>
                    navigate("/AuditDetail", { state: { id: item?.id } })
                  }
                >
                  <Box>
                    <Typography variant="h5">
                      Site: {item?.site?.toUpperCase()}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6">
                      Score Threshold: {item?.score_threshold}
                    </Typography>
                    <Typography variant="h6">Status: {item?.status}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default AuditPerform;
