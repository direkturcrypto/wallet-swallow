import React from "react"

import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"

import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKTypography from "components/MKTypography"
import MKInput from "components/MKInput"

import Loaded from "contents/Components/Loaded"
import Notification from "contents/Components/Notification";

import secureStorage from "libs/secureStorage"

import crypto from "crypto"

class AddNetwork extends React.Component {
  
  constructor() {
    super()
    this.state = {
      isLoading:false,
      isAlert : false,
      disabledButton : true,
      errMessage : 'Please complete the form data',

      error:[],
      succes:[],

      name:'',
      rpcUrl:'',
      chainId:'',
      symbol:'',
      explorerUrl:'',

      rpcUrlErr:'',
    }

    this.notifRef = React.createRef()
  }

  handleChange = (e) => {
    const {id, value} = e.target
    if (value!=="") {
      this.setState({
        [id]:value,
        disabledButton:false
      })
      switch(id) {
        case "rpcUrl" :
          this.validateRpc(e)
        break
        case "chainId":
          this.validateHex(e)
        break
      }
    }
  }

  validateHex = (e) => {
    // Invalid hexadecimal number.
    const {id, value} = e.target
  }
  
  validateRpc = (e) => {
    let {id, value} = e.target
    value = value.toLowerCase()
    if (value.indexOf('http://')!==-1 || value.indexOf('https://')!==-1) {
      this.setState({
        error:{...this.state.error, [id]:false},
        succes: {...this.state.succes, [id]:true},
        rpcUrlErr:''
      })
    }
    else {
      this.setState({
        error:{...this.state.error, [id]:true},
        succes: {...this.state.succes, [id]:false},
        rpcUrlErr:'URL require an appropriate HTTP/HTTPS prefix.'
      })
    }
  }

  createNetwork = () => {
    this.setState({
      isAlert : false,
      isLoading:true
    })
    const {name, rpcUrl, chainId, symbol, explorerUrl} = this.state
    if (name==""||rpcUrl==""||chainId==""||symbol=="") {
      this.setState({
        isLoading:false,
        isAlert:true,
        errMessage : 'Please complete the form data '
      })
    }
    else {
      const payload = {
        name,
        rpcUrl,
        chainId,
        symbol,
        explorerUrl,
      }
      // const _network = secureStorage.getItem('networks')
      // secureStorage.setItem('network',[..._network, payload])
      // this.setState({
      //   isLoading:false,
      //   isAlert:false
      // })
    }
  }

  render () {
    return (
      <MKBox pt={2} mx={5}>
        <Notification ref={this.notifRef}/>
        <Loaded open={this.state.isLoading}/>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item md={7} xs={12} lg={7} sm={12}>
            <Card>
              <MKBox p={3} justifyContent="center">
                <p style={{textAlign:'center'}}>Add network</p>
                <hr/>
                <br/>
                {this.state.isAlert&&
                  <MKAlert color="warning">
                    {this.state.errMessage}
                  </MKAlert>
                }
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput 
                      label="Network Name" 
                      fullWidth id='name'
                      error={this.state.error?this.state.error.name:false}
                      success={this.state.succes?this.state.succes.name:false}
                      onChange={this.handleChange}/>
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput label="Url RPC" fullWidth id='rpcUrl'
                      error={this.state.error?this.state.error.rpcUrl:false}
                      success={this.state.succes?this.state.succes.rpcUrl:false} 
                      onChange={this.handleChange}/>
                    <div style={{color:'red', fontSize:'12px'}}>{this.state.rpcUrlErr}</div>
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput label="Chain ID" fullWidth id='chainId'
                      error={this.state.error?this.state.error.chainId:false}
                      success={this.state.succes?this.state.succes.chainId:false}
                      onChange={this.handleChange}/>
                    <div style={{color:'red', fontSize:'12px'}}>{this.state.chainIdErr}</div>
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput label="Symbol" fullWidth id='symbol'
                      error={this.state.error?this.state.error.symbol:false}
                      success={this.state.succes?this.state.succes.symbol:false}
                      onChange={this.handleChange}/>
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput label="Explorer Url (Optional)" fullWidth id='explorerUrl' onChange={this.handleChange}/>
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info"
                      disabled={this.state.disabledButton} 
                      onClick={this.createNetwork}
                      fullWidth>
                      Create Network
                    </MKButton>
                  </MKBox>
                </MKBox>

              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    )
  }
}

export default AddNetwork