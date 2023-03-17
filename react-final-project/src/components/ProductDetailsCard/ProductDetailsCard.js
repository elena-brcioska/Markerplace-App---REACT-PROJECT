import { Button, Grid, Rating } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./ProductDetailsCard.module.css";
import globalStyles from "../GlobalStyles/GlobalStyles.module.css";
import { getUser } from "../../util/auth";
import { CartContext } from "../../context/Context";

const ProductDetailsCard = ({ product }) => {
  const location = useLocation().pathname.split("/");
  const currentLocation = location[location.length - 1];

  const user = getUser();

  const globalState = useContext(CartContext);
  const dispatch = globalState.dispatch;

  return (
    <Grid container>
      <Grid
        item
        md={6}
        sm={12}
        className={styles["product-image"]}
        sx={{
          backgroundImage: `url(${product.image})`,
          minHeight: { xs: "200px", sm: "400px", md: "70vh" },
          maxHeight: { md: "70vh" },
        }}
      ></Grid>

      <Grid
        item
        md={6}
        sm={12}
        sx={{
          width: "100%",
          paddingLeft: { lg: "100px", md: "50px", sm: 0 },
          minHeight: { md: "65vh" },
          maxHeight: { lg: "900px" },
        }}
      >
        <h2>{product.title}</h2>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "16px 0",
          }}
        >
          <h4
            className={globalStyles["product-price"]}
          >{`Price: $${product.cost}`}</h4>
          <p className={globalStyles.date}> {`Date added: ${product.date}`}</p>
        </Box>
        <h4 className={globalStyles["product-card-heading"]}>Description:</h4>
        <p className={globalStyles["product-card-text"]}>
          {product.description}
        </p>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0"
          }}
        >
          <Rating
            name="simple-controlled"
            value={parseInt(product.rating)}
            precision={0.5}
            readOnly
          />
          {user && (
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                dispatch({ type: "ADD", payload: product });
              }}
              sx={{ pointerEvents: "auto" }}
            >
              Add To Cart
            </Button>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0",
            marginTop: "50px"
          }}
        >
          <h4>Comments: </h4>
          {currentLocation === "comments" && (
            <Link className={styles["comments-link"]} to=".." relative="path">
              &#9652; Hide comments
            </Link>
          )}
          {currentLocation !== "comments" && (
            <Link className={styles["comments-link"]} to="comments">
              &#9662; Show comments
            </Link>
          )}
        </Box>

        <Outlet />
      </Grid>
    </Grid>
  );
};

export default ProductDetailsCard;
