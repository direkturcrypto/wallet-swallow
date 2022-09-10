import React from "react"

import Container from "@mui/material/Container"
import  Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card"
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

import MKBox from "components/MKBox"
import MKButton from "components/MKButton"

import CardBalance from "contents/Components/CardBalance";
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
      chainId:1666600000,
      address: "",
      balance : 0,
      tokens: [],
      assets: []
    }
  }

  componentDidMount () {
    this.getWallet()
    this.getBalance()
  }
  
  getWallet = async () => {
    try {
      const privateKey = secureStorage.getItem('privateKey')
      const provider = new ethers.providers.JsonRpcProvider(network[0].rpcUrl)
      const wallet = new ethers.Wallet(privateKey, provider)
      let balance = await provider.getBalance(wallet.address)
      balance = ethers.utils.formatEther(balance)
      console.log({wallet,address:wallet.address, balance})
  
      this.setState({wallet, address:wallet.address})
    } catch (err) {
      console.log(err)
    }
  }

  getBalance = () => {
    const tokens = Tokens.items
    let balance = tokens.reduce((prev, curr)=> {
      return prev+curr.quote
    }, 0)

    this.setState({tokens,balance})
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
              <CardBalance
                wallet={{address:this.state.address, balance:this.state.balance}}/>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <MKBox p={3} coloredShadow="secondary" borderRadius="5px" mb={3} bgColor="white" shadow="xl">
                <Grid container justifyContent="center">
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid container justifyContent="space-between">
                      <Grid item xl={2} lg={2} md={2} sm={12} xs={12} mb={{xs:1, md:0}}>
                        <MKBox color="rgba(0,0,0,.6)"
                          bgColor="#e8e8e8"
                          borderRadius="5px"
                          shadow="lg"
                          textAlign="center"
                          justifyContent="center"
                          opacity={1}
                          p={1}>
                          Assets
                        </MKBox>
                      </Grid>
                      <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
                        <MKBox width="100%" display="flex" justifyContent="flex-end" alignItems="center">
                          <MKButton variant="outlined" color="info" size="large">
                            <Icon color="inherit">add</Icon>
                            &nbsp;
                            ADD TOKEN
                          </MKButton>
                        </MKBox>
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </MKBox>
            </Grid>
          </Grid>
        </MKBox>
      </MKBox>
    )
  }
}

export default Dashboard