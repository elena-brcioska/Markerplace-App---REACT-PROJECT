import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import CartFooter from "../components/Cart/CartFooter";
import CartItem from "../components/Cart/CartItem";
import { CartContext } from "../context/Context";
import globalStyles from "./styles/GlobalStyles.module.css";

const Cart = () => {
  const cartItems = useContext(CartContext);

  console.log("CART ITEMS", cartItems.state);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
      className={globalStyles.container}
    >
      <Paper
        className={globalStyles["access-card"]}
        sx={{ borderRadius: "16px"}}
        elevation={10}
      >
        <Box sx={{ overflowY: "auto", maxHeight: "500px", minHeight: "500px" }}>
          {cartItems.state.length > 0 ? (
            cartItems.state.map((cartItem) => {
              return <CartItem key={cartItem.id} cartItem={cartItem} />;
            })
          ) : (
            <Box sx={{height: "500px", display: "flex", alignItems: "center", justifyContent: "center"}}><h2>Your cart is empty! </h2></Box>
          )}
        </Box>

        {cartItems.state.length > 0 && <CartFooter />}
      </Paper>
    </Box>
  );
};

export default Cart;
