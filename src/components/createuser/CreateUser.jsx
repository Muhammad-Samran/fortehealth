import {
  Box,
  Button,
  Grid,
  Snackbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import TextInput from "../common/TextInput";
import PhoneField from "../common/phoneFeild";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../api/apiClass/forte.class";
import style from "./style.module.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    password: "",
  };
  const createUserSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, `Password is too short - should be 8 chars minimum`),
  });
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await createUser({
        ...values,
        hospital_name: auth?.user?.hospital_name,
      });
      // console.log(response?.data?.message);
      setError(response?.data?.message);
      if (response?.data?.status != 200) {
        setLoading(false);
      } else if (response?.data?.status == 200) {
        navigate("/users");
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
        <Box>
          <Typography variant="h4">Create User</Typography>
        </Box>
        <Box>
          <Formik
            initialValues={initialValues}
            validationSchema={createUserSchema}
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
                <Grid container spacing={1}>
                  <Grid item sx={12}>
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
                    <PhoneField
                      name="phone"
                      onChange={handleChange}
                      value={values.phone}
                    />
                    <span className={style.error}>
                      {errors.phone && touched.phone && errors.phone}
                    </span>
                    <TextInput
                      type="email"
                      placeholder="Email"
                      label="Email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                    />
                    <span className={style.error}>
                      {errors.email && touched.email && errors.email}
                    </span>
                    <TextInput
                      type="password"
                      placeholder="Password"
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                    />
                    <span className={style.error}>
                      {errors.password && touched.password && errors.password}
                    </span>
                  </Grid>
                  <Grid item sm={12} className={style.btn}>
                    <Button type="submit" variant="contained">
                      {loading ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : (
                        "create User +"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default CreateUser;
