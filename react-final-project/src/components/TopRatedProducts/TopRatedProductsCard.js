import { Grid, Paper, Rating } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../GlobalStyles/GlobalStyles.module.css"


const TopRatedProductsCard = ({ product }) => {
  return (
    <Grid item xs={12} md={6} lg={4} sx={{marginBottom: {xs: "32px", lg: 0}}}>
      <Paper
        className={styles["product-card"]}
        sx={{ borderRadius: "20px" }}
        elevation={10}
      >
        <Box
          className={styles["product-image"]}
          sx={{ backgroundImage: `url(${product.image})` }}
        ></Box>
        <Box className={styles["product-card-info"]}>
          <Box className={styles["product-card-header"]}>
            <Link
              className={styles["product-card-title"]}
              to={`/products/${product.id}`}
            >
              {product.title}
            </Link>
            <p className={styles.date}>{`Date added: ${product.date}`}</p>
          </Box>

          <h4 className={styles["product-card-heading"]}>Description:</h4>
          <p className={styles["product-card-text"]}>{product.description}</p>
          <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Box className={styles["product-rating"]}>
              <p>Rating:</p>
              <Rating
                sx={{ marginLeft: "8px" }}
                name="simple-controlled"
                value={parseInt(product.rating)}
                precision={0.5}
                size="large"
                readOnly
              />
            </Box>
          <h4 className={styles["product-price"]}>{`Price: $${product.cost}`}</h4>

          </Box>

        </Box>
      </Paper>
    </Grid>
  );
};

export default TopRatedProductsCard;
