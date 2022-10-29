import React, { useEffect, useState } from 'react'
import { CardHeader, CardContent, Grid, Table, TableBody, TableRow, TableCell, TextareaAutosize } from "@mui/material"
import Card from "@mui/material/Card"
import MKBox from "components/MKBox"
import MKButton from "components/MKButton";
import MKInput from "components/MKInput"
import {ethers, utils} from "ethers"

function SignTransaction({data, wcStatus, connector, wallet, updateData}) {
    const [gwei, setGwei] = useState(100)
    const [gas, setGas] = useState(0)
    const [confirming, setConfirming] = useState(false)

    useEffect(() => {
        estimateGas()
        document.title = `(1) Confirm Transaction`
    }, [])

    const estimateGas = async () => {
        let g = data.params[0].gas ? ethers.BigNumber.from(data.params[0].gas) : await wallet.estimateGas({
            to: data.params[0].to,
            data: data.params[0].data,
            value: data.params[0].value?ethers.utils.parseEther(data.params[0].value):0
        })
        let fee = await wallet.getFeeData()
        setGas(ethers.BigNumber.from(g).toString())
        setGwei(parseInt(ethers.BigNumber.from(fee.gasPrice).toString()) / 1e9)
    }

    const onReject = () => {
        connector.rejectRequest({
            id: data.id,
            error: {
                message: "REJECTED_BY_USER"
            }
        })
        updateData(null)
    }

    const onApprove = async () => {
        setConfirming(true)
        let payload = data.params[0]
        if (data.method == 'eth_sendTransaction') {
            const createReceipt = await wallet.signTransaction({
                from: payload.from,
                to: payload.to,
                data: payload.data
            }, {
                gasLimit: gas,
                gasPrice: parseInt(gwei) * 1e9
            });
            await createReceipt.wait();
            connector.approveRequest({
                id: data.id,
                jsonrpc: data.jsonrpc,
                result: createReceipt.hash
            })
            console.log("PENERIMA", createReceipt)
            setConfirming(false)
            updateData(null)    
        } else if (data.method == 'personal_sign') {
            let decoded = utils.toUtf8String(utils.arrayify(payload))
            const signed = await wallet.signMessage(decoded)
            
            connector.approveRequest({
                id: data.id,
                jsonrpc: data.jsonrpc,
                result: signed
            })
            setConfirming(false)
            updateData(null)
        }
    }

    const signMessageComponent = () => {
        return (
            <Card>
                <MKBox p={2}>
                    <p>Sign Messages</p>
                    <hr/>
                    <br/>
                    <Grid container>
                        <Grid item md={12}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <small>Account</small>
                                        </TableCell>
                                        <TableCell>
                                            <small>{data.params[1]}</small>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <small>Message</small>
                                        </TableCell>
                                        <TableCell>
                                            <small>
                                                {utils.toUtf8String(utils.arrayify(data.params[0]))}                                                
                                            </small>
                                            {/* <MKInput label="Data" fullWidth id="xdata" disabled value={utils.toUtf8String(utils.arrayify(data.params[0]))}></MKInput> */}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                    <br/>
                    <MKButton color="light" size="large" variant="gradient" fullWidth onClick={onReject}>
                        REJECT
                    </MKButton>
                    <br/><br/>
                    <MKButton color="info" size="large" variant="gradient" fullWidth onClick={onApprove} disabled={confirming}>
                        {confirming ? "SIGNING...." : "SIGN"}
                    </MKButton>
                </MKBox>
            </Card>
        )
    }

    return (
        data.method == "personal_sign" ? signMessageComponent() : <Card>
            <MKBox p={2}>
                <p>Confirmation Transaction</p>
                <hr/>
                <br/>
                <Grid container>
                    <Grid item md={12}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <small>From</small>
                                    </TableCell>
                                    <TableCell>
                                        <small>{data.params[0].from}</small>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <small>To</small>
                                    </TableCell>
                                    <TableCell>
                                        <small>{data.params[0].to}</small>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <small>Data</small>
                                    </TableCell>
                                    <TableCell>
                                        <MKInput label="Data" fullWidth id="xdata" disabled value={data.params[0].data}></MKInput>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <small>Value</small>
                                    </TableCell>
                                    <TableCell>
                                        <small>{data.params[0].value}</small>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <small>Gas</small>
                                    </TableCell>
                                    <TableCell>
                                        <MKInput label="Gas" value={gas} fullWidth id='gas' onChange={(e) => setGas(e.target.value)}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <small>Gwei</small>
                                    </TableCell>
                                    <TableCell>
                                        <MKInput label="Gwei" value={gwei} fullWidth id='gwei' onChange={(e) => setGwei(e.target.value)}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <small>Gas Price</small>
                                    </TableCell>
                                    <TableCell>
                                        <small>{ethers.utils.formatEther((parseInt(gas) * parseInt(gwei * 1e9)).toString()).toString()} ONE</small>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <br/>
                <MKButton color="light" size="large" variant="gradient" fullWidth onClick={onReject}>
                    REJECT
                </MKButton>
                <br/><br/>
                <MKButton color="info" size="large" variant="gradient" fullWidth onClick={onApprove} disabled={confirming}>
                    {confirming ? "SUBMITING...." : "CONFIRM"}
                </MKButton>
            </MKBox>
        </Card>
    )
}

export default SignTransaction