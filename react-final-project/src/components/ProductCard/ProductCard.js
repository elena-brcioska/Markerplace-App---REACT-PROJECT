import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button, Grid, Paper } from "@mui/material";
import { CartContext } from "../../context/Context";
import { getUser } from "../../util/auth";
import styles from "../GlobalStyles/GlobalStyles.module.css";
import { Box } from "@mui/system";

const ProductCard = ({ product }) => {
  const globalState = useContext(CartContext);
  const dispatch = globalState.dispatch;

  const isDisabled =
    globalState.state.filter((item) => item.id === product.id).length === 0;

  const user = getUser();

  return (
    <Grid item xs={12} md={6} lg={4} sx={{ marginBottom: "32px" }}>
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
          <Box>
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
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
              <h4
                className={styles["product-price"]}
              >{`Price: $${product.cost}`}</h4>
            </Box>
          </Box>

          {user && (
            <Box>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  dispatch({ type: "ADD", payload: product });
                }}
                sx={{ pointerEvents: "auto", alignSelf: "center" }}
                disabled={!isDisabled}
              >
                Add To Cart
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

export default ProductCard;
