import React from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@mui/material";

const ProductList = ({ products }) => {
  return (
    <div>
        <Grid container>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
    </div>
  );
};

export default ProductList;
