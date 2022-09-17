import React, {useState, useEffect} from "react"
import {useNavigate, useParams, useLocation} from "react-router-dom"

import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"

import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKInput from "components/MKInput"
import MKTypography from "components/MKTypography"

// class TransactionSend extends React.Component {

function TransactionSend() {
  // const notifRef= useRef()
  const navigate = useNavigate()
  const params = useParams()
  
  useEffect(()=>{
    console.log({params})
  }, [])

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" mt={2}>
        <Grid item xs={8} md={8} sm={12} lg={8}>
          <Card>
            <MKBox p={3} display="flex" justifyContent="center">
              <MKTypography variant="h4" fontWeight="medium" mt={1}>
                Send Balance
              </MKTypography>
            </MKBox>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TransactionSend