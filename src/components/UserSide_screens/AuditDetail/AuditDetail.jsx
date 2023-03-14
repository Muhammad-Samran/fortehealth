import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Snackbar,
  CircularProgress,
  Button,
} from "@mui/material";
import style from "./style.module.scss";
import { useSelector } from "react-redux";
import TextInput from "../../common/TextInput";
import CustomSelect from "../../common/Select";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  getUserWards,
  perform_audit,
  user_audit,
} from "../../../api/apiClass/forte.class";
import MultiSelects from "./MultiSelects";

const AuditDetail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [wards, setWards] = useState([]);
  const [siteDetail, setSiteDetail] = useState([]);
  const auth = useSelector((state) => state.auth);
  const dataFetchedRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const Id = location?.state?.id;

  const getWardsData = async () => {
    try {
      const response = await getUserWards();
      response?.data?.data?.getWard?.forEach((record) => {
        const data = [{ value: record?.id, label: record?.ward_number }];
        setWards((prev) => [...prev, ...data]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getWardsData();
  }, []);

  const getSiteDetail = async () => {
    setLoading(true);
    try {
      const response = await perform_audit(Id);
      console.log(response?.data?.data?.getSite);
      setError(response?.data?.message);
      setSiteDetail(response?.data?.data?.getSite);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getSiteDetail();
  }, []);

  const initialValues = {
    matress_model: "",
    matress_brand: "",
    matress_size: "",
    matress_type: "",
    ward: "",
  };
  const performSchema = Yup.object().shape({
    matress_model: Yup.string().required("Required"),
    matress_brand: Yup.string().required("Required"),
    matress_size: Yup.string().required("Required"),
    matress_type: Yup.object().required("Required"),
    ward: Yup.object().required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const payload = {
        matress_brand: values?.matress_brand,
        matress_model: values?.matress_model,
        matress_size: values?.matress_size,
        matress_type: values?.matress_type?.value,
        param: values?.param,
        ward_id: values?.ward?.value,
        admin_audit_id: Id,
      };

      const response = await user_audit(payload);
      console.log("response", response);
      setError(response?.data?.message);
      if (response?.data?.message == "User Audit Successfully Created") {
        resetForm();
        setTimeout(() => {
          navigate("/auditResult");
        }, 3000);
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

  const matressTypeOptions = [
    {
      label: "Static Foam",
      value: "Static Foam",
    },
    {
      label: "Pumpless Air",
      value: "Pumpless Air",
    },
    {
      label: "Hybrid",
      value: "Hybrid",
    },
  ];

  return (
    <Box style={{ marginBottom: "20px" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={loading}
        autoHideDuration={4000}
        onClose={() => setLoading(false)}
        message={error || "Loading..."}
        // action={action}
      />
      <Box className={style.parent}>
        <Typography variant="h4">Audit to Perform</Typography>
        <Box className={style.main_box}>
          <Box>
            <Typography variant="h6">
              Site: {siteDetail?.site?.toUpperCase()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              Score Threshold: {siteDetail?.score_threshold}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Status: {siteDetail?.status}</Typography>
          </Box>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={performSchema}
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
                        placeholder="Matress Model"
                        label="Matress Model"
                        name="matress_model"
                        onChange={handleChange}
                        value={values.matress_model}
                      />
                      <span className={style.error}>
                        {errors.matress_model && touched.matress_model && (
                          <div>{errors.matress_model}</div>
                        )}
                      </span>
                    </Box>
                    <Box style={{ marginBottom: "10px" }}>
                      <TextInput
                        type="text"
                        placeholder="Matress Size"
                        label="Matress Size"
                        name="matress_size"
                        onChange={handleChange}
                        value={values.matress_size}
                      />
                      <span className={style.error}>
                        {errors.matress_size && touched.matress_size && (
                          <div>{errors.matress_size}</div>
                        )}
                      </span>
                    </Box>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <Box style={{ marginBottom: "10px" }}>
                      <TextInput
                        type="text"
                        placeholder="Matress Brand"
                        label="Matress Brand"
                        name="matress_brand"
                        onChange={handleChange}
                        value={values.matress_brand}
                      />
                      <span className={style.error}>
                        {errors.matress_brand && touched.matress_brand && (
                          <div>{errors.matress_brand}</div>
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
                </Grid>
                <Box style={{ marginBottom: "10px" }}>
                  <CustomSelect
                    className={style.custominput}
                    label="Matress Type"
                    name="matress_type"
                    placeholder="Select Matress Type"
                    options={matressTypeOptions}
                    onChange={(option) => setFieldValue("matress_type", option)}
                    value={values.matress_type}
                  />
                  <span className={style.error}>
                    {errors.matress_type && touched.matress_type && (
                      <div>{errors.matress_type}</div>
                    )}
                  </span>
                </Box>
                {siteDetail?.admin_audit_param
                  ? siteDetail?.admin_audit_param?.map((item, index) => (
                      <MultiSelects
                        item={item}
                        index={index}
                        values={values}
                        setFieldValue={setFieldValue}
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
                    "Perform Audit"
                  )}
                </Button>
                {/* <Button
                  type="reset"
                  variant="contained"
                  className={style.resetBtn}
                  onClick={() => resetForm()}
                >
                  Reset
                </Button> */}
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AuditDetail;
