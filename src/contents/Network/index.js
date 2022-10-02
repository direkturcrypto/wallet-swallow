import React from "react"

import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';

import IconCheck from "@mui/icons-material/Check"

import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKTypography from "components/MKTypography"
import MKInput from "components/MKInput"

import Loaded from "contents/Components/Loaded"
import Notification from "contents/Components/Notification";

import secureStorage from "libs/secureStorage"

import crypto from "crypto"

class Network extends React.Component {

  constructor() {
    super()

    this.state={
      networks:[],
      selectedNetwork:null,

      isLoading:false,
      isAlert:false,
      disabledButton : true,
      errMessage : 'Please complete the form data',

      name:'',
      rpcUrl:'',
      chainId:'',
      symbol:'',
      explorerUrl:'',
      action:'add',
      key: null,

      rpcUrlErr:'',
      error:[],
      succes:[],
    }

    this.notifRef = React.createRef()
  }

  componentDidMount() {
    this.iniData()
  }

  iniData = () => {
    const networks = secureStorage.getItem('networks')
    const selectedNetwork = secureStorage.getItem('selectedNetwork')

    this.setState({
      isLoading:false,
      networks,
      selectedNetwork
    })
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

  resetForm = () =>{
    this.setState({
      name:'',
      chainId:'',
      symbol:'',
      rpcUrl:'',
      explorerUrl:'',
      key:null,
      action:'add',
      disabledButton:true
    })
  }

  deleteNetwork = () => {
    const inputConfirm = confirm('Are you sure you want to delete this network?')
    if (inputConfirm) {
      const networks = secureStorage.getItem('networks')
      console.log(networks)
      networks.splice(this.state.key, 1)
      secureStorage.setItem('networks', networks)
      this.resetForm()
      this.iniData()
    }
  }

  handleSubmit = () => {
    this.setState({
      isAlert : false,
      isLoading:true
    })
    const {name, rpcUrl, chainId, symbol, explorerUrl, action} = this.state
    if (name==""||rpcUrl==""||chainId==""||symbol=="") {
      this.setState({
        isLoading:false,
        isAlert:true,
        errMessage : 'Please complete the form data '
      })
    }
    else {
      let _networks = secureStorage.getItem('networks')
      if (action==='edit') {
        let network = _networks[this.state.key]
        network = {
          ...network,
          name,
          chainId,
          symbol,
          rpcUrl,
          explorerUrl
        }
        _networks[this.state.key] = network
        secureStorage.setItem('networks', _networks)
        this.state.selectedNetwork.chainId===chainId? secureStorage.setItem('selectedNetwork', network):null
        
        this.setState({
          disabledButton:true,
          isAlert:false,
        })
        this.resetForm()
        this.iniData()
      }
      else {
        const payload = {
          name,
          rpcUrl,
          chainId,
          symbol,
          explorerUrl,
        }
        secureStorage.setItem('networks',[..._networks, payload])
        this.setState({
          disabledButton:true,
          isAlert:false,
        })
        this.resetForm()
        this.iniData()
      }
    }
  }

  selectItem = (item, key) => {
    this.setState({
      name:item.name,
      chainId:item.chainId,
      symbol:item.symbol,
      rpcUrl:item.rpcUrl,
      explorerUrl:item.explorerUrl,
      key:key,
      action:'edit',
      disabledButton:false
    })
  }

  renderList () {
    return (
      <Card sx={{borderRadius:'0px'}}>
        <List>
          {
            this.state.networks.map((item,i)=> (
              <ListItem key={i}
                selected={item.chainId===this.state.selectedNetwork.chainId}
                disablePadding
                onClick={()=> this.selectItem(item,i)}
                sx={{
                  '&.Mui-selected' :{
                    backgroundColor:'#eee !important'
                  }
                }}
                divider
              >
                <ListItemButton>
                  <ListItemIcon>
                    {item.chainId===this.state.selectedNetwork.chainId&&
                      <IconCheck fontSize="medium" color="success"/>
                    }
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.symbol}
                    secondary={item.name}/>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Card>
    )
  }

  render() {
    return (
      <MKBox
        sx={{ 
          p: 2,
          position: "relative"
        }}
      >
        <Loaded open={this.state.isLoading}/>
        <Notification ref={this.notifRef}/>
        <MKBox pt={2} mx={5}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={4}>
              {this.renderList()}
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <Card>
                <MKBox p={3} justifyContent="center">
                  <p style={{textAlign:'center'}}>{this.state.action==='add'?'Add':'Update'} network</p>
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
                        value={this.state.name}
                        error={this.state.error?this.state.error.name:false}
                        success={this.state.succes?this.state.succes.name:false}
                        onChange={this.handleChange}/>
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput label="Url RPC" fullWidth id='rpcUrl'
                        value={this.state.rpcUrl}
                        error={this.state.error?this.state.error.rpcUrl:false}
                        success={this.state.succes?this.state.succes.rpcUrl:false} 
                        onChange={this.handleChange}/>
                      <div style={{color:'red', fontSize:'12px'}}>{this.state.rpcUrlErr}</div>
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput label="Chain ID" fullWidth id='chainId'
                        value={this.state.chainId}
                        error={this.state.error?this.state.error.chainId:false}
                        success={this.state.succes?this.state.succes.chainId:false}
                        onChange={this.handleChange}/>
                      <div style={{color:'red', fontSize:'12px'}}>{this.state.chainIdErr}</div>
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput label="Symbol" fullWidth id='symbol'
                        value={this.state.symbol}
                        error={this.state.error?this.state.error.symbol:false}
                        success={this.state.succes?this.state.succes.symbol:false}
                        onChange={this.handleChange}/>
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput label="Explorer Url (Optional)" 
                        fullWidth 
                        id='explorerUrl'
                        value={this.state.explorerUrl}
                        onChange={this.handleChange}/>
                    </MKBox>
                    
                    <MKBox wdith="100%" display="flex" 
                      flexDirection ={{xs:'column', md:'row'}}
                      justifyContent={{xs:'flex-end'}}
                      mt={4} 
                      mb={1}
                    >
                      <MKBox mr={{xs:0,md:1}} mb={{xs:1,md:0}} justifyContent="flex-start">
                       <MKButton variant="gradient" color="secondary"
                          fullWidth
                          onClick={this.resetForm}
                        >
                          Clear
                        </MKButton>
                      </MKBox>
                      <MKBox mr={{xs:0,md:1}} mb={{xs:1,md:0}}>
                        <MKButton variant="gradient" 
                          color="error"
                          fullWidth
                          disabled={
                            this.state.selectedNetwork&&this.state.selectedNetwork.chainId===this.state.chainId||
                            this.state.key===null
                            ?true:false
                          }
                          onClick={this.deleteNetwork}
                        >
                          Delete
                        </MKButton>
                      </MKBox>
                      <MKBox>
                        <MKButton variant="gradient" color="info"
                          disabled={this.state.disabledButton} 
                          onClick={this.handleSubmit}
                          fullWidth>
                          Submit
                        </MKButton>
                      </MKBox>
                    </MKBox>
                  </MKBox>

                </MKBox>
              </Card>
            </Grid>
          </Grid>
        </MKBox>
      </MKBox>
    )
  }
}

export default Network