import { useContext } from "react";
import { redirect } from "react-router-dom";
import { CartContext } from "../context/Context";

export const action = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("expiration");
  localStorage.removeItem("MARKETPLACE_CART");
  return redirect("/");
};
