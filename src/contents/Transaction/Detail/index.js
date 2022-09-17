import React, {useState, useEffect, useRef} from "react"
import {useNavigate, useParams, useLocation} from "react-router-dom"

import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider"
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKBadge from "components/MKBadge"
import MKTypography from "components/MKTypography"

import Notification from "contents/Components/Notification";

import {fnumber, formatDateTime} from "libs/helper"
import secureStorage from "libs/secureStorage"

import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from 'qrcode.react';
import {ethers} from "ethers"

const useStyles = makeStyles({})

function TransactionDetail () {
  // const classes = useStyles()
  const notifRef= useRef()
  const navigate = useNavigate()
  const params = useParams()
  // const location = useLocation()

  const [hash, setHash] = useState("")
  const [row, setRow] = useState(null)
  const [networks, setNetworks] = useState(null)
  const [selectedNetwork, setSelectedNetwork] = useState(null)

  useEffect(()=>{
    const _networks = secureStorage.getItem('networks')
    const _selectedNetwork = secureStorage.getItem('selectedNetwork')
    const _row = secureStorage.getItem('detail')
    setNetworks(_networks)
    setSelectedNetwork(_selectedNetwork)
    setHash(params?.hash)
    if (_row)
      setRow(_row)
  },[])

  return (
    <Container>
      <Notification ref={notifRef}/>
      <Grid container mt={2}>
        <Grid item xs={12} md={12}>
          <MKBox width="100%" display="flex" justifyContent="center">
            <MKTypography variant="h4" color="text">
              Transaction Details
            </MKTypography>
          </MKBox>
        </Grid>
      </Grid>
      {
        row&&
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={9} sm={12} lg={9}>
            <MKBox wdith="100%" component="section" pt={4} mb={3}>
              <Card sx={{padding:'25px'}}>
                <Grid container justifyContent="center">
                  <Grid item xs={12} md={12}>
                    <MKBox wdith="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                      <MKBox sx={{
                        position : 'absolute',
                        zIndex:999,
                        top : "-35px"
                      }}>
                        {row&&row.successful?
                          <CheckCircleIcon sx={{fontSize:'4rem !important'}} color="success"/>:
                          <CancelIcon sx={{fontSize:'4rem !important'}} color="error"/>
                        }
                      </MKBox>
                      <MKBox mt={3}>
                        <MKTypography variant="h6">Transaction Success</MKTypography>
                      </MKBox>
                      <MKTypography variant="h5" verticalAlign="middle" sx={{width:'max-content'}}>
                        {parseInt(row.value)/1e18} {selectedNetwork?.symbol}
                      </MKTypography>
                    </MKBox>    
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1 }} />
                <Grid container justifyContent="flex-start" mt={3}>
                  <Grid item xs={12} md={12}>
                    <MKBox px={2} width="100%" display="flex" flexDirection="row" justifyContent="flex-start" alignItems="flex-end">
                      <MKBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
                        <MKTypography variant="button">Payer</MKTypography>
                        <MKTypography variant="button" fontWeight="bold">
                          {row?.from_address}
                        </MKTypography>
                      </MKBox>
                      <MKBox ml={2} sx={{cursor:'pointer'}}>
                        <CopyToClipboard
                          onCopy={(text, result)=> notifRef.current.setShow(result,'Code successfully copied!')} 
                          text={row?.from_address}>
                          <Icon fontSize="medium">copy</Icon>
                        </CopyToClipboard>
                      </MKBox>
                    </MKBox>
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-start" mt={3}>
                  <Grid item xs={12} md={12}>
                    <MKBox px={2} width="100%" display="flex" flexDirection="row" justifyContent="flex-start" alignItems="flex-end">
                      <MKBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
                        <MKTypography variant="button">Payee</MKTypography>
                        <MKTypography variant="button" fontWeight="bold">
                          {row?.to_address}
                        </MKTypography>
                      </MKBox>
                      <MKBox ml={2} sx={{cursor:'pointer'}}>
                        <CopyToClipboard
                          onCopy={(text, result)=> notifRef.current.setShow(result,'Code successfully copied!')}  
                          text={row?.to_address}>
                          <Icon fontSize="medium">copy</Icon>
                        </CopyToClipboard>
                      </MKBox>
                    </MKBox>
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-start" mt={3}>
                  <Grid item xs={12} md={12}>
                    <MKBox px={2} width="100%" display="flex" flexDirection="column" alignItems="flex-start"      
                      justifyContent="center">
                      <MKTypography variant="button">Gas Price</MKTypography>
                      <MKTypography variant="button" fontWeight="bold">
                      {parseInt(row?.gas_price)/1e18} {selectedNetwork?.symbol}
                      {/* {ethers.BigNumber.from(row?.gas_price)} {selectedNetwork?.symbol} */}
                      </MKTypography>
                    </MKBox>
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-start" my={3}>
                  <Grid item xs={12} md={12}>
                    <MKBox px={2} width="100%" display="flex" flexDirection="column" alignItems="flex-start"      
                      justifyContent="center">
                      <MKTypography variant="button">Gas Fee</MKTypography>
                      <MKTypography variant="button" fontWeight="bold">
                      {parseInt(row?.fees_paid)/1e18} {selectedNetwork?.symbol}
                      </MKTypography>
                    </MKBox>
                  </Grid>
                </Grid>
                <Grid container sx={{marginBottom:'10px'}}>
                  <Grid item xs={12} md={8}>
                    <Divider sx={{ my: 1 }} />
                    <Grid container justifyContent="flex-start" mt={3}>
                      <Grid item xs={12} md={12}>
                        <MKBox px={2} width="100%" display="flex" flexDirection="row" justifyContent="flex-start"             
                          alignItems="flex-end">
                          <MKBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
                            <MKTypography variant="button">Transaction Hash</MKTypography>
                            <MKTypography variant="button"
                              sx={{
                                overflow:'hidden',
                                textOverflow:'ellipsis',
                                whiteSpace: "nowrap",
                                width:'450px',
                                cursor:'pointer'
                              }} 
                              fontWeight="bold">
                              {`${row?.tx_hash.substring(0,45)}...${row?.tx_hash.substring(row?.tx_hash.length-5, row?.tx_hash.length)}`}
                            </MKTypography>
                          </MKBox>
                          <MKBox ml={2} sx={{cursor:'pointer'}}>
                            <CopyToClipboard
                              onCopy={(text, result)=> notifRef.current.setShow(result,'Code successfully copied!')}  
                              text={row?.tx_hash}>
                              <Icon fontSize="medium">copy</Icon>
                            </CopyToClipboard>
                          </MKBox>
                        </MKBox>
                      </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-start" mt={3}>
                      <Grid item xs={12} md={12}>
                        <MKBox px={2} width="100%" display="flex" flexDirection="row" justifyContent="flex-start" alignItems="flex-end">
                          <MKBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
                            <MKTypography variant="button">Block Number</MKTypography>
                            <MKTypography variant="button" fontWeight="bold">
                              {row?.block_height?.toLocaleString()}
                            </MKTypography>
                          </MKBox>
                          <MKBox ml={2} sx={{cursor:'pointer'}}>
                            <CopyToClipboard
                              onCopy={(text, result)=> notifRef.current.setShow(result,'Code successfully copied!')}  
                              text={row?.block_height}>
                              <Icon fontSize="medium">copy</Icon>
                            </CopyToClipboard>
                          </MKBox>
                        </MKBox>
                      </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-start" mt={3}>
                      <Grid item xs={12} md={12}>
                        <MKBox px={2} width="100%" display="flex" flexDirection="column" 
                          alignItems="flex-start" 
                          justifyContent="center">
                          <MKTypography variant="button">Time</MKTypography>
                          <MKTypography variant="button" fontWeight="bold">
                          {formatDateTime(row?.block_signed_at)}
                          </MKTypography>
                        </MKBox>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MKBox width="100%" height="100%" display="flex" flexDirection="column" 
                      alignItems="center" 
                      justifyContent="center">
                      <QRCode
                        size={150}
                        level={"L"}
                        id="urlExplore"
                        value={`${selectedNetwork?.explorerUrl}/${row?.tx_hash}`}/>
                      <MKBox mt={1} sx={{cursor:'pointer'}} display="flex" flexDirection="row">
                        <MKTypography color="text" variant="button" fontSize="medium">Query Url</MKTypography>
                        <CopyToClipboard
                          onCopy={(text, result)=> notifRef.current.setShow(result,'Code successfully copied!')}  
                          text={`${selectedNetwork?.explorerUrl}tx/${row?.tx_hash}`} style={{marginLeft:'5px'}}>
                          <Icon fontSize="medium">copy</Icon>
                        </CopyToClipboard>
                      </MKBox>
                    </MKBox>
                  </Grid>
                </Grid>

              </Card>
            </MKBox>
          </Grid>
        </Grid>

      }
    </Container>
  )
}

export default TransactionDetail