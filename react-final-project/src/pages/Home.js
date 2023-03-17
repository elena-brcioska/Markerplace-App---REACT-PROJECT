import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import TopRatedProducts from "../components/TopRatedProducts/TopRatedProducts";
import globalStyles from "./styles/GlobalStyles.module.css";

const Home = () => {
  const data = useLoaderData();

  return (
    <div>
      <Hero />
      <div className={globalStyles.container}>
        <TopRatedProducts products={data.products} />
      </div>
    </div>
  );
};

export default Home;
