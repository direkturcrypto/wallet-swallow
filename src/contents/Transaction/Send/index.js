import React from "react"

import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"

import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKInput from "components/MKInput"

class TransactionSend extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Container>
        <Grid container spacing={2} justifyContent="center">
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
}

export default TransactionSend