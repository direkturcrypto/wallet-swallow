import React from "react"

import Container from "@mui/material/Container"
import  Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card"
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { FixedSizeList } from 'react-window';

import MKBox from "components/MKBox"
import MKButton from "components/MKButton"

import View from "contents/Components/ViewScroll"
import secureStorage from "libs/secureStorage";

import Tokens from "config/token"
import network from "config/network"

import _ from "lodash"
import crypto from "crypto"
import axios from "axios"
import {ethers} from "ethers"

class Dashboard extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      wallet:null,
      connector:null,
      connected: false,
      chainId:1,
      showModal:false,
      pendingRequest:false,
      uri: "",
      accounts: [],
      address: "",
      result: null,
      balance : 0,
      tokens: [],
      assets: []
    }
  }

  componentDidMount () {
    this.getTokens()
  }

  getTokens = () => {
    const tokens = Tokens.items
    let balance = tokens.reduce((prev, curr)=> {
      return prev+curr.quote
    }, 0)

    this.setState({tokens})
  }
  
  getWallet = async () => {
    const privateKey = secureStorage.getItem('privateKey')
    const provider = new ethers.providers.JsonRpcProvider(network[0].rpcUrl)
    const wallet = new ethers.Wallet(privateKey, provider)
    let balance = await provider.getBalance(wallet.address)
    balance = ethers.utils.formatEther(balance)
    console.log({wallet,address:wallet.address, balance})
    this.setState({wallet, balance})
  }

  renderList = ()=>{
    return this.state.tokens.map((item, index)=> (
      <ListItem key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={item.contract_name} />
        </ListItemButton>
      </ListItem>
    ))
  }

  render () {
    return (
      <MKBox
        sx={{ 
          p: 2,
          position: "relative"
        }}>
        <MKBox py={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
              <Card>
                <MKBox width="100%" display="flex" flexDirection="row" 
                  justifyContent="space-between" 
                  alignItems="center" 
                  p={2}>
                  <MKBox>
                    <p><b>{this.state.balance} </b>USD</p>
                  </MKBox>
                  <MKBox>
                    <p>setting</p>
                  </MKBox>
                </MKBox>
                <Divider/>
                <View height="450px" bgColor="none">
                  {this.renderList()}
                </View>
              </Card>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <Card>
                <MKBox p={2}>
                  <p>Your Assets</p>
                </MKBox>
              </Card>
            </Grid>
          </Grid>
        </MKBox>
      </MKBox>
    )
  }
}

export default Dashboard

function renderRow(props) {
  const { index, style } = props;

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  }

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton 
        onClick={handleListItemClick} 
        selected={selectedIndex===index}>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}