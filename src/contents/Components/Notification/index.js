import React from "react"

import Snackbar from "@mui/material/Snackbar";
// @mui icons
import CloseIcon from "@mui/icons-material/Close"

import MKBox from "components/MKBox"

const toastStyles = ({
  palette: { info },
  borders: { borderRadius },
  typography: { size },
  boxShadows: { lg },
}) => ({
  "& .MuiPaper-root": {
    backgroundColor: info.main,
    borderRadius: borderRadius.lg,
    fontSize: size.sm,
    fontWeight: 400,
    boxShadow: lg,
    px: 2,
    py: 0.5,
    // zIndex:9999
  },
});

class Notification extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      show:false,
      message : ''
    }
  }

  toggleShow = () => this.setState({show:!this.state.show})

  setShow = (show, message)=>  {
    this.setState({show, message})
  }

  toastTemplate=()=>{
    return (
      <MKBox display="flex" justifyContent="space-between" alignItems="center" color="white">
        {this.state.message}
        <CloseIcon
          fontSize="medium"
          sx={{ ml: 4, mr: -1, cursor: "pointer" }}
          onClick={()=> this.toggleShow()}
        />
      </MKBox>
    )
  }

  render () {
    return (
      <>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.state.show}
          autoHideDuration={500}
          onClose={()=> this.toggleShow()}
          message={this.toastTemplate()}
          sx={toastStyles}/>
      </>
    )
  }
}

export default Notification