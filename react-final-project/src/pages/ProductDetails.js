import React from "react";
import { json, useRouteLoaderData } from "react-router-dom";
import ProductDetailsCard from "../components/ProductDetailsCard/ProductDetailsCard";
import globalStyles from "./styles/GlobalStyles.module.css";

const ProductDetails = () => {
  const productData = useRouteLoaderData("product-details");

  return (
    <div>
      <div className={globalStyles["container-wrapper"]}>
        <ProductDetailsCard product={productData.product} />
      </div>
    </div>
  );
};

export const loader = ({ params, request }) => {
  const productId = params.productId;
  return fetch("http://localhost:8080/products/" + productId).then(
    (response) => {
      if (!response.ok) {
        throw json(
          { message: "Could not fetch details for selected event." },
          { status: 500 }
        );
      }

      return response;
    }
  );
};

export default ProductDetails;
