import React, {useState, useEffect} from "react"
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Icon from "@mui/material/Icon";

import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";

import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from 'qrcode.react';

import secureStorage from "libs/secureStorage";

function CardBalance({color, variant, wallet, ...rest}) {
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState(0)
  const [privateKey, setPrivateKey] = useState("")

  useEffect(()=>{
    initData()
    setBalance(wallet.balance)
    setAddress(wallet.address)
  }, [wallet])

  const initData = () => {
    const _privateKey = secureStorage.getItem('privateKey')
    setPrivateKey(_privateKey)
  }

  return (
    <MKBox display="flex"
      bgColor="white"
      coloredShadow="secondary"
      justifyContent="center"
      borderRadius="5px"
      shadow="xl">
      <Grid container justifyContent="center">
        <Grid item xs={12} md={12}>
          <MKBox width="100%" mb={2} pb={1.5} pt={5} px={5}
            display="flex" 
            flexDirection="column"
            alignItems="center" 
            justifyContent="center"
            bgColor="grey-100">
            <QRCode
              value={privateKey}
              size={280}
              level={"L"}/>
            <MKBox mt={1}>
              <MKTypography variant="body2" fontSize="small" 
                textTransform="uppercase" 
                textGradient
                fontWeight="bold">
                {address}
              </MKTypography>
            </MKBox>
          </MKBox>
        </Grid>
        <Grid item xs={12} md={12}>
          <MKBox px={2} mb={2} display="flex" justifyContent="center">
            <Grid container justifyContent="center">
              <Grid item xs={12} md={3} sx={{mr:0.5}}>
                <MKButton type="button" variant="outlined" color="info" size="small" 
                  fullWidth>
                  <Icon sx={{mr:1}}>send</Icon>Send
                </MKButton>
              </Grid>
              <Grid item xs={12} md={3} sx={{mr:0.5}}>
                <MKBox mr={{xs:0, md:0.5}} mb={{xs:1}}>
                  <MKButton type="button" variant="outlined" color="info" size="small" fullWidth>
                    <Icon sx={{mr:1}}>swap_horizontal_circle</Icon>Swap
                  </MKButton>
                </MKBox>
              </Grid>
              <Grid item xs={12} md={3} sx={{mr:0.5}}>
                <MKBox mr={{xs:0, md:0.5}} mb={{xs:1}}>
                  <CopyToClipboard text={address}>
                    <MKButton type="button" variant="outlined" color="info" size="small" fullWidth>
                      <Icon sx={{mr:1}}>copy</Icon>&nbsp; Copy
                    </MKButton>
                  </CopyToClipboard>
                </MKBox>
              </Grid>
            </Grid>
          </MKBox>
        </Grid>
      </Grid>
    </MKBox>
  )
}

CardBalance.defaultProps = {
  variant: 'gradient',
  color : 'white'
}

export default CardBalance

{/* <MKBox display="flex" 
  flexDirection="column" 
  alignItems="center" 
  justifyContent="center"
  bgColor="grey-100"
  borderRadius="xl"
  py={2}
  my={1}
  mx={2}>
  
  <MKTypography variant="body2">
    Receiver
  </MKTypography>
  <MKTypography variant="body2" fontSize="small" 
    textTransform="uppercase" 
    textGradient
    fontWeight="bold">
    {address}
  </MKTypography>
</MKBox> */}