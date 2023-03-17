import { useContext, useEffect } from "react";
import { CartContext } from "./context/Context";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Comments, {
  action as submitCommentAction,
} from "./components/Comments/Comments";
import Home from "./pages/Home";
import ProductDetails, {
  loader as productDetailsloader,
} from "./pages/ProductDetails";
import Products, { loader as productsLoader } from "./pages/Products";
import Access, { action as loginAction } from "./pages/Access";
import RootLayout from "./pages/RootLayout";
import ProductsRoot, { action as deleteAction } from "./pages/ProductsRoot";
import AddNewProduct from "./pages/AddNewProduct";
import { action as manipulateProductAction } from "./components/ProductForm/ProductForm";
import EditProduct from "./pages/EditProduct";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import { action as logoutAction } from "./pages/Logout";
import Cart from "./pages/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Home />,
        loader: productsLoader,
      },
      {
        path: "cart",
        element: <Cart />,
        loader: checkAuthLoader
      },
      {
        path: "/access",
        element: <Access />,
        action: loginAction,
      },
      {
        path: "/logout",
        action: logoutAction,
        loader: checkAuthLoader
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <Products />,
            loader: productsLoader,
          },
          {
            path: ":productId",
            element: <ProductsRoot />,
            loader: productDetailsloader,
            action: deleteAction,
            id: "product-details",
            children: [
              {
                path: "",
                element: <ProductDetails />,
                children: [
                  {
                    path: "comments",
                    element: <Comments />,
                    action: submitCommentAction,
                  },
                ],
              },
              {
                path: "edit",
                element: <EditProduct />,
                action: manipulateProductAction,
                loader: checkAuthLoader
              },
            ],
          },
          {
            path: "new",
            element: <AddNewProduct />,
            action: manipulateProductAction,
            loader: checkAuthLoader
          },
        ],
      },
    ],
  },
]);

function App() {
  const cartItems = useContext(CartContext);
  const dispatch = cartItems.dispatch;

  useEffect(() => {
    const cartData = window.localStorage.getItem("MARKETPLACE_CART");
    if (cartData !== null) {
      dispatch({
        type: "GET_FROM_LOCALSTORAGE",
        payload: JSON.parse(cartData),
      });
    } else {
      dispatch({
        type: "REMOVE_ALL",
      });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("MARKETPLACE_CART", JSON.stringify(cartItems.state));
  }, [cartItems]);

  return <RouterProvider router={router} />;
}

export default App;
