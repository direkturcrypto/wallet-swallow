import React from "react"

import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"

import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKTypography from "components/MKTypography"

function NotFound () {

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={12}>
          <MKTypography>NOT FOUND</MKTypography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default NotFound