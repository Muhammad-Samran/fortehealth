import {
  Box,
  Button,
  Grid,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import TextInput from "../common/TextInput";
// import InputBase from '../common/InputBase/index';
import style from "./style.module.scss";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { addWard } from "../../api/apiClass/forte.class";

const AddWard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const initialValues = {
    name: "",
    address: "",
    ward_number: "",
    details: "",
  };
  const wardSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    ward_number: Yup.string().required("Required"),
    details: Yup.string().required("Required"),
  });
  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = await addWard(values);
      console.log(response);
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
        <Box>
          <Typography variant="h4">Add Ward</Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={wardSchema}
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
              <Box>
                <Grid container className={style.main_Box}>
                  <Grid item sm={6} className={style.input_box}>
                    <Box>
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
                    </Box>
                    <Box>
                      <TextInput
                        type="text"
                        placeholder="Address"
                        label="Address"
                        name="address"
                        onChange={handleChange}
                        value={values.address}
                      />
                      <span className={style.error}>
                        {errors.address && touched.address && (
                          <div>{errors.address}</div>
                        )}
                      </span>
                    </Box>
                    <Box>
                      <TextInput
                        type="text"
                        placeholder="Ward Number"
                        label="Ward Number"
                        name="ward_number"
                        onChange={handleChange}
                        value={values.ward_number}
                      />
                      <span className={style.error}>
                        {errors.ward_number && touched.ward_number && (
                          <div>{errors.ward_number}</div>
                        )}
                      </span>
                    </Box>
                    <Box>
                      <TextInput
                        type="text"
                        placeholder="Other Details"
                        label="Other Details"
                        name="details"
                        onChange={handleChange}
                        value={values.details}
                      />
                      <span className={style.error}>
                        {errors.details && touched.details && (
                          <div>{errors.details}</div>
                        )}
                      </span>
                    </Box>
                    <Box className={style.btn}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                      >
                        {loading ? (
                          <CircularProgress style={{ color: "white" }} />
                        ) : (
                          "create Ward +"
                        )}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AddWard;
