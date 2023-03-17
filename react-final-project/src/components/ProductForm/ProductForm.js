import React, { useState } from "react";
import { Paper, Rating, TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import {
  Form,
  json,
  redirect,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import classes from "./ProductForm.module.css";
import { getAuthToken } from "../../util/auth";

import styles from "../GlobalStyles/GlobalStyles.module.css";
import globalStyles from "../../pages/styles/GlobalStyles.module.css";
import { Box } from "@mui/system";

const ProductForm = ({ method, product }) => {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const location = useLocation().pathname.split("/");
  const currentLocation = location[location.length - 1];

  const isSubmitting = navigation.state === "submitting";

  const [rating, setRating] = useState(2);

  const cancelHandler = () => {
    navigate("..");
  };

  return (
    <Box
      sx={{ minHeight: "85vh", display: "flex", alignItems: "center" }}
      className={globalStyles.container}
    >
      <Paper
        className={globalStyles["access-card"]}
        sx={{ borderRadius: "16px" }}
        elevation={10}
      >
        <Form method={method} className={classes.form}>
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
          {
            currentLocation === "new" ? (<h1>Add New Product</h1>) : (<h1>Edit Product</h1>)
          }

          <p>
            <label htmlFor="title">Title</label>
            <TextField
              variant="standard"
              id="title"
              type="text"
              name="title"
              required
              defaultValue={product ? product.title : ""}
              fullWidth
              sx={{
                marginBottom: "24px",
              }}
            />
          </p>
          <p>
            <label htmlFor="image">Image</label>
            <TextField
              variant="standard"
              id="image"
              type="url"
              name="image"
              required
              defaultValue={product ? product.image : ""}
              fullWidth
              sx={{
                marginBottom: "24px",
              }}
            />
          </p>
          <p></p>
          <p>
            <label htmlFor="description">Description</label>
            <Textarea
              variant="outlined"
              id="description"
              name="description"
              rows="5"
              required
              defaultValue={product ? product.description : ""}
              sx={{
                margin: "16px 0 24px 0",
              }}
            />

            <label htmlFor="rating">Rating:</label>

            <>
              <input
                name="rating"
                type="hidden"
                value={rating}
                hidden
                readOnly
              />
              <Rating
                name="rating"
                value={rating}
                precision={1}
                onChange={(_, value) => {
                  setRating(value);
                }}
                sx={{
                  marginBottom: "24px",
                }}
              />
            </>

            <label htmlFor="cost">Cost</label>
            <TextField
              variant="standard"
              id="cost"
              type="number"
              name="cost"
              required
              defaultValue={product ? product.cost : ""}
              fullWidth
              sx={{
                marginBottom: "24px",
              }}
            />
          </p>
          <div className={classes.actions}>
            <button
              className={styles["btn"]}
              type="button"
              onClick={cancelHandler}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button className={styles["btn"]} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Save"}
            </button>
          </div>
        </Form>
      </Paper>
    </Box>
  );
};

export default ProductForm;

export const action = async ({ request, params }) => {
  const method = request.method;
  const token = getAuthToken();

  const date = new Date();

  const data = await request.formData();
  const newProduct = {
    title: data.get("title"),
    image: data.get("image"),
    date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    description: data.get("description"),
    rating: data.get("rating"),
    cost: data.get("cost"),
    comments: [],
  };

  let url = "http://localhost:8080/products";

  if (method === "PATCH") {
    const productId = params.productId;
    url = "http://localhost:8080/products/" + productId;
  }

  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newProduct),
  }).then((response) => {
    if (response.status === 422) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: "Could not save event." }, { status: 500 });
    }

    return redirect("/products");
  });
};
