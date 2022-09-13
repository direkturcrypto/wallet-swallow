
import React from 'react'
// @mui material components
import Grid from "@mui/material/Grid"
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

import Notification from "contents/Components/Notification";

import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from 'qrcode.react';

import View from "contents/Components/ViewScroll"

export default class ConfirmAccount extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      show : false,
      privateKey : ''
    }
    this.notifRef = React.createRef()
  }

  toggleModal = () => this.setShow(!this.state.show, '');

  setShow = (show, privateKey)=>{
    this.setState({show,privateKey})
  }

  downloadQR = ()=>{
    const canvas = document.getElementById("myPrivatekey");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "private-key.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
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
            <View>
              <Notification ref={this.notifRef}/>
              
              <MKBox display="flex" alginitems="center" justifyContent="flex-end" p={2}>
                <MKTypography variant="h5">Attention !</MKTypography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={this.toggleModal} />
              </MKBox>
              <Divider sx={{ my: 1 }} />
              <MKBox p={1}>
                <Grid container item xs={12} md={12} mx="auto" justifyContent="center">
                  <MKBox width="100%" display="flex" flexDirection="column" 
                    alignItems="center" 
                    justifyContent="center">
                    <MKBox width="100%" display="flex" alignItems="center" justifyContent="center" mb={2}>
                      <QRCode
                        id="myPrivatekey"
                        value={this.state.privateKey}
                        size={300}
                        level={"L"}/>
                    </MKBox>
                    <MKInput 
                      fullWidth
                      readOnly
                      disabled
                      inputProps={{style:{textAlign:'right'}}}
                      label='Private Key'
                      value={this.state.privateKey}/>
                    <MKBox mt={1} width="100%" display="flex" flexDirection="row"
                      alignItems="center" 
                      justifyContent="center">
                      <MKBox mr={1}>
                        <MKButton variant="outlined" color="info">
                          <MKBox color="inherit" mr={0.5} className="fas fa-download" /> download
                        </MKButton>
                      </MKBox>
                      <MKBox mr={1}>
                        <CopyToClipboard 
                          text={this.state.privateKey}
                          onCopy={(text, result)=> this.notifRef.current.setShow(result,'Code successfully copied!')}>
                          <MKButton variant="outlined"
                            color="dark">
                            <MKBox color="inherit" mr={0.5} className="fas fa-copy" /> Copy
                          </MKButton>
                        </CopyToClipboard>
                      </MKBox>
                    </MKBox>
                  </MKBox>
                </Grid>

              </MKBox>
              <Divider sx={{ my: 1 }} />
              <MKBox display="flex" justifyContent="flex-end" p={1.5}>
                <MKButton variant="gradient"
                  onClick={()=>{
                    this.toggleModal()
                    this.props.onSignIn&&this.props.onSignIn()
                  }}
                  color="info">
                  NEXT
                </MKButton>
              </MKBox>
            </View>
            
          </MKBox>
        </Zoom>
      </Modal>
    )
  }
}
