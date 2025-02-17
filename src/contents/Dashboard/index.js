import React, {useState, useEffect} from "react"
import {useOutletContext} from "react-router-dom"

import Container from "@mui/material/Container"
import  Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

import MKBox from "components/MKBox"
import MKButton from "components/MKButton"

import Loaded from "contents/Components/Loaded"
import CardBalance from "contents/Components/CardBalance";
import TableAssets from "contents/Components/TableAssets";

// import Tokens from "config/token"
import secureStorage from "libs/secureStorage";
import {getItem, setItem} from "libs/session"
import Provider from "libs/provider";

import config from "config/core"
import _ from "lodash"
import axios from "axios"

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [wallet, setWallet] = useState(null)
  const [assets, setAssets] = useState([])
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState(0)
  const [selectedNetwork, setSelectedNetwork] = useOutletContext()

  useEffect(()=> {
    const privateKey = secureStorage.getItem('privateKey')
    privateKey&&initProvider(privateKey)
  }, [])

  useEffect(()=>{
    // console.log('[UPDATE SWITCH NETWORK]')
    const privateKey = secureStorage.getItem('privateKey')
    initProvider(privateKey, true)
  },[selectedNetwork])

  const initProvider = (privateKey, reload) => {
    const _selectedNetwork = secureStorage.getItem('selectedNetwork')
    try {
      const provider = new Provider(privateKey, _selectedNetwork)
      const _wallet = provider.wallet

      setWallet(_wallet)
      setAddress(_wallet.address)
      initToken(_wallet.address, reload)
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }
  }

  const initToken = async  (addr, reload)=>{
    setIsLoading(true)
    try {
      let _assets = getItem('assets')
      if (!_assets || reload) {
        const url = `${config.endPoint}${selectedNetwork?.chainId}/address/${addr}/balances_v2/?key=${config.apiKey}`
        const res = await axios.get(url)
        const result = res.data
        _assets = result.data.items
        setItem('assets', _assets)
      }

      const _balance = assets.reduce((prev, curr)=>{
        return prev+curr.quote
      }, 0)

      setAssets(_assets)
      setBalance(_balance)
      setIsLoading(false)
    } catch (e){
      if (e.response) {
        const errMessage = e.response.data.error_message
        alert(errMessage)
      }

      setIsLoading(false)
    }
  }

  return (
    <MKBox
      sx={{ 
        p: 2,
        position: "relative"
      }}>
      <Loaded open={isLoading}/>
      <MKBox pt={2} mx={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5} lg={5}>
            <CardBalance
              wallet={{address, balance:balance}}/>
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
                    tableData={assets}/>
                </Grid>
              </Grid>
            </MKBox>
          </Grid>
        </Grid>
      </MKBox>
    </MKBox>
  )
}
// class Dashboard extends React.Component {
  
//   constructor(props) {
//     super(props)

//     this.state = {
//       isLoading:true,
//       wallet:null,
//       selectedNetwork:secureStorage.getItem('selectedNetwork'),
//       address: "",
//       balance : 0,
//       assets: [],
//     }
//   }

//   componentDidMount () {
//     const privateKey = secureStorage.getItem('privateKey')
//     privateKey&& this.initProvider(privateKey)
//   }

//   initProvider = async () => {
//     const selectedNetwork = secureStorage.getItem('selectedNetwork')
//     try {
//       const provider = new Provider(privateKey, selectedNetwork)
//       const wallet = provider.wallet
      
//       this.setState({
//         wallet,
//         address:wallet.address,
//       })
//       this.initToken(wallet.address)
//     } catch (err) {
//       console.log(err)
//       this.setState({isLoading:false})
//     }
//   }

//   initToken = async (address) => {
//     this.setState({isLoading:true})
//     try {
//       let assets = getItem('assets')
//       if (!assets) {
//         const url = `${config.endPoint}${this.state.selectedNetwork?.chainId}/address/${address}/balances_v2/?key=${config.apiKey}`
//         const res = await axios.get(url)
//         const result = res.data
//         assets = result.data.items
//         setItem('assets', assets)
//       }

//       const balance = assets.reduce((prev, curr)=>{
//         return prev+curr.quote
//       }, 0)
      
//       this.setState({assets, balance, isLoading: false})

//     } catch (err) {
//       console.log('ERR : ', err)
//       this.setState({isLoading:false})
//     }
//   }

//   render () {
//     return (
//       <MKBox
//         sx={{ 
//           p: 2,
//           position: "relative"
//         }}>
//         <Loaded open={this.state.isLoading}/>
//         <MKBox pt={2} mx={5}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={5} lg={5}>
//               <CardBalance
//                 wallet={{address:this.state.address, balance:this.state.balance}}/>
//             </Grid>
//             <Grid item xs={12} md={7} lg={7}>
//               <MKBox p={3} coloredShadow="secondary" borderRadius="5px" mb={3} bgColor="white" shadow="xl">
//                 <Grid container justifyContent="center">
//                   <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
//                     <Grid container justifyContent="space-between">
//                       <Grid item xl={2} lg={2} md={2} sm={12} xs={12} mb={{xs:1, md:0}}>
//                         <MKBox color="rgba(0,0,0,.6)" bgColor="#e8e8e8" borderRadius="5px"
//                           shadow="lg"
//                           textAlign="center"
//                           justifyContent="center"
//                           p={1}>
//                           Assets
//                         </MKBox>
//                       </Grid>
//                       <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
//                         <MKBox width="100%" display="flex" justifyContent="flex-end" alignItems="center">
//                           <MKButton variant="outlined" color="info" size="large">
//                             <Icon color="inherit">add</Icon>
//                             &nbsp;
//                             ADD TOKEN
//                           </MKButton>
//                         </MKBox>
//                       </Grid>
//                     </Grid>
//                   </Grid>

//                   <Grid item xl={12} lg={12} md={12} sm={12} xs={12} mt={2}>
//                     <TableAssets
//                       tableData={this.state.assets}/>
//                   </Grid>
//                 </Grid>
//               </MKBox>
//             </Grid>
//           </Grid>
//         </MKBox>
//       </MKBox>
//     )
//   }
// }

export default Dashboard