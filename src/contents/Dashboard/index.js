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

import Loaded from "contents/Components/Loaded"
import CardBalance from "contents/Components/CardBalance";
import TableAssets from "contents/Components/TableAssets";

import Tokens from "config/token"
import network from "config/network"
import secureStorage from "libs/secureStorage";
import Provider from "libs/provider";

import _ from "lodash"
import axios from "axios"
import {ethers} from "ethers"

class Dashboard extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading:false,
      wallet:null,
      chainId:1666600000,
      address: "",
      balance : 0,
      tokens: [],
      assets: [],

      // pagination
      rowsPerPage : 15,
			currentPage : 1,
			totalPages : 0,
			totalData : 0,
    }
  }

  componentDidMount () {
    this.getWallet()
    // this.getBalance()
  }
  
  getWallet = async () => {
    try {
      const privateKey = secureStorage.getItem('privateKey')
      const provider = new Provider(privateKey, network[0])
      const wallet = provider.wallet
      const balance = await provider.getBalance()

      console.log({wallet,address:wallet.address, balance})
  
      this.setState({
        wallet, 
        address:wallet.address,
        isLoading:false
      })
    } catch (err) {
      console.log(err)
      this.setState({isLoading:false})
    }
  }

  // getBalance = () => {
  //   const tokens = Tokens.items
  //   let balance = tokens.reduce((prev, curr)=> {
  //     return prev+curr.quote
  //   }, 0)

  //   this.setState({tokens,balance})
  // }

  render () {
    return (
      <MKBox
        sx={{ 
          p: 2,
          position: "relative"
        }}>
        <Loaded open={this.state.isLoading}/>
        <MKBox py={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5} lg={5}>
              <CardBalance
                wallet={{address:this.state.address, balance:this.state.balance}}/>
            </Grid>
            <Grid item xs={12} md={7} lg={7}>
              <MKBox p={3} coloredShadow="secondary" borderRadius="5px" mb={3} bgColor="white" shadow="xl">
                <Grid container justifyContent="center">
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid container justifyContent="space-between">
                      <Grid item xl={2} lg={2} md={2} sm={12} xs={12} mb={{xs:1, md:0}}>
                        <MKBox color="rgba(0,0,0,.6)" bgColor="#e8e8e8" borderRadius="5px"
                          shadow="lg"
                          textAlign="center"
                          justifyContent="center"
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

                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} mt={2}>
                    <TableAssets
                      tableData={this.state.tokens}/>
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