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
    <MKBox display="flex" variant={variant}
      bgColor={variant === "contained" ? "grey-100" : color}
      justifyContent="center"
      borderRadius="xl"
      shadow="md"
      flexDirection="column">
      <MKBox width="100%" display="flex" 
        alignItems="center" 
        justifyContent="center"
        bgColor="grey-100"
        p={5}>
        <QRCode
          value={privateKey}
          size={280}
          level={"L"}/>
      </MKBox>
      <MKBox display="flex" 
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
      </MKBox>

      <MKBox width="100%" display="flex" 
        flexDirection={{xs:'column', md:'row'}}
        alignItems="center" 
        mb={2}
        justifyContent="center">
        <MKBox mr={0.5}>
          <MKButton type="button" variant="outlined" color="info" size="small">
            <Icon>send</Icon> &nbsp;Send
          </MKButton>
        </MKBox>
        <MKBox mr={0.5}>
          <MKButton type="button" variant="outlined" color="info" size="small">
            <Icon>swap_horizontal_circle</Icon>&nbsp; Swap
          </MKButton>
        </MKBox>
        <MKBox mr={0.5}>
          <CopyToClipboard text={address}>
            <MKButton type="button" variant="outlined" color="info" size="small">
              <Icon>copy</Icon>&nbsp; Copy
            </MKButton>
          </CopyToClipboard>
        </MKBox>
      </MKBox>
    </MKBox>
  )
}

CardBalance.defaultProps = {
  variant: 'gradient',
  color : 'white'
}

export default CardBalance