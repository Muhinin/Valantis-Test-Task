import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { gap, headerHeight } from "../constants/constants";

const Loader: React.FC = () => (
  <Box
    display="flex"
    alignItems="center"
    width="100%"
    justifyContent="center"
    height={`calc(100vh - ${headerHeight}px - 2 * ${gap}px)`}
  >
    <CircularProgress sx={{ margin: 0 }} />
  </Box>
);

export default Loader;
