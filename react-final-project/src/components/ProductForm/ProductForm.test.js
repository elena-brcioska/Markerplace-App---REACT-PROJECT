import { getByLabelText, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductForm from "./ProductForm"

test("can be able to type in title field", () => {

    const router = createBrowserRouter([
        {
          path: "/",
          element: <ProductForm />,
        },
      ]);

      render(<RouterProvider router={router}>
        <ProductForm/>
      </RouterProvider>)

        const titleInput = screen.getByLabelText("Title")
        userEvent.type(titleInput, "elena@test.com");
        expect(titleInput.value).toBe("elena@test.com")
})