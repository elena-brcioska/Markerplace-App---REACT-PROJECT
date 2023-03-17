import { Button, Paper } from "@mui/material";
import React from "react";
import { NavLink, useRouteLoaderData, useSubmit } from "react-router-dom";
import styles from "./ProductActions.module.css";
import globalStyles from "../GlobalStyles/GlobalStyles.module.css"

const ProductNav = () => {
  const submit = useSubmit();
  const token = useRouteLoaderData("root");

  const startDeleteHandler = () => {
    const proceed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (proceed) {
      submit(null, { method: "delete" });
    }

  };

  return (
    <>
      {token && (
        <Paper elevation={5} className={styles["product-actions-wrapper"]}>
          <div className={styles["container-wrapper"]}>
            <div className={styles["product-actions"]}>
              <h5 className={styles["product-actions-text"]}>
                Product Actions:
              </h5>
              <div>
                <NavLink style={{marginRight: "20px"}} to="edit" className={globalStyles["btn"]}>EDIT</NavLink>
                <button className={globalStyles["btn"]} onClick={startDeleteHandler}>DELETE</button>
              </div>
            </div>
          </div>
        </Paper>
      )}
    </>
  );
};

export default ProductNav;
