import React from 'react'
// @mui material components
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import { Zoom } from '@mui/material';

// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

class Confirmation extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      show:false
    }
  }

  toggleModal = () => this.setShow(!this.state.show);

  setShow = (show)=>{
    this.setState({show})
  }

  render () {
    return (
      <Modal open={this.state.show} onClose={this.toggleModal} sx={{ display: "grid", placeItems: "center" }}>
        <Zoom in={this.state.show}>
          <MKBox
            position="relative"
            width="500px"
            display="flex"
            flexDirection="column"
            borderRadius="xl"
            bgColor="white"
            shadow="xl"
            style={{outline:'none'}}>
            <MKBox display="flex" justifyContent="space-between" alignItems="center" p={2}>
              <MKTypography variant="h5">
                {this.props.title}
              </MKTypography>
              <CloseIcon fontSize="medium" sx={{cursor:"pointer"}} onClick={this.toggleModal}/>
            </MKBox>
            <Divider sx={{ my: 0 }} />
            <MKBox p={5}>
              <MKTypography variant="body1" color="text">{this.props.message}</MKTypography>
            </MKBox>
            <Divider sx={{my:0}}/>
            <MKBox display="flex" justifyContent="space-between" p={1.5}>
              <MKButton variant="gradient" color="error" onClick={this.toggleModal}>
                CLOSE
              </MKButton>
              <MKButton variant="gradient" color="info" onClick={()=>{
                this.toggleModal()
                this.props.onConfirm&& this.props.onConfirm()
              }}>
                SUBMIT
              </MKButton>
            </MKBox>
          </MKBox>
        </Zoom>
      </Modal>
    )
  }
}

export default Confirmation