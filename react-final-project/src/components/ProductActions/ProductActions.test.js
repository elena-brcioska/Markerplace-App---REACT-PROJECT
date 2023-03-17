import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createBrowserRouter, createMemoryRouter, RouterProvider } from "react-router-dom";
import ProductActions from "./ProductActions";

describe("Product Actions tests", () => {
  test("delete button can be clicked", () => {
    const startDeleteHandler = jest.fn();

    const router = createBrowserRouter([
      {
        path: "/",
        element: <ProductActions />,
      },
    ]);
    render(
      <RouterProvider router={router}>
        <ProductActions />
      </RouterProvider>
    );

    waitFor(() => {
      const button = screen.findByRole("button", { name: /DELETE/i });
      userEvent.click(button);
      expect(startDeleteHandler).toHaveBeenCalledTimes(1);
    });
  });


});
