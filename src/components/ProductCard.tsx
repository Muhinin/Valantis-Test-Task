import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { productType } from "../types/types";

interface IProductCard {
  product: productType;
}

const ProductCard: React.FC<IProductCard> = ({ product }) => (
  <Grid item xs={3} key={product.id}>
    <Paper sx={{ padding: "8px", textAlign: "left", minHeight: 130 }}>
      <Typography sx={{ fontSize: 10, color: "gray" }}>
        Id: {product.id}
      </Typography>
      <Typography>{product.product}</Typography>
      <Typography sx={{ color: "grey" }}>
        Бренд: {product.brand || "Не указан"}
      </Typography>
      <Box display="flex" width="100%" justifyContent="flex-end">
        <Typography sx={{ fontWeight: 600, color: "darkred" }}>
          Цена: {product.price}
        </Typography>
      </Box>
    </Paper>
  </Grid>
);

export default ProductCard;
