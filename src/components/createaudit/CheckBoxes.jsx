import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const CheckBoxes = ({ item, index, values, setFieldValue, audit }) => {
  const [sections, setSections] = useState([{ len: "" }]);
  const [totalIndex, setTotalIndex] = useState([{ total: "" }]);

  useEffect(() => {
    let newValues = [...sections];
    audit?.map((x, y) => {
      newValues[y] = { len: x?.audit_sub_category?.length };
    });
    setSections(newValues);
  }, []);

  useEffect(() => {
    let newValues = [...totalIndex];
    let numb = 0;
    for (let i = 0; i < sections.length; i++) {
      if (index == i) {
        for (let j = index; j >= 0; j--) {
          numb = numb + sections[j].len;
        }
        numb = numb - sections[i].len;
        newValues[i] = { total: numb };
      }
    }
    setTotalIndex(newValues);
  }, [sections]);

  const handleOption = async (value, key, index, check) => {
    setFieldValue(
      `categories[${key + totalIndex[index]?.total}][value]`,
      value
    );
    setFieldValue(
      `categories[${key + totalIndex[index]?.total}][category_id]`,
      item?.id
    );
    setFieldValue(
      `categories[${key + totalIndex[index]?.total}][sub_category_id]`,
      check?.id
    );
    setFieldValue(
      `categories[${key + totalIndex[index]?.total}][sub_category_name]`,
      check?.name
    );
  };
  return (
    <Card sx={{ minWidth: 275, marginBottom: "10px", marginTop: "10px" }}>
      <CardContent>
        <Typography sx={{ marginBottom: "10px" }} variant="h5" component="div">
          {item?.name}
        </Typography>
        {item?.audit_sub_category?.map((check, key) => (
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FormLabel id={key}>
              {key + totalIndex[index]?.total + 1}
              {bull}
              {check?.name}
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name={`categories[${key}]`}
              value={
                values[`categories`]
                  ? values[`categories`]?.[key + totalIndex[index]?.total]?.[
                      "value"
                    ]
                  : ""
              }
              sx={{ flexDirection: "row", marginLeft: "20px" }}
              onChange={(e) => handleOption(e.target.value, key, index, check)}
            >
              <FormControlLabel control={<Radio />} label="Yes" value="1" />
              <FormControlLabel control={<Radio />} label="No" value="0" />
            </RadioGroup>
          </FormControl>
        ))}
        <Typography variant="body2"></Typography>
      </CardContent>
    </Card>
  );
};

export default CheckBoxes;
