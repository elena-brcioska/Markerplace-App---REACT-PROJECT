import React from "react";
import Box from "@mui/material/Box";
import styles from "./Hero.module.css";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

const Hero = () => {
  return (
    <Grid container className={styles.hero}>
      <Grid item sm={12} md={6} lg={6} xl={6} className={styles["hero-text-container"]}>
        <Box className={styles.mobile}>
          <Box className={styles["hero-text"]}>
            <h1 className={styles["main-heading"]}>SHOP WITH A TAP</h1>
            <p className={styles["sub-heading"]}>
              Buy from the comfort of your home
            </p>
          </Box>

          <Link to="products" className={styles.btn}>
            SHOP NOW
          </Link>
        </Box>
      </Grid>
      <Grid item sm={12} md={6} lg={6} xl={6} className={styles["hero-img-container"]}>
        <img
          src="https://i.postimg.cc/nLHXXTj0/HERO.png"
        />
      </Grid>
    </Grid>
  );
};

export default Hero;
