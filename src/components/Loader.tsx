import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader: React.FC = () => (
  <Box
    display={"flex"}
    alignItems={"center"}
    width={"100%"}
    justifyContent={"center"}
    height={"100vh"}
  >
    <CircularProgress sx={{ margin: 0 }} />
  </Box>
);

export default Loader;