import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import style from "./style.module.scss";
import profile_edit from "../../assets/Icons/profile_edit.png";
import CustomSelect from "../common/Select";
import TextInput from "../common/TextInput";
import PhoneField from "../common/phoneFeild";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../api/apiClass/forte.class";

const Profile = () => {
  const Gender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];
  const auth = useSelector((state) => state?.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const initialValues = {
    name: "",
    phone: "",
    gender: "",
  };
  const profileSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
  });
  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = await updateProfile(values);
      // console.log(response);
      setError(response?.data?.message);
      if (response?.data?.status != 200) {
        setLoading(false);
      } else if (response?.data?.status == 200) {
        resetForm();
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      setError(error?.message);
      console.log(error);
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
      <Box className={style.parent}>
        <Typography variant="h4">Admin Profile</Typography>
        <Grid container style={{ justifyContent: "space-between" }}>
          <Grid item md={4}>
            <Box className={style.profileDetails}>
              <Box>
                <Box className={style.marginBottom}>
                  <Typography variant="h5">
                    {auth?.user?.name?.toUpperCase()}
                  </Typography>
                </Box>
                <Box className={style.marginBottom}>
                  <Typography variant="p">
                    {" "}
                    {auth?.user?.role?.replace(/[_|&;$%@"<>()+,]/g, " ")}
                  </Typography>
                </Box>
                <Box className={style.marginBottom}>
                  <Typography variant="p">{auth?.user?.phone}</Typography>
                </Box>
              </Box>

              <Box>
                <img src={profile_edit} />
              </Box>
            </Box>
          </Grid>
          <Grid item md={8}>
            <Formik
              initialValues={initialValues}
              validationSchema={profileSchema}
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
                <Form onSubmit={handleSubmit} className={style.formsBox}>
                  <Box className={style.marginBottom}>
                    <TextInput
                      type="text"
                      placeholder="Name"
                      label="Name"
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                    />
                    <span className={style.error}>
                      {errors.name && touched.name && <div>{errors.name}</div>}
                    </span>
                  </Box>
                  <Box className={style.marginBottom}>
                    <PhoneField
                      name="phone"
                      onChange={handleChange}
                      value={values.phone}
                    />
                    <span className={style.error}>
                      {errors.phone && touched.phone && errors.phone}
                    </span>
                  </Box>

                  <Box className={style.marginBottom}>
                    <TextInput
                      type="text"
                      placeholder="Gender"
                      label="Gender"
                      name="gender"
                      onChange={handleChange}
                      value={values.gender}
                    />
                    <span className={style.error}>
                      {errors.gender && touched.gender && errors.gender}
                    </span>
                  </Box>
                  <Box className={style.profile_btn}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : (
                        "Update Profile"
                      )}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Profile;
