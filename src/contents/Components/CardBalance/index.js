import React, {useState, useEffect, useRef} from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Icon from "@mui/material/Icon";

import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";

import Notification from "contents/Components/Notification";

import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from 'qrcode.react';

import {fnumber} from "libs/helper"
import secureStorage from "libs/secureStorage";

function CardBalance({color, variant, wallet, ...rest}) {
  const notifRef = useRef()
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState(0)
  const [privateKey, setPrivateKey] = useState("")

  useEffect(()=>{
    console.log('[INIT BALANCE]')
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
      <Notification ref={notifRef}/>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={12}>
          <MKBox width="100%" pb={1.5} pt={5} px={5}
            display="flex" 
            flexDirection="column"
            alignItems="center" 
            justifyContent="center"
            bgColor="grey-100">
            <QRCode
              value={address.toLowerCase()}
              size={280}
              level={"L"}/>
            <MKBox mt={1}>
              <MKTypography variant="body2" fontSize="small" 
                textTransform="lowercase" 
                textGradient
                fontWeight="bold">
                {address.toLowerCase()}
              </MKTypography>
            </MKBox>
          </MKBox>
        </Grid>
        <Grid item xs={12} md={12}>
          <MKBox p={2} width="100%" display="flex" justifyContent="center">
            <MKTypography variant="h5">
              {fnumber(balance,'en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'})}
            </MKTypography>
          </MKBox>
        </Grid>
        <Grid item xs={12} md={12}>
          <MKBox px={2} mb={2} display="flex" justifyContent="center">
            <Grid container justifyContent="center">
              <Grid item xs={12} md={3} mr={{xs:0, md:0.5}} mb={{xs:1}}>
                <Link to="/transaction/send">
                  <MKButton type="button" variant="outlined" color="info" size="small" 
                    fullWidth>
                    <Icon sx={{mr:0.3}}>send</Icon>Send
                  </MKButton>
                </Link>
              </Grid>
              <Grid item xs={12} md={3} mr={{xs:0, md:0.5}} mb={{xs:1}}>
                <MKButton type="button" variant="outlined" color="info" size="small" fullWidth>
                  <Icon sx={{mr:0.3}}>swap_horizontal_circle</Icon>Swap
                </MKButton>
              </Grid>
              <Grid item xs={12} md={3} mr={{xs:0, md:0.5}} mb={{xs:1}}>
                <CopyToClipboard 
                  text={address}
                  onCopy={(text, result)=> notifRef.current.setShow(result,'Code successfully copied!')}>
                  <MKButton type="button" variant="outlined" color="info" size="small" fullWidth>
                    <Icon sx={{mr:0.3}}>copy</Icon>&nbsp; Copy
                  </MKButton>
                </CopyToClipboard>
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
