import {
  Container,
  Divider,
  Grid,
  InputAdornment,
  InputBase,
  TextField,
  Snackbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import style from "./style.module.scss";
import userAdd from "../../assets/dashboard_images/user-add.svg";
import { getUsers } from "../../api/apiClass/forte.class";
const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      // console.log(response);
      setError(response?.data?.message);
      setUsers(response?.data?.data?.getAdminUser);
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
      />
      <Box className={style.parent}>
        <Box>
          <Typography variant="h4">Users</Typography>
        </Box>
        <Grid container className={style.user_main_box}>
          {/* <Grid item sm={12}>
            <InputBase
              className={style.iconfield}
              placeholder="Search"
              startAdornment={
                <InputAdornment position="start">
                  <BiSearch />
                </InputAdornment>
              }
              label="Password"
            />
          </Grid> */}

          <Box className={style.card_box}>
            <Grid container spacing={2}>
              {users ? (
                users.map((user) => (
                  <Grid item>
                    <Box className={style.card_main_box}>
                      <Box className={style.card_img_box}>
                        <Box className={style.card_img}>
                          <img
                            src={user?.profile_img || userAdd}
                            width={50}
                            height={50}
                            alt=""
                          />
                        </Box>
                      </Box>
                      <Box>
                        <Divider sx={{ bgcolor: "#0d99ff" }} />
                        <Typography variant="h4">{user?.name}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="h6">
                          Hospital: {user?.hospital_name}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h6">{user?.email}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))
              ) : (
                <></>
              )}
            </Grid>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default CreateUser;
