import React from "react";
import { json, Outlet, redirect, useLocation } from "react-router-dom";
import ProductActions from "../components/ProductActions/ProductActions";
import { getAuthToken } from "../util/auth";

const ProductsRoot = () => {
  const location = useLocation().pathname.split("/");
  const currentLocation = location[location.length - 1];

  return (
    <>
      {currentLocation !== "edit" && <ProductActions />}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default ProductsRoot;

export const action = ({ params, request }) => {
  const productId = params.productId;
  const token = getAuthToken();

  return fetch("http://localhost:8080/products/" + productId, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    if (!response.ok) {
      throw json({ message: "Could not delete product." }, { status: 500 });
    }

    return redirect("/products");
  });
};
