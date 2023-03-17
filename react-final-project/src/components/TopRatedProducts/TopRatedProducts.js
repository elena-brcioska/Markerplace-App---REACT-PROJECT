import { Grid } from "@mui/material";
import React from "react";
import TopRatedProductsCard from "./TopRatedProductsCard";
import styles from "./TopRatedProducts.module.css";

const sortByRating = (productA, productB) => {
  return productB.rating - productA.rating;
};

const TopRatedProducts = ({ products }) => {
  const topProducts = products.sort(sortByRating).slice(0, 3);

  return (
    <div>
      <div className={styles["top-products-heading"]}>
        <h2 className={styles["products-heading"]}>TOP RATED PRODUCTS</h2>
        <p className={styles["products-subheading"]}>
          The best items picked by our customers
        </p>
      </div>

      <div>
        <Grid sx={{width: "90%", margin: "auto"}} container>
          {topProducts.map((product) => (
            <TopRatedProductsCard data-testid="topratedproductcard" key={product.id} product={product} />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default TopRatedProducts;
