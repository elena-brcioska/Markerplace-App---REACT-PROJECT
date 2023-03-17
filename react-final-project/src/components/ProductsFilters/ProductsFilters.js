import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PriceRangeSlider from "./PriceRangeSlider";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import SimpleAccordion from "./Accordion";
import { getAuthToken, getUser } from "../../util/auth";
import globalStyles from "../../pages/styles/GlobalStyles.module.css";
import styles from "./ProductFilters.module.css";

const ProductsFilters = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = getAuthToken();
  const user = getUser();

  const [order, setOrder] = useState("");
  const [clearFilters, setClearFilters] = useState(false);
  console.log("order", order);

  const changeSortingHandler = (e) => {
    if (e.target.value !== "") {
      queryParams.set("sort", e.target.value);
      navigate({
        pathname: location.pathname,
        search: queryParams.toString(),
      });
    } else {
      queryParams.delete("sort");
      navigate({
        pathname: location.pathname,
        search: queryParams.toString(),
      });
    }
    setOrder(e.target.value);
  };

  const clearFiltersHandler = () => {
    setClearFilters(true);
    setOrder("");
    navigate({
      pathname: location.pathname,
      search: "",
    });
  };

  const [open, setOpen] = useState(false);

  return (
    <Paper elevation={5}>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {/* MOBILE VIEW */}
        <SimpleAccordion>
          <Box>
            <Grid container sx={{ display: "flex", alignItems: "center" }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{ padding: "0", margin: 0 }}
                    color="secondary"
                    id="orderLabel"
                  >
                    Product Order:
                  </InputLabel>
                  <Select
                    multiline={true}
                    rows={3}
                    name="order"
                    id="order"
                    value={order}
                    className={styles["actions-select"]}
                    labelId="orderLabel"
                    label="Product order:"
                    onChange={(e) => changeSortingHandler(e)}
                    sx={{
                      width: "250px",
                      color: "#000",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#655DBB",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#655DBB",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#655DBB",
                      },
                    }}
                  >
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ paddingLeft: { xs: "20px", sm: 0 } }}>
                  <PriceRangeSlider data-testid="slider-1" data={data} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </SimpleAccordion>
      </Box>
      {/* MOBILE VIEW END */}
      <Box
        className={styles["actions-container"]}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <div
          className={`${globalStyles["container-wrapper"]} ${styles.actions}`}
        >
          <div>
            <FormControl size="small" fullWidth>
              <InputLabel
                sx={{ padding: "0", margin: 0}}
                color="secondary"
                id="orderLabel"
              >
                Product Order:
              </InputLabel>
              <Select
                data-testid="select-1"
                name="order"
                id="order"
                value={order}
                className={styles["actions-select"]}
                labelId="orderLabel"
                label="Product order:"
                onChange={(e) => changeSortingHandler(e)}
                sx={{
                  width: "250px",
                  // height: "40px",
                  color: "#000",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#655DBB",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#655DBB",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#655DBB",
                  },
                }}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          </div>
          <PriceRangeSlider
            data-testid="slider-2"
            data={data}
            clearFilters={clearFilters}
            setClearFilters={setClearFilters}
          />
          <div>
            <Button
              sx={{
                color: "#9c27b0",
                margin: "0  20px",
                padding: "2px 5px",
                textTransform: "capitalize",
                fontSize: "12px",
                ":hover": {
                  bgcolor: "rgba(62, 84, 172, 0.5)",
                  color: "white",
                },
              }}
              onClick={clearFiltersHandler}
            >
              CLEAR FILTERS
            </Button>
            {user && token && (
              <Link to="new" className={styles["new-product-btn"]}>
                Add New Product
              </Link>
            )}
          </div>
        </div>
      </Box>
    </Paper>
  );
};

export default ProductsFilters;
