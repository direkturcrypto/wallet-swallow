import React, {createRef} from "react"
import { Navigate } from "react-router-dom"

import { 
  Container, 
  Grid, 
  Card, 
  Switch 
} from "@mui/material"

import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKInput from "components/MKInput"
import MKAlert from "components/MKAlert"
import MKTypography from "components/MKTypography"

import secureStorage from "libs/secureStorage"

import Loaded from "contents/Components/Loaded"
import ModalConfirm from "contents/Components/ConfirmAccount"

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import network from "config/network"
import crypto from "crypto"
import {ethers} from "ethers"

// function CreateAccount() {
class CreateAccount extends React.Component {
  constructor() {
    super()
    this.state = {
      uniqueText : '',
      secretText : '',
      privateKey : '',
      rememberMe : false,
      isAlert : false,
      isLoading : false,
      disabledButton : false,
      isLoggIn : false
    }

    this.modalRef = createRef()
  }

  componentDidMount () {
    const privateKey = secureStorage.getItem('privateKey')
    console.log({privateKey})
    if (privateKey)
      this.setState({isLoggIn:true})
  }

  handleSetRememberMe = () => this.setState({rememberMe: !this.state.rememberMe});

  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value,
      disabledButton : false
    })
  }
  
  createAccount = async () => {
    console.log(this.state)
    this.setState({
      isAlert : false,
      isLoading : true
    })
    if (this.state.uniqueText==="" || this.state.secretText==="") {
      this.setState({
        isAlert : true,
        isLoading : false
      })
    } else {
      const privateKey = crypto.createHmac("sha256", this.state.uniqueText).update(this.state.secretText).digest("hex")
      const provider = new ethers.providers.JsonRpcProvider(network[0].rpcUrl)
      
      // const wallet = new ethers.Wallet(privateKey, provider);
      // let balance = await provider.getBalance(wallet.address)
      // balance = ethers.utils.formatEther(balance)
      
      // secureStorage.setItem('privateKey', privateKey)
      this.setState({
        isLoading : false,
        isAlert : false,
        privateKey
      })
      this.modalRef.current.setShow(true, privateKey)
    }
  }

  onSignIn = ()=>{
    secureStorage.setItem('privateKey', privateKey)
    this.setState({isLoggIn:true})
    console.log('[NEXT SIGNIN]')
  }

  render () {
    if (this.state.isLoggIn) {
      return <Navigate to='/' />
    }
      
    return (
      <Layout image={bgImage}>
        <ModalConfirm ref={this.modalRef} onSignIn={this.onSignIn}/>
        <Loaded open={this.state.isLoading}/>
        <Card>
          <MKBox
            display="flex"
            variant="gradient"
            borderRadius="lg"
            mx={2}
            p={2}
            mb={1}
            textAlign="center"
            justifyContent="center">
            <MKTypography variant="h4" fontWeight="medium" mt={1}>
              Create Account
            </MKTypography>
          </MKBox>
          <MKBox pt={4} pb={3} px={3}>
            {this.state.isAlert&&
              <MKAlert color="warning">
                Please Remember 2 data to recover your account
              </MKAlert>
            }
            <MKBox component="form" role="form">
              <MKBox mb={2}>
                <MKInput label="Unique Text" fullWidth id='uniqueText' onChange={this.handleChange}/>
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="password" label="Secret Text" fullWidth id='secretText' onChange={this.handleChange}/>
              </MKBox>
              <MKBox display="flex" alignItems="center" ml={-1}>
                <Switch checked={this.state.rememberMe} onChange={this.handleSetRememberMe}/>
                <MKTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  onClick={this.handleSetRememberMe}
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}>
                  &nbsp;&nbsp; Remember me
                </MKTypography>
              </MKBox>
              <MKBox mt={4} mb={1}>
                <MKButton variant="gradient" color="info"
                  disabled={this.state.disabledButton} 
                  onClick={this.createAccount}
                  fullWidth>
                  Create Account
                </MKButton>
              </MKBox>
              <MKBox mt={3} mb={1} textAlign="center">
                <MKTypography
                  sx={{cursor:'pointer'}}
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient>
                    Restore Account
                </MKTypography>
              </MKBox>
            </MKBox>
          </MKBox>
        </Card>
      </Layout>
    )
  }
}

export default CreateAccount

function Layout ({image, children}) {
  return (
    <>
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh">
        <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
          <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
            <Grid item xs={11} sm={9} md={6} lg={6} xl={6}>
              {children}
            </Grid>
          </Grid>
        </MKBox>
      </MKBox>
    </>
  )
}