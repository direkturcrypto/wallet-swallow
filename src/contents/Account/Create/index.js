import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"

import { 
  Container, 
  Grid, 
  Card, 
  Switch 
} from "@mui/material"

import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKInput from "components/MKInput"
import MKAlert from "components/MKAlert"
import MKTypography from "components/MKTypography"

import secureStorage from "libs/secureStorage"
import Loaded from "contents/Components/Loaded"

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import network from "config/network"
import crypto from "crypto"
import {ethers} from "ethers"

function CreateAccount() {
  const navigate = useNavigate()
  const [uniqueText, setUniqueText] = useState("")
  const [secretText, setSecretText] = useState("")

  const [rememberMe, setRememberMe] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [disabledButton, setDisabledButton] = useState(true)
  
  useEffect(()=>{
    const account = secureStorage.getItem('account')
    if (account)
      navigate('/')
  }, [])

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  
  const createAccount = async () => {
    setIsAlert(false)
    setIsLoading(true)
    if (uniqueText==="" || secretText==="") {
      setIsAlert(true)
      setIsLoading(false)
    } else {
      // const RPC_URL = "https://api.harmony.one"
      const privateKey = crypto.createHmac("sha256", uniqueText).update(secretText).digest("hex")
      const provider = new ethers.providers.JsonRpcProvider(network[0].RPC_URL)
      const wallet = new ethers.Wallet(privateKey, provider);
      let balance = await provider.getBalance(wallet.address)
      balance = ethers.utils.formatEther(balance)

      const network = await provider.getNetwork()
      console.log(network)
      console.log({address: wallet.address, balance})
      setIsLoading(false)
    }
  }

  return (
    <Layout image={bgImage}>
      <Loaded open={isLoading}/>
      <Card>
        <MKBox
          display="flex"
          variant="gradient"
          borderRadius="lg"
          mx={2}
          p={2}
          mb={1}
          textAlign="center"
          justifyContent="center">
          <MKTypography variant="h4" fontWeight="medium" mt={1}>
            Create Account
          </MKTypography>
        </MKBox>
        <MKBox pt={4} pb={3} px={3}>
          {isAlert&&
            <MKAlert color="warning">
              Please Remember 2 data to recover your account
            </MKAlert>
          }
          <MKBox component="form" role="form">
            <MKBox mb={2}>
              <MKInput label="Unique Text" fullWidth id='uniqueText' onChange={(e)=> {
                setUniqueText(e.target.value)
                setDisabledButton(false)
              }}/>
            </MKBox>
            <MKBox mb={2}>
              <MKInput type="password" label="Secret Text" fullWidth id='secretText' onChange={(e)=> {
                setSecretText(e.target.value)
                setDisabledButton(false)
              }}/>
            </MKBox>
            <MKBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe}/>
              <MKTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}>
                &nbsp;&nbsp; Remember me
              </MKTypography>
            </MKBox>
            <MKBox mt={4} mb={1}>
              <MKButton variant="gradient" color="info"
                disabled={disabledButton} 
                onClick={createAccount}
                fullWidth>
                Create Account
              </MKButton>
            </MKBox>
            <MKBox mt={3} mb={1} textAlign="center">
              <MKTypography
                sx={{cursor:'pointer'}}
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient>
                  Restore Account
              </MKTypography>
            </MKBox>
          </MKBox>
        </MKBox>
      </Card>
    </Layout>
  )
}

export default CreateAccount

function Layout ({image, children}) {
  return (
    <>
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh">
        <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
          <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
            <Grid item xs={11} sm={9} md={6} lg={6} xl={6}>
              {children}
            </Grid>
          </Grid>
        </MKBox>
      </MKBox>
    </>
  )
}