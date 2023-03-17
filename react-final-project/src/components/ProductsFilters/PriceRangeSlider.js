import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  copyData,
  getMaxRange,
  getMinRange,
} from "../../util/productsPriceRange";

function valuetext(value) {
  return `${value}`;
}

let beforeChange = null;

export default function PriceRangeSlider({
  data,
  clearFilters,
  setClearFilters,
}) {
  const dataCopy = copyData(data);

  const minRange = getMinRange(dataCopy);
  const maxRange = getMaxRange(dataCopy);

  const [value, setValue] = React.useState([minRange, maxRange]);

  React.useEffect(() => {
    if (clearFilters) {
      setValue([minRange, maxRange]);
      setClearFilters(false);
    }
  }, [clearFilters]);

  const handleChange = (event, newValue) => {
    if (!beforeChange) {
      beforeChange = [...value];
    }

    if (beforeChange[0] !== newValue[0] && beforeChange[1] !== newValue[1]) {
      return;
    }

    setValue(newValue);
  };

  const handleChangeCommitted = () => {
    beforeChange = null;
  };

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const setPriceRange = () => {
    queryParams.set("filter", `${value[0]}-${value[1]}`);
    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });
  };

  return (
    <Box sx={{ display: "flex", width: "30%", alignItems: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{ width: "200px", marginLeft: "-10px", fontSize: "14px" }}
        >
          Select price range:
        </Typography>
        <Slider
          getAriaLabel={() => "Price range"}
          value={value}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={minRange}
          max={maxRange}
          color="secondary"
          sx={{
            width: "200px",
            "& .css-nnid7-MuiSlider-valueLabel": {
              background: "#BFACE2",
              borderRadius: "5px",
              top: "60px",
              padding: "0",
              width: "30px",
            },
            "& .css-nnid7-MuiSlider-valueLabel::before": {
              bottom: "100%",
              zIndex: -1,
            },
          }}
        />
      </Box>

      <Button
        sx={{
          color: "#9c27b0",
          margin: "0  20px",
          padding: "2px 5px",
          textTransform: "capitalize",
          ":hover": {
            bgcolor: "rgba(62, 84, 172, 0.5)",
            color: "white",
          },
        }}
        onClick={setPriceRange}
      >
        Filter
      </Button>
    </Box>
  );
}
