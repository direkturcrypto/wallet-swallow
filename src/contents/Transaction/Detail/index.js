import React, {useState, useEffect} from "react"
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
import MKTypography from "components/MKTypography"

import {fnumber} from "libs/helper"
import secureStorage from "libs/secureStorage"

import { CopyToClipboard } from "react-copy-to-clipboard";

const useStyles = makeStyles({})

function TransactionDetail () {
  const classes = useStyles()
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()

  const [hash, setHash] = useState("")
  const [row, setRow] = useState(null)

  useEffect(()=>{
    
    const row = secureStorage.getItem('detail')
    setHash(params?.hash)
    if (row)
      setRow(row)
  },[])

  return (
    <Container>
      <Grid container mt={2}>
        <Grid item xs={12} md={12}>
          <MKBox width="100%" display="flex" justifyContent="center">
            <MKTypography variant="h4" color="text">
              Transaction Details
            </MKTypography>
          </MKBox>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={9} sm={12} lg={9}>
          <MKBox wdith="100%" component="section" pt={4}>
            <Card sx={{padding:'5px'}}>
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
                      {fnumber(row?.value,'en-US')}
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
                      <CopyToClipboard text={row?.from_address}>
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
                      <CopyToClipboard text={row?.to_address}>
                        <Icon fontSize="medium">copy</Icon>
                      </CopyToClipboard>
                    </MKBox>
                  </MKBox>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-start" mt={3}>
                <Grid item xs={12} md={12}>
                  <MKBox px={2} width="100%" display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
                    <MKTypography variant="button">Gas</MKTypography>
                    <MKTypography variant="button" fontWeight="bold">
                    {fnumber(row?.gas_quote,'en-US')}
                    </MKTypography>
                  </MKBox>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-start" mt={3}>
                <Grid item xs={12} md={12}>
                  <MKBox px={2} width="100%" display="flex" flexDirection="row" justifyContent="flex-start" alignItems="flex-end">
                    <MKBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
                      <MKTypography variant="button">Block Number</MKTypography>
                      <MKTypography variant="button" fontWeight="bold">
                        {row?.block_height}
                      </MKTypography>
                    </MKBox>
                    <MKBox ml={2} sx={{cursor:'pointer'}}>
                      <CopyToClipboard text={row?.block_height}>
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
    </Container>
  )
}

export default TransactionDetail