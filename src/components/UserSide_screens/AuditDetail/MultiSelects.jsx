import React, { useState, useEffect, useRef } from "react";
import CustomSelect from "../../common/Select";
import style from "./style.module.scss";
import {
  Box,
  Grid,
  Typography,
  Snackbar,
  CircularProgress,
  Button,
} from "@mui/material";

const MultiSelects = ({ item, index, values, setFieldValue }) => {
  const [options, setOptions] = useState([]);
  const setRef = useRef(false);

  const setOption = async () => {
    try {
      item?.audit_param?.forEach((record) => {
        const data = [{ value: record?.id, label: record?.params }];
        setOptions((prev) => [...prev, ...data]);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (setRef.current) return;
    setRef.current = true;
    setOption();
  }, []);
  return (
    <>
      <Grid item md={6} xs={6} style={{ marginBottom: "10px" }}>
        <CustomSelect
          className={style.custominput}
          label={`${index + 1}: ${item?.sub_category_name}`}
          name={`param[${index}][audit_param_id]`}
          placeholder="Select Here..."
          options={options}
          onChange={(option) =>
            setFieldValue(`param[${index}][audit_param_id]`, option.value)
          }
          value={options?.map(
            (x) =>
              values?.[`param`]?.[`${index}`]?.["audit_param_id"] ==
                x.value && { label: x.label }
          )}
        />
      </Grid>
    </>
  );
};

export default MultiSelects;
