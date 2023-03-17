import React from "react";
import { json, useLoaderData, useLocation } from "react-router-dom";
import ProductList from "../components/ProductCard/ProductList";
import ProductsFilters from "../components/ProductsFilters/ProductsFilters";
import { copyData, getMaxRange, getMinRange } from "../util/productsPriceRange";
import globalStyles from "./styles/GlobalStyles.module.css"

const sortProducts = (products, order) => {
  return products.sort((productA, productB) => {
    if (order === "asc") {
      return parseInt(productA.cost) > parseInt(productB.cost) ? 1 : -1;
    } else if (order === "desc") {
      return parseInt(productA.cost) < parseInt(productB.cost) ? 1 : -1;
    } 
  });
};

const Products = () => {
  const data = useLoaderData();

  console.log("DATA PRODUCTS", data)
  
  const location = useLocation();

  const dataCopy = copyData(data)

  const minRange = getMinRange(dataCopy);
  const maxRange = getMaxRange(dataCopy);

  console.log("NEW FILTER", minRange, maxRange)


  const queryParams = new URLSearchParams(location.search);
  const orderFilter = queryParams.get("sort");
  console.log("ORDER FILTER", orderFilter)
  const PriceRangeFilter = queryParams.get("filter")?.split("-") || [minRange, maxRange] ;

  const filterProducts = (products, a, b) => {
    if (PriceRangeFilter) {
      const filteredProducts = products.filter((product) => {
        return a <= parseInt(product.cost) && parseInt(product.cost) <= b;
      });
      return sortProducts(filteredProducts, orderFilter);
    } else {
      return sortProducts(products, orderFilter);
    }
  };

  const products = filterProducts(
    data.products,
    PriceRangeFilter[0],
    PriceRangeFilter[1]
  );

  console.log("FILTERED PRODUCTS", products)

  return (
    <div>
      <ProductsFilters data={data} />
      <div className={globalStyles["container-wrapper"]}>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export const loader = () => {
  return fetch("http://localhost:8080/products").then((response) => {
    if (!response.ok) {
      throw json({ message: "Could not fetch events" }, { status: 500 });
    } else {
      return response;
    }
  });
};

export default Products;
