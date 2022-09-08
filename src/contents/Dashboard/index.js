import React from "react"

import Container from "@mui/material/Container"
import  Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack";

import MKBox from "components/MKBox"
import MKButton from "components/MKButton"

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

class Dashboard extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      connector:null,
      connected: false,
      chainId:1,
      showModal:false,
      pendingRequest:false,
      uri: "",
      accounts: [],
      address: "",
      result: null,
      assets: []
    }
  }

  connect = async () => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    })

    this.setState({connector})
    console.log(connector.connected)
    if (!connector.connected) {
      connector.createSession()
    }

    // subscribe to events
    this.subscribeToEvents()
  }

  subscribeToEvents = async ()=>{
    const {connector} = this.state
    console.log(connector)

    if (!connector) return 
    connector.on('connect', (err, payload)=>{
      if (err) console.log('ERR', err)
      console.log(`connector.on("connect")`);

      console.log({payload})
    })
  }
  
  render () {
    return (
      <MKBox 
        position="relative" 
        width="100%"
        height="500px">
        <Container>
          <MKBox display="flex" justifyContent="center" alginitems="center" height="100%">
            <MKButton variant="outlined" color="info" size="large" onClick={this.connect}>
              CONNECT
            </MKButton>
          </MKBox>
        </Container>
      </MKBox>
    )
  }
}

export default Dashboard