import { Typography, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { tutorial } from "../../api/apiClass/forte.class";
import style from "./style.module.scss";

const Tutorial = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tutorials, setTutorials] = useState([]);

  const getTutorial = async () => {
    setLoading(true);
    try {
      const response = await tutorial();
      // console.log(response);
      setError(response?.data?.message);
      setTutorials(response?.data?.data?.tutorial);
    } catch (err) {
      console.log("Failed to get tutorial", err);
      setLoading(false);
      setError(error?.message);
    }
  };

  useEffect(() => {
    getTutorial();
  }, []);
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
          <Typography variant="h4">Tutorials</Typography>
        </Box>
        {tutorials ? (
          tutorials?.map((item, index) => (
            <Box key={index}>
              <iframe
                width="560"
                height="315"
                src={item.path}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </Box>
          ))
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default Tutorial;
