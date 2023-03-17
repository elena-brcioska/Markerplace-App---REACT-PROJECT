import React from "react";
import { Box, Button, Grid, Paper } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { Form, json, redirect, useRouteLoaderData } from "react-router-dom";
import { getAuthToken, getUser } from "../../util/auth";
import CommentCard from "./CommentCard";
import styles from "./Comments.module.css";

const Comments = () => {
  const user = getUser();

  const productData = useRouteLoaderData("product-details");
  const productComments = productData.product.comments;

  console.log(productComments.length);

  return (
    <div>
      <Grid
        container
        spacing={0}
        sx={{ padding: "16px", overflowY: "scroll", maxHeight: "250px" }}
      >
        {productComments.length <= 0 && (
          <Box sx={{textAlign: "center", width: "100%", padding: "16px 0"}}>
            <p className={styles["no-comments"]}>
              Be the first to comment on this item
            </p>
          </Box>
        )}
        {productComments.map((comment, index) => (
          <CommentCard
            key={index}
            comment={comment.text}
            email={comment.email}
          />
        ))}
      </Grid>
      <Box>
        {user && (
          <Form style={{ padding: "10px 16px" }} method="post">
            <Textarea
              id="newComment"
              name="text"
              defaultValue=""
              color="info"
              disabled={false}
              minRows={2}
              placeholder="Add new comment"
              size="lg"
              variant="outlined"
            />
            <Button
              color="secondary"
              sx={{
                margin: "8px 0",
                ":hover": {
                  background: "#9c27b0",
                  color: "#fff",
                },
                float: "right",
              }}
              type="submit"
            >
              Submit comment
            </Button>
          </Form>
        )}
      </Box>
    </div>
  );
};

export default Comments;

export const action = async ({ request, params }) => {
  const token = getAuthToken();
  const user = getUser();
  const productId = params.productId;

  let data = await request.formData();

  const newComment = {
    email: user,
    text: data.get("text"),
  };

  console.log("new Comment", newComment);

  return fetch("http://localhost:8080/products/" + productId + "/comments", {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newComment),
  }).then((response) => {
    if (!response.ok) {
      throw json({ message: "Could not post comment." }, { status: 500 });
    }
    return redirect("");
  });
};
