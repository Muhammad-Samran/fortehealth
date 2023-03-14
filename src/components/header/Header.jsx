import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import style from "./style.module.scss";
import forthealthlogo from "../../assets/images/fortehealthlogo.png";
import { AiOutlineMore } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const currentUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = async () => {
    await dispatch(logout());
    setAnchorEl(null);
  };
  const navProfile = async () => {
    navigate("/setting/profile");
    setAnchorEl(null);
  };

  return (
    <>
      <Box className={style.parent}>
        <Grid container className={style.main_Box}>
          <Grid item xs={6} sm={6}>
            <Box className={style.left_box}>
              <img src={forthealthlogo} alt="logo" />
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} className={style.rightbox}>
            <Box display="flex">
              {/* <Box className={style.img_box}>
                                <img src={header_notification} alt="" />
                            </Box> */}
              <Box>
                <Typography variant="h5">
                  {currentUser?.user?.name?.toUpperCase()}
                </Typography>
                <Typography variant="h6">
                  {currentUser?.user?.role
                    ?.replace(/[_|&;$%@"<>()+,]/g, " ")
                    ?.toUpperCase()}
                </Typography>
              </Box>
              {/* <Box className={style.img_box}>
                            <img src={header_user} alt="" />
                            </Box> */}
              <Box>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <AiOutlineMore />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      width: "15ch",
                    },
                  }}
                >
                  <MenuItem onClick={navProfile}>Profile</MenuItem>
                  <MenuItem onClick={Logout}>Logout</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Header;
