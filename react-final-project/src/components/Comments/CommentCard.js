import { Grid, Paper } from "@mui/material";
import React from "react";

const CommentCard = ({ comment, email }) => {
  return (
    <Grid item xs={12} lg={12}>
      <Paper elevation={10} sx={{ padding: "8px", margin: "8px 0" }}>
        <h4>{email}</h4>
        <p>{comment}</p>
      </Paper>
    </Grid>
  );
};

export default CommentCard;
