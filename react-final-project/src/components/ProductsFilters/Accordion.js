import * as React from "react";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { getAuthToken, getUser } from "../../util/auth";
import styles from "./ProductFilters.module.css";

export default function SimpleAccordion(props) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const token = getAuthToken();
  const user = getUser();

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            sx={{
              display: "inline-block",
              justifyContent: "space-between",
              width: "auto",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              sx={{ pointerEvents: "none" }}
            >
              {expanded ? (
                <>
                  <KeyboardArrowUpIcon />
                  <p style={{ fontSize: "18px", marginTop: "10px" }}>
                    Filter Products
                  </p>
                </>
              ) : (
                <>
                  <KeyboardArrowDownIcon />
                  <p style={{ fontSize: "18px", marginTop: "10px" }}>
                    Filter Products
                  </p>
                </>
              )}
            </IconButton>
          </AccordionSummary>

          {user && token && (
            <Link to="new" className={styles["new-product-btn"]}>
              Add New Product
            </Link>
          )}
        </Box>

        <AccordionDetails>{props.children}</AccordionDetails>
      </Accordion>
    </div>
  );
}
