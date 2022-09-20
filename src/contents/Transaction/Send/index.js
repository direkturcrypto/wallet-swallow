import React, {useState, useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
import { styled, alpha } from '@mui/material/styles';
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKInput from "components/MKInput"
import MKAlert from "components/MKAlert"
import MKAvatar from "components/MKAvatar"
import MKTypography from "components/MKTypography"

import secureStorage from "libs/secureStorage"
import {getItem, setItem} from "libs/session"
import {fnumber} from "libs/helper"
import Provider from "libs/provider";

import config from "config/core"
import _, { parseInt } from "lodash"
import axios from "axios"
import {ethers} from "ethers"

import Loaded from "contents/Components/Loaded"

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

function TransactionSend() {
  const navigate = useNavigate()
  const params = useParams()
  
  const [buttonDisalbed, setButtonDisabled] = useState(false)
  const [wallet, setWallet] = useState(null)
  const [selectedNetwork, setSelectedNetwork] = useState(null)
  const [assets, setAssets] = useState([])
  const [networks, setNetworks] = useState([])

  const [selectedSender, setSelectedSender] = useState(null)
  const [receiver, setReceiver] = useState("")
  const [errMessage, setErrMessage] = useState('')
  const [isAlert, setIsAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(()=>{
    const privateKey = secureStorage.getItem('privateKey')
    if (!privateKey) {
      navigate('/account/create')
      secureStorage.clear()
    }

    initAsset()
  }, [])

  const initAsset = async () => {
    const privateKey = secureStorage.getItem('privateKey')
    const _selectedNetwork = secureStorage.getItem('selectedNetwork')
    const provider = new Provider(privateKey, _selectedNetwork)
    const _wallet = provider.wallet
    let _assets = getItem('assets')
    if (!_assets) {
      const url = `${config.endPoint}${_selectedNetwork?.chainId}/address/${_wallet.address}/balances_v2/?key=${config.apiKey}`
      const res = await axios.get(url)
      const result = res.data
      _assets = result.data.items
      setItem('assets', _assets)
    }

    console.log(_assets)
    setAssets(_assets)
    setSelectedSender(_assets[0])
    setWallet(_wallet)
    setSelectedNetwork(_selectedNetwork)
  }

  const getBalance = ()=>{
    const balance = parseInt(selectedSender?.balance)/ (10 ** selectedSender?.contract_decimals)
    return balance
  }

  const submitSend = () => {
    setIsLoading(true)
    try {

    } catch (err) {
      setIsLoading(false)
      setIsAlert(true)
      setErrMessage(err.message)
    }
  }

  return (
    <Container>
      <Loaded open={isLoading}/>
      <Grid container spacing={2} justifyContent="center" mt={2}>
        <Grid item xs={8} md={6} sm={12} lg={6}>
          <Card>
            <MKBox p={2} ml={1} display="flex" justifyContent="flex-start">
              <MKTypography variant="h4" fontWeight="medium" mt={1}>
                Send
              </MKTypography>

            </MKBox>
            <MKBox  pb={3} px={3}>
              {isAlert&&
                <MKAlert color="warning">
                  {errMessage}
                </MKAlert>
              }
              <MKBox component="form" role="form">
                <MKBox mb={2}>
                  <MKInput id='account' disabled fullWidth
                    sx={{
                      '& .MuiInputBase-input':{
                        paddingTop:'20px',
                        paddingBottom:'20px'
                      }
                    }}
                    label="Account Address"
                    value={wallet?wallet.address:''}/>
                </MKBox>
                <MKBox mb={2}>
                  <FormControl fullWidth>
                    <InputLabel>Token</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      sx={{padding:'13px !important'}} 
                      value={selectedSender?selectedSender:''}
                      label="token">
                      {assets.map((key,i)=> (
                        <MenuItem
                          sx={{
                            padding:'10px',
                            borderRadius:'none',
                          }}
                          key={i} value={key}>
                          <MKBox display="flex" flexDirection="row" alignItems="center">
                            <MKAvatar src={key.logo_url} alt={name} size="sm" variant="rounded" />
                            {parseInt(key.balance)/(10**key.contract_decimals)} {key.contract_ticker_symbol}
                          </MKBox>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </MKBox>
                <MKBox mb={2} px={0.5}>
                  <MKBox width="100%" display="flex" flexDirection="row" justifyContent="space-between">
                    <MKTypography variant="body2" fontWeight="bold">
                      Available Amount:
                    </MKTypography>
                    <MKTypography variant="body2" fontWeight="bold"
                      verticalAlign="middle"  
                      sx={{width:'max-content'}}>
                      {parseInt(selectedSender?.balance)/(10**selectedSender?.contract_decimals)} {selectedSender?.contract_ticker_symbol}
                    </MKTypography>
                  </MKBox>
                </MKBox>
                <MKBox mb={2}>
                <MKInput value={receiver} label="Receiver" 
                  sx={{
                    '& .MuiInputBase-input':{
                      paddingTop:'20px',
                      paddingBottom:'20px'
                    }
                  }}
                  onChange={(e)=> {
                    setReceiver(e.target.value)
                    setButtonDisabled(false)
                  }}
                  fullWidth/>
                </MKBox>

                <MKBox mt={4} mb={1}>
                  <MKButton variant="gradient" color="info"
                    disabled={buttonDisalbed}
                    onClick={submitSend}
                    fullWidth>
                    SEND
                  </MKButton>
                </MKBox>
              </MKBox>

            </MKBox>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TransactionSend