import React, { useEffect, useState } from "react";
import { apiActions, productType } from "./types/types";
import { fetchData } from "./api/api";
import { Box, Grid } from "@mui/material";
import ProductCard from "./components/ProductCard";
import Loader from "./components/Loader";

function App() {
  const [data, setData] = useState<productType[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData(apiActions.GET_IDS, {
      offset: 0,
      limit: 50,
    })
      .then((res) =>
        fetchData(apiActions.GET_ITEMS, { ids: res.result }).then((res) =>
          setData(res.result)
        )
      )
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

  return (
      <Box sx={{ flexGrow: 1, maxWidth: 1200, margin: "0px auto" }}>
        <Grid container spacing={2}>
          {isLoading ? (
            <Loader />
          ) : (
            data &&
            data.map((product: productType) => (
              <ProductCard product={product} />
            ))
          )}
        </Grid>
      </Box>
  );
}

export default App;
