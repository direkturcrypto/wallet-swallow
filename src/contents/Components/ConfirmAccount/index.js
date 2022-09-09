
import React from 'react'
// @mui material components
import Grid from "@mui/material/Grid"
import Slide from "@mui/material/Slide"
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import { Zoom } from '@mui/material';
import Icon from "@mui/material/Icon";

// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MKInput from 'components/MKInput';
import MKAlert from 'components/MKAlert';

import { CopyToClipboard } from "react-copy-to-clipboard";

export default class ConfirmAccount extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      show : false,
      privateKey : '',
      success : false
    }
  }

  toggleModal = () => this.setShow(!this.state.show, '');

  setShow = (show, privateKey)=>{
    this.setState({show,privateKey})
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
            
            <Slide direction="down" in={this.state.success} unmountOnExit>
              <MKBox position="absolute" top="0.5rem" left={0} width="100%">
                <MKAlert
                  width="80%"
                  mx="auto"
                  color="success"
                  sx={{ minHeight: "2.5rem !important", py: 1, justifyContent: "center" }}>
                  <MKTypography variant="body2" color="white" fontWeight="regular">
                    Code successfully copied!
                  </MKTypography>
                </MKAlert>
              </MKBox>
            </Slide>
            
            <MKBox display="flex" alginitems="center" justifyContent="space-between" p={2}>
              <MKTypography variant="h5">Harap simpan private key </MKTypography>
              <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={this.toggleModal} />
            </MKBox>
            <Divider sx={{ my: 3 }} />
            <MKBox pl={5} pr={5}>
              <Grid container spacing={2}>
                <Grid item xs={10} md={10}>
                  <MKInput 
                    fullWidth
                    readOnly
                    disabled
                    inputProps={{style:{textAlign:'right'}}}
                    label='Private Key'
                    value={this.state.privateKey}/>
                </Grid>
                <Grid item xs={2} md={2}>
                  <CopyToClipboard text={this.state.privateKey}>
                    <MKButton
                      fullWidth
                      variant="outlined"
                      color="dark"
                      onClick={()=> {
                        this.setState({success:true})
                        setTimeout(() => {
                          this.setState({success:false})
                        }, 1000);
                      }}
                      size="small">
                      <MKBox color="inherit" mr={0.5} className="fas fa-copy" /> Copy
                    </MKButton>
                  </CopyToClipboard>
                </Grid>
              </Grid>
            </MKBox>
            <Divider sx={{ my: 3 }} />
            <MKBox display="flex" justifyContent="space-between" p={1.5}>
              <MKButton variant="gradient" color="error" onClick={this.toggleModal}>
                CLOSE
              </MKButton>
              <MKButton variant="gradient"
                onClick={()=>{
                  this.toggleModal()
                  this.props.onSignIn&&this.props.onSignIn()
                }}
                color="info">
                NEXT
              </MKButton>
            </MKBox>
          </MKBox>
        </Zoom>
      </Modal>
    )
  }
}

