import React from 'react'
import { CardHeader, CardContent, Grid } from "@mui/material"
import Card from "@mui/material/Card"
import MKBox from "components/MKBox"
import MKButton from "components/MKButton";
import WCLogo from "assets/images/walletconnect-logo.png";
import WalletConnect from "@walletconnect/client";
import secureStorage from "libs/secureStorage";
import {ethers} from "ethers"
import network from "config/network"

function ConnectedApp({wcStatus, wcDisconnect}) {
    return (
        <Grid container justifyContent={"center"} textAlign={"left"} spacing={"3"}>
            <Grid item md={6} xs={12} lg={6} sm={12}>
                <MKBox p={2}>
                    <Card>
                        <MKBox p={2}>
                            <p>Connect Dapps Using Wallet Connect</p>
                            <hr/>
                            <br/>
                            <center>
                                <img src={wcStatus.peerMeta.icons[0]??WCLogo} width={32}/>
                                <h4>{wcStatus.peerMeta.name}</h4>
                                <small>{wcStatus.peerMeta.description}</small>
                            </center>
                            <br/>

                            <MKButton color="error" size="large" variant="gradient" onClick={wcDisconnect} fullWidth>
                                Exit
                            </MKButton>
                        </MKBox>
                    </Card>
                </MKBox>                    
            </Grid>
        </Grid>
    )
}
export default ConnectedApp