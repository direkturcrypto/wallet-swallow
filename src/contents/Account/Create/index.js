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


import Loaded from "contents/Components/Loaded"
import ModalConfirm from "contents/Components/ConfirmAccount"
import Background from "contents/Components/Background"

import secureStorage from "libs/secureStorage"
import Provider from "libs/provider";

import network from "config/network"
import crypto from "crypto"

// function CreateAccount() {
class CreateAccount extends React.Component {
  constructor() {
    super()
    this.state = {
      uniqueText : '',
      secretText : '',
      privateKey : '',
      errMessage : 'Please complete the form data',
      rememberMe : false,
      isAlert : false,
      isLoading : false,
      disabledButton : false,
      isLoggIn : false,
      redirect : ''
    }

    this.modalRef = createRef()
  }

  componentDidMount () {
    const privateKey = secureStorage.getItem('privateKey')
    if (privateKey)
      this.setState({isLoggIn:true})
  }

  handleSetRememberMe = () => this.setState({rememberMe: !this.state.rememberMe});

  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value,
      disabledButton : false,
      isAlert:false
    })
  }
  
  createAccount = async () => {
    this.setState({
      isAlert : false,
      isLoading : true
    })
    if (this.state.uniqueText==="" || this.state.secretText==="") {
      this.setState({
        isAlert : true,
        isLoading : false,
        errMessage : 'Please complete the form data '
      })
    } else {
      try {
        const privateKey = crypto.createHmac("sha256", this.state.uniqueText).update(this.state.secretText).digest("hex")
        const provider = new Provider(privateKey, network[0])
        const wallet = provider.wallet

        console.log(provider)
        this.setState({
          isLoading : false,
          isAlert : false,
          privateKey
        })
        this.modalRef.current.setShow(true, privateKey)
      } catch (err) {
        this.setState({
          isAlert:true,
          isLoading:false,
          errMessage:'The private key you entered is wrong'
        })
      }
    }
  }

  onSignIn = ()=>{
    secureStorage.setItem('privateKey', this.state.privateKey)
    secureStorage.setItem('networks', network)
    secureStorage.setItem('selectedNetwork', network[0])
    this.setState({isLoggIn:true})
  }

  render () {
    if (this.state.isLoggIn) {
      return <Navigate to="/" />
    }

    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
      
    return (
      <Background>
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
                {this.state.errMessage}
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
              <MKBox mt={1} >
                <MKTypography
                  variant="button"
                  color="text"
                  textGradient>
                  Please Remember 2 data to recover your account
                </MKTypography>
              </MKBox>
              <MKBox mt={1} mb={1} textAlign="center">
                <MKTypography
                  sx={{cursor:'pointer'}}
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  onClick={()=> this.setState({redirect:'/account/restore'})}
                  textGradient>
                    Restore Account
                </MKTypography>
              </MKBox>
            </MKBox>
          </MKBox>
        </Card>
      </Background>
    )
  }
}

export default CreateAccount