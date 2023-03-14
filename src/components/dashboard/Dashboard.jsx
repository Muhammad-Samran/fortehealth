import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import style from "./style.module.scss";
import userAdd from "../../assets/dashboard_images/user-add.svg";
import rightArrow from "../../assets/dashboard_images/icons/right_arrow.svg";
import Addward from "../../assets/dashboard_images/Addward.png";
import users from "../../assets/dashboard_images/users.png";
import CompleteAudit from "../../assets/dashboard_images/CompleteAudit.png";
import { useNavigate } from "react-router-dom";

const dashboard = [
  {
    name: "Create User",
    path: "/createusers",
    subtitle:
      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.",
    image: userAdd,
  },
  {
    name: "User",
    path: "/users",
    subtitle:
      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.",
    image: users,
  },
  {
    name: "Add Ward",
    path: "/addward",
    subtitle:
      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.",
    image: Addward,
  },
  {
    name: "Create Audit",
    path: "/audit",
    subtitle:
      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.",
    image: CompleteAudit,
  },
];
const Dashboard = () => {
  const navigate = useNavigate();
  const handleNavigation = (item) => navigate(item.path);
  return (
    <>
      <Box className={style.parent}>
        <Box>
          <Typography variant="h4">Dashboard</Typography>
        </Box>
        <Grid container spacing={2} className={style.card_parent}>
          {dashboard?.map((item, index) => (
            <Grid item xs={6}>
              <Box onClick={() => handleNavigation(item)}>
                <Grid container className={style.main_box}>
                  <Grid item md={4}>
                    <Box className={style.img_box}>
                      <img src={item.image} alt="" />
                    </Box>
                  </Grid>
                  <Grid item md={8}>
                    <Box>
                      <Grid container className={style.content}>
                        <Grid item sm={10}>
                          <Typography variant="h5">{item.name}</Typography>
                          <Typography variant="h6">{item.subtitle}</Typography>
                        </Grid>
                        <Grid item sm={2} className={style.content_img}>
                          <img src={rightArrow} alt="" />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
