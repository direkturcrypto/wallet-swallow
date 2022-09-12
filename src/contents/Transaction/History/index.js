import React from "react"

import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import { styled } from '@mui/material/styles';

import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKBadge from "components/MKBadge"
import MKTypography from "components/MKTypography"

// Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import Loaded from "contents/Components/Loaded"
import Pagination from "contents/Components/Pagination"

import {fnumber} from "libs/helper"
import config from "config/core"
import axios from "axios"

class TransactionHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rowsPerPage: 15,
			currentPage: 1,
			totalPages: 0,
			totalData: 0,
      rows : [],

      isLoading : false,
    }
  }

  componentDidMount() {
    this.iniData()
  }

  iniData () {

  }

  render () {
    return (
      <MKBox width="100%" component="section" m={2}>
        <Loaded open={this.state.isLoading}/>
        <Card sx={{padding:'25px'}}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <Grid container justifyContent="center">
                <Grid item xs={3} md={3}>
                  <MKBox color="rgba(0,0,0,.6)" bgColor="#e8e8e8" borderRadius="5px"
                    shadow="lg"
                    textAlign="center"
                    justifyContent="center"
                    p={1}>
                    History Transaction
                  </MKBox>
                </Grid>
                <Grid item xs={9} md={9}></Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={12} sm={12} lg={12}>

            </Grid>

          </Grid>
        </Card>
      </MKBox>
    )
  }
}

export default TransactionHistory