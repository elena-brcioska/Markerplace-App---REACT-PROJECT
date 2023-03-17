import React, { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import ResponsiveAppBar from "../components/Navbar/Navbar";
import { getTokenDuration } from "../util/auth";

const RootLayout = () => {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { method: "post", action: "/logout" });
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { method: "post", action: "/logout" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <ResponsiveAppBar />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default RootLayout;
