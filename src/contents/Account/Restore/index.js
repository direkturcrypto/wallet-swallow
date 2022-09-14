import { Restore } from "@mui/icons-material"
import React from "react"
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

import network from "config/network"
// import crypto from "crypto"
// import {ethers} from "ethers"

import Provider from "libs/provider";
import secureStorage from "libs/secureStorage"

class RestoreAccount extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      privateKey:'',
      errMessage : 'Please complete the form private key ',
      isAlert : false,
      isLoading : false,
      disabledButton : false,
      isLoggIn : false,
      redirect : ''
    }
  }

  componentDidMount() {
    const privateKey = secureStorage.getItem('privateKey')
    if (privateKey)
      this.setState({isLoggIn:true})
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value,
      disabledButton : false
    })
  }

  restoreAccount = async () => {
    this.setState({
      isAlert : false,
      isLoading : true
    })
    if (this.state.privateKey==="") {
      this.setState({
        errMessage: 'Please complete the form private key',
        isAlert : true,
        isLoading : false
      })
    }
    else {
      try {
        const provider = new Provider(this.state.privateKey, network[0])

        secureStorage.setItem('privateKey', this.state.privateKey)
        secureStorage.setItem('networks', network)
        secureStorage.setItem('selectedNetwork', network[0])
        this.setState({
          isAlert:false,
          isLoading:false,
          isLoggIn: true
        })
      } catch (err) {
        console.log(err)
        this.setState({
          isLoading: false,
          isAlert:true,
          errMessage : 'The private key you entered is wrong'
        })
      }
    }
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
              Restore Account
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
                <MKInput type="password" label="Private Key" fullWidth id='privateKey' onChange={this.handleChange}/>
              </MKBox>
              <MKBox mt={4} mb={1}>
                <MKButton variant="gradient" color="info"
                  disabled={this.state.disabledButton} 
                  onClick={this.restoreAccount}
                  fullWidth>
                  Submit
                </MKButton>
              </MKBox>
              <MKBox mt={1} mb={1}>
                <MKTypography
                  sx={{cursor:'pointer'}}
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  onClick={()=> this.setState({redirect:'/account/create'})}
                  textGradient>
                    Create Account
                </MKTypography>
              </MKBox>
            </MKBox>
          </MKBox>
        </Card>
      </Background>
    )
  }
}

export default RestoreAccount