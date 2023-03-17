import { render, screen } from "@testing-library/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./Hero";

describe("Hero section tests", () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Hero />,
    },
  ]);

  test("Hero text is rendered", () => {
    render(
      <RouterProvider router={router}>
        <Hero />
      </RouterProvider>
    );

    const heroText = screen.getByText("SHOP WITH A TAP");
    expect(heroText).toBeInTheDocument();
  });

  test("Shop Now button is rendered", () => {
    render(
      <RouterProvider router={router}>
        <Hero />
      </RouterProvider>
    );

    const shopNowBtn = screen.getByRole("link", {name: /SHOP NOW/i});
    expect(shopNowBtn).toBeInTheDocument();
  });

  test("Shop Now button navigates to Products page", () => {
    render(
      <RouterProvider router={router}>
        <Hero />
      </RouterProvider>
    );

    const shopNowBtn = screen.getByRole("link", {name: /SHOP NOW/i});
    expect(shopNowBtn).toHaveAttribute('href', '/products');
  });
});
