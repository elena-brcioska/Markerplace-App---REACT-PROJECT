import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import AuthenticationForm from "./AuthenticationForm";

describe("Authentication Form tests", () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthenticationForm />,
    },
  ]);

  test("On initial render save button is enabled", () => {
    render(
      <RouterProvider router={router}>
        <AuthenticationForm />
      </RouterProvider>
    );
    waitFor(() =>
      expect(screen.findByRole("button", { name: /Save/i })).toHaveAttribute(
        "enabled"
      )
    );
  });

  test("On submit save button is changed to submitting", () => {
    render(
      <RouterProvider router={router}>
        <AuthenticationForm />
      </RouterProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(
      screen.findByRole("button", { name: /Submitting.../i })
    ).toBeTruthy();
  });

});
