import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import { CartContext } from "../../context/Context";
import styles from "./Cart.module.css";

const CartFooter = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cartItems = useContext(CartContext);
  const dispatch = cartItems.dispatch
  const totalCost = cartItems.state.reduce((accumulator, item) => {
    return accumulator + item.cost * item.quantity;
  }, 0);
  const totalQuantity = cartItems.state.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {xs: "70%", md: "40%"},
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "20px",
    padding: {xs: "24px", md: "70px"},
  };

  return (
    <div>
      <div className={styles["cart-footer"]}>
        <div className={`${styles["cart-info-box"]} ${styles.text}`}>
          <h3>Total</h3>
        </div>

        <div className={`${styles["cart-info-box"]} ${styles.text}`}>
          <h4>{totalCost}</h4>
        </div>

        <div className={`${styles["cart-info-box"]} ${styles.text}`}>
          <h4>{totalQuantity}</h4>
        </div>
      </div>
      <div className={`${styles["cart-info-box"]} ${styles.button}`}>
        <Button onClick={handleOpen} variant="contained" color="success">
          Proceed
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper elevation={10} sx={style}>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: {xs: "300" ,md: "350px"}}}>
              <h2 className={styles["modal-text"]}>Order completed!</h2>
              <h1 className={styles["modal-thank-you"]}>
                Thank you for shopping with us
              </h1>
              <Box sx={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                <Link to="/products" className={styles["modal-btn"]} onClick={() => dispatch({type: "REMOVE_ALL"})}>Continue Shopping</Link>
              </Box>
            </Box>
          </Paper>
        </Modal>
      </div>
    </div>
  );
};

export default CartFooter;
