import { Box } from "@mui/system";
import React, { useContext } from "react";
import { CartContext } from "../../context/Context";
import styles from "./Cart.module.css";
import globalStyles from "../GlobalStyles/GlobalStyles.module.css";

const CartItem = ({ cartItem }) => {
  const dispatch = useContext(CartContext).dispatch;

  return (
    <div className={styles["cart-item"]}>
      <Box
        className={styles["product-image"]}
        sx={{ backgroundImage: `url(${cartItem.image})` }}
      ></Box>

      <div className={`${styles["cart-info-box"]} ${styles.text}`}>
        <p>Price:</p>
        <p>{`$${cartItem.cost * cartItem.quantity}`}</p>
      </div>

      <div className={`${styles["cart-info-box"]} ${styles.text}`}>
        <p>Quantity:</p>

        <div className={styles.quantity}>
          <button onClick={() => dispatch({ type: "DECREASE", payload: cartItem })}>-</button>
          <p>{cartItem.quantity}</p>
          <button
            onClick={() => dispatch({ type: "INCREASE", payload: cartItem })}
          >
            +
          </button>
        </div>
        <button onClick={() => dispatch({ type: "REMOVE", payload: cartItem })} className={globalStyles["btn"]}>remove</button>
      </div>
    </div>
  );
};

export default CartItem;
