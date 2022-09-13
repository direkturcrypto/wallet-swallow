// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Loaded({open, color, ...options}) {
    return (
      <>
        <Backdrop
          sx={{ color: color, zIndex: 9999}}
          open={open} {...options}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    )
}

// Setting default values for the props of Loaded
Loaded.defaultProps = {
  color: "#fff",
  open: false,
};

// Typechecking props of the Loaded
Loaded.propTypes = {
  color: PropTypes.string,
  open: PropTypes.bool.isRequired
};

export default Loaded
