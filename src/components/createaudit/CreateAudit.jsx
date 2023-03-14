import {
  Box,
  Button,
  Checkbox,
  Grid,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect, useRef } from "react";
import style from "./style.module.scss";
import TextInput from "../common/TextInput";
import CustomSelect from "../common/Select";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CheckBoxes from "./CheckBoxes";
import {
  createAudit,
  getCreateAuditData,
  getUsers,
  getWards,
} from "../../api/apiClass/forte.class";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateAudit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [audit, setAudit] = useState([]);
  const [wards, setWards] = useState([]);
  const [users, setUsers] = useState([]);
  const auth = useSelector((state) => state.auth);
  const dataWardRef = useRef(false);
  const dataUserRef = useRef(false);

  const getWardsData = async () => {
    try {
      const response = await getWards();
      response?.data?.data?.getWard?.forEach((record) => {
        const data = [{ value: record?.id, label: record?.ward_number }];
        setWards((prev) => [...prev, ...data]);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getUsersData = async () => {
    try {
      const response = await getUsers();
      response?.data?.data?.getAdminUser?.forEach((record) => {
        const data = [{ value: record?.id, label: record?.name }];
        setUsers((prev) => [...prev, ...data]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAuditData = async () => {
      setLoading(true);
      try {
        const response = await getCreateAuditData();
        setAudit(response?.data?.data?.auditParam);
        setError(response?.data?.message);
      } catch (error) {
        setLoading(false);
        setError(error?.message);
        console.log(error);
      }
    };

    getAuditData();
  }, []);

  useEffect(() => {
    if (dataWardRef.current) return;
    dataWardRef.current = true;

    getWardsData();
  }, []);

  useEffect(() => {
    if (dataUserRef.current) return;
    dataUserRef.current = true;

    getUsersData();
  }, []);

  const initialValues = {
    site: "",
    score_threshold: "",
    ward: "",
    user: "",
  };
  const auditSchema = Yup.object().shape({
    site: Yup.string().required("Required"),
    score_threshold: Yup.number()
      .integer()
      .min(1)
      .max(99)
      .required("Score threshold must be in range 1 to 99 "),
    ward: Yup.object().required("Required"),
    user: Yup.object().required("Required"),
  });
  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = await createAudit({
        ...values,
        user_id: values.user.value,
        ward_id: values.ward.value,
      });

      setError(response?.data?.message);

      if (response?.data?.message == " Admin Audit Successfully Created") {
        resetForm();
      }
    } catch (error) {
      setLoading(false);
      setError(error?.message);
      console.log(error);
    }
  };

  const handleWard = (setFieldValue, option, values) => {
    setFieldValue("ward", option);
  };
  const handleUser = (setFieldValue, option, values) => {
    setFieldValue("user", option);
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
          <Typography variant="h4">Create Audit</Typography>
        </Box>
        <Box style={{ marginBottom: "10px" }}>
          <TextInput
            type="text"
            className={style.disabledButton}
            placeholder="Hospital Name"
            label="Hospital Name"
            value={auth?.user?.hospital_name}
            disabled={true}
          />
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={auditSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
            resetForm,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit} className={style.formsBox}>
              <Box>
                <Grid
                  container
                  spacing={2}
                  className={style.parent_box}
                  style={{ justifyContent: "space-between" }}
                >
                  <Grid item md={6} xs={6}>
                    <Box style={{ marginBottom: "10px" }}>
                      <TextInput
                        type="text"
                        placeholder="Site"
                        label="Site"
                        name="site"
                        onChange={handleChange}
                        value={values.site}
                      />
                      <span className={style.error}>
                        {errors.site && touched.site && (
                          <div>{errors.site}</div>
                        )}
                      </span>
                    </Box>
                    <Box style={{ marginBottom: "10px" }}>
                      <CustomSelect
                        className={style.custominput}
                        label="Ward"
                        name="ward"
                        placeholder="Select Ward"
                        options={wards}
                        onChange={(option) =>
                          handleWard(setFieldValue, option, values)
                        }
                        value={values.ward}
                      />
                      <span className={style.error}>
                        {errors.ward && touched.ward && (
                          <div>{errors.ward}</div>
                        )}
                      </span>
                    </Box>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <Box style={{ marginBottom: "10px" }}>
                      <TextInput
                        type="number"
                        placeholder="Score Threshold"
                        min="1"
                        max="99"
                        label="Score Threshold"
                        name="score_threshold"
                        onChange={handleChange}
                        value={values.score_threshold}
                      />
                      <span className={style.error}>
                        {errors.score_threshold && touched.score_threshold && (
                          <div>{errors.score_threshold}</div>
                        )}
                      </span>
                    </Box>

                    <Box style={{ marginBottom: "10px" }}>
                      <CustomSelect
                        className={style.custominput}
                        label="User"
                        name="user"
                        placeholder="Select User"
                        options={users}
                        onChange={(option) =>
                          handleUser(setFieldValue, option, values)
                        }
                        value={values.user}
                      />
                      <span className={style.error}>
                        {errors.user && touched.user && (
                          <div>{errors.user}</div>
                        )}
                      </span>
                    </Box>
                  </Grid>
                </Grid>
                {audit
                  ? audit?.map((item, index) => (
                      <CheckBoxes
                        item={item}
                        index={index}
                        values={values}
                        setFieldValue={setFieldValue}
                        audit={audit}
                      />
                    ))
                  : null}
              </Box>
              <Box className={style.btn}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  // onClick={() => setSubmit((old) => old + 1)}
                >
                  {loading ? (
                    <CircularProgress style={{ color: "white" }} />
                  ) : (
                    "Create Audit +"
                  )}
                </Button>
                <Button
                  type="reset"
                  variant="contained"
                  className={style.resetBtn}
                  onClick={() => resetForm()}
                >
                  Reset
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default CreateAudit;
