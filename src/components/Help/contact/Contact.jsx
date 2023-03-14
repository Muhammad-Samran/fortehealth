import {
  Button,
  Grid,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import TextInput from "../../common/TextInput";
import PhoneField from "../../common/phoneFeild";
import style from "./style.module.scss";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { contactUs } from "../../../api/apiClass/forte.class";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    message: "",
  };
  const contactSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    message: Yup.string().required("Required"),
  });
  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = await contactUs({
        ...values,
        description: values.message,
      });
      // console.log(response);
      setError(response?.data?.message);
      if (response?.data?.status != 200) {
        setLoading(false);
      } else if (response?.data?.status == 200) {
        resetForm();
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
        <Grid container>
          <Grid item sx={12}>
            <Typography variant="h4">Contact Us</Typography>
          </Grid>
        </Grid>
        <Box className={style.input_parent}>
          <Formik
            initialValues={initialValues}
            validationSchema={contactSchema}
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
                <Grid container>
                  <Grid item sx={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={6}>
                        <TextInput
                          type="text"
                          placeholder="Name"
                          label="Name"
                          name="name"
                          onChange={handleChange}
                          value={values.name}
                        />
                        <span className={style.error}>
                          {errors.name && touched.name && (
                            <div>{errors.name}</div>
                          )}
                        </span>
                      </Grid>
                      <Grid item xs={12} md={6}>
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
                      </Grid>
                    </Grid>
                    <Grid container className={style.email_box}>
                      <Grid item xs={12}>
                        <PhoneField
                          name="phone"
                          onChange={handleChange}
                          value={values.phone}
                        />
                        <span className={style.error}>
                          {errors.phone && touched.phone && errors.phone}
                        </span>
                      </Grid>
                    </Grid>
                    <Grid container className={style.msg_box}>
                      <Grid item xs={12}>
                        <TextInput
                          type="text"
                          placeholder="Leave us a message...."
                          label="Message"
                          name="message"
                          onChange={handleChange}
                          value={values.message}
                        />
                        <span className={style.error}>
                          {errors.message && touched.message && (
                            <div>{errors.message}</div>
                          )}
                        </span>
                      </Grid>
                    </Grid>
                    <Box className={style.btn_box}>
                      <Button type="submit" variant="contained">
                        {loading ? (
                          <CircularProgress style={{ color: "white" }} />
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </Box>
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

export default Contact;
