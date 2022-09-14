import React, {useEffect, useState} from "react"
import { CardHeader, CardContent, Grid } from "@mui/material"
import Card from "@mui/material/Card"
import MKBox from "components/MKBox"
import MKButton from "components/MKButton";
import WCLogo from "assets/images/walletconnect-logo.png";
import WalletConnect from "@walletconnect/client";
import secureStorage from "libs/secureStorage";
import {ethers} from "ethers"
import network from "config/network"
import ConnectedApp from "./connectedApp"

import Provider from "libs/provider";

function WC() {
    const [wallet, setWallet] = useState(null);
    const [connector, setConnector] = useState(null);
    const [wcStatus, setWCStatus] = useState(null);
    const [wcTransaction, setWCTransaction] = useState(null);
    const [selectedNetwork, setSelectedNetwork] = useState(null)

    useEffect(() => {
        if (connector) {
            listenDapps()
        }
    }, [connector])

    useEffect(() => {
        if (wallet) {
            loadSession()
        }
    }, [wallet])

    useEffect(() => {
        loadWallet()
    }, [])

    const loadWallet = () => {
        const privateKey = secureStorage.getItem('privateKey')
        const _selectedNetwork = secureStorage.getItem('selectedNetwork')
        const provider = new Provider(privateKey, selectedNetwork)
        const account = provider.wallet
        
        setWallet(account);
        setSelectedNetwork(_selectedNetwork)
    }

    const pasteQR = () => {
        let dataQr = prompt("Paste Your QRCode")
        if (dataQr) {
            connectDapps(dataQr)
        }
    }

    const connectDapps = async (data) => {
        console.log("datauri", data)
        const conn = new WalletConnect({
            uri: data,
            clientMeta: {
                description: "WalletConnect Developer App",
                url: "https://walletconnect.org",
                icons: ["https://walletconnect.org/walletconnect-logo.png"],
                name: "WalletConnect"          
            }
        })

        // console.log(connector)
        setConnector(conn)
    }
    
    const listenDapps = async () => {
        connector.on("session_request", async (err, payload) => {
            console.log(err, payload)
            
            if (wallet) {
                let account = await wallet.getAddress()
                connector.approveSession({
                    accounts: [account],
                    chainId: selectedNetwork?.chainId
                })
            }
        })

        connector.on("connect", (err, payload) => {
            console.log("onConnect", err, payload)
            if (err) return console.error(`onConnectError`, err)
            if (payload.params.length > 0) {
                setWCStatus(payload.params[0])
            }
        })

        connector.on("disconnect", (err, payload) => {
            console.log("onDisconnect", err, payload)
            setWCStatus(null)
            setConnector(null)
        })

        connector.on("wc_sessionUpdate", console.log)

        connector.on("call_request", (err, payload) => {
            console.log("call_request", err, payload)
            if (payload.method == "eth_sendTransaction") {
                setWCTransaction(payload)
            }
        })
    }

    const loadSession = () => {
        let session = window.localStorage.getItem('walletconnect')
        // single session
        if (session) {
            session = JSON.parse(session)
            console.log("Load Session", session)
            const conn = new WalletConnect(session)
            setConnector(conn)
            setWCStatus(session)
        }
    }

    const disconnectApp = () => {
        connector.killSession()
    }

    const onUpdateTrx = (data) => {
        setWCTransaction(data)
        document.title = `MyWallet`      
    }

    return (
        <MKBox>
					{
						wcStatus != null ? <ConnectedApp
							wcTransaction={wcTransaction}
							wcStatus={wcStatus}
							wcDisconnect={() => disconnectApp()}
							connector={connector}
							wallet={wallet}
							onUpdateTrx={onUpdateTrx}/> : (
							<Grid container justifyContent={"center"} textAlign={"center"} spacing={"3"}>
									<Grid item md={6} xs={12} lg={6} sm={12}>
											<MKBox p={2}>
													<Card>
															<MKBox p={2}>
																	<p>Connect Dapps Using Wallet Connect</p>
																	<hr/>
																	<br/>
																	<img src={WCLogo} width={300}/>
																	<br/>
																	<h2>WalletConnect</h2>
																	<p>Open Protocol for Connecting Wallets to Dapps</p>
																	<br/>

																	<MKButton color="secondary" size="large" variant="gradient" fullWidth onClick={() => pasteQR()}>
																			Paste QR
																	</MKButton>
																	<small> Or </small>
																	<MKButton color="info" size="large" variant="gradient" fullWidth>
																			Scan QR
																	</MKButton>
															</MKBox>
													</Card>
											</MKBox>
									</Grid>
							</Grid>
						)
					}
			</MKBox>
    )
}

export default WC