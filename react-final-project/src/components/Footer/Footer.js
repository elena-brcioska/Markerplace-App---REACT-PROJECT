import { Grid } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import globalStyles from "../../pages/styles/GlobalStyles.module.css";

const Footer = () => {
  return (
    <Box
      sx={{
        background: " rgb(25,0,36)",
        background:
          "linear-gradient(149deg, rgba(25,0,36,0.7) 0%, rgba(112,9,121,0.7) 36%, rgba(67,5,181,0.7) 63%)",
        color: "#fff",
      }}
    >
      <Box className={globalStyles["container-wrapper"]} sx={{padding: "20px 0 50px"}}>
        <Grid container>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StorefrontIcon />
              <h3>MARKETPLACE</h3>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p>8240 Walnut Court</p>
            <p>Louisville, KY 40207</p>
            <p>+1-202-555-0115</p>
            <p>info@thecupcakefactory.org</p>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <p>Home</p>
            <p>About</p>
            <p>Services</p>
            <p>Terms of service</p>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <h3>Social Networks:</h3>
            <p>Reach out to us through our social networks</p>
            <Box sx={{display: "flex", justifyContent: "space-between", width: "50%"}}>
              <FacebookIcon />
              <InstagramIcon />
              <LinkedInIcon />
              <TwitterIcon />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
