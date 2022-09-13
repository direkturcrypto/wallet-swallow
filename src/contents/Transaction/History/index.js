import React from "react"
import { Navigate } from "react-router-dom"

import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
// import Slide from "@mui/material/Slide"
import Icon from "@mui/material/Icon";
import Snackbar from "@mui/material/Snackbar";
import { makeStyles, withStyles } from '@mui/styles';
import { styled } from '@mui/material/styles'

// @mui icons
import CloseIcon from "@mui/icons-material/Close";;

import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKBadge from "components/MKBadge"
import MKTypography from "components/MKTypography"
import MKAlert from "components/MKAlert"

// Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import Loaded from "contents/Components/Loaded"
import Pagination from "contents/Components/Pagination"

import secureStorage from "libs/secureStorage"
import {fnumber} from "libs/helper"
import config from "config/core"
import axios from "axios"

import trx from "config/transaction"

import { CopyToClipboard } from "react-copy-to-clipboard";

const styles = {
  stickyHeader:{
    position:'sticky',
    top:0,
    zIndex:2,
    backgroundColor:'#f9fafb'
  },
  truncate : {
    width: "250px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor:'#e8f4f7',
  },
  '&:nth-of-type(even)': {
    backgroundColor:'#cbe3ee'
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const toastStyles = ({
  palette: { info },
  borders: { borderRadius },
  typography: { size },
  boxShadows: { lg },
}) => ({
  "& .MuiPaper-root": {
    backgroundColor: info.main,
    borderRadius: borderRadius.lg,
    fontSize: size.sm,
    fontWeight: 400,
    boxShadow: lg,
    px: 2,
    py: 0.5,
  },
});

class TransactionHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rowsPerPage: 15,
			currentPage: 1,
			totalPages: 0,
			totalData: 0,
      rows : [],

      headers : ['#','Trx Hash'],
      isLoading : false,
      copied:false,

      redirect: null,
      params : null
    }
  }

  componentDidMount() {
    this.iniData()
  }

  iniData () {
    this.setState({
      rows:trx.data.items
    })
  }

  toastTemplate = ()=> {
    return (
      <MKBox display="flex" justifyContent="space-between" alignItems="center" color="white">
        Code successfully copied!
        <CloseIcon
          fontSize="medium"
          sx={{ ml: 4, mr: -1, cursor: "pointer" }}
          onClick={()=> this.setState({copied:!this.state.copied})}
        />
      </MKBox>
    )
  }

  renderBody = () => this.state.rows.map((item, index)=> {
    return (
      <StyledTableRow key={index}>
        <MKBox component="td" width="2%" py={2} pl={2} pr={0.5}>
          <MKButton iconOnly circular size="medium" variant="gradient" color="info">
            <Icon color="inherit">history</Icon>
          </MKButton>
        </MKBox>
        <MKBox component="td" width="10%" sx={{padding:'20px'}}>
          <MKBox display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start">
            <MKBox display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
              <MKBox mt={1}
                onClick={()=>{
                  console.log(`[HASH] ${item.tx_hash}`)
                  secureStorage.setItem('detail', item)
                  this.setState({
                    redirect:`/transaction/detail/${item.tx_hash}`
                  })
                }}>
                <MKTypography variant="caption" fontSize="medium" fontWeight="bold"
                  sx={{
                    overflow:'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace: "nowrap",
                    width:'50px',
                    cursor:'pointer'
                  }}>
                  {`${item.to_address.substring(0,25)}...${item.to_address.substring(item.to_address.length-5, item.to_address.length)}`}
                </MKTypography>
              </MKBox>
              <MKTypography variant="button" color="text">
                {item.block_signed_at}
              </MKTypography>
            </MKBox>
            <MKBox ml={2} sx={{cursor:'pointer'}}>
              <CopyToClipboard text={item.to_address} 
                onCopy={(text, result)=> {
                  this.setState({copied:result})
                  setTimeout(() => {
                    this.setState({copied:false})
                  }, 1000);
                }}>
                <Icon fontSize="medium">copy</Icon>
              </CopyToClipboard>
            </MKBox>
          </MKBox>
        </MKBox>
        <MKBox component="td" width="88%" sx={{padding:'20px',fontSize:'20px'}}>
          <MKBox width="100%" display="flex" alignItems="center" justifyContent="flex-end">
            <MKTypography variant="h5" verticalAlign="middle" sx={{width:'max-content'}}>
              {fnumber(item.gas_quote,'en-US')}
            </MKTypography>
          </MKBox>
        </MKBox>
      </StyledTableRow>
    )
  })

  render () {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const {classes} = this.props
    return (
      <>
        <Loaded open={this.state.isLoading}/>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.copied}
          autoHideDuration={1000}
          onClose={()=> this.setState({copied:!this.state.copied})}
          message={this.toastTemplate()}
          sx={toastStyles}/>

        <MKBox wdith="100%" component="section" pt={4} mx={5}>
          <Card sx={{padding:'25px'}}>
            <Grid container justifyContent="center">
              <Grid item xs={12} md={12} sm={12} lg={12}>
                <Grid container justifyContent="flex-start">
                  <Grid item xs={2} md={2}>
                    <MKBox color="rgba(0,0,0,.6)" bgColor="#e8e8e8" borderRadius="5px"
                      shadow="lg"
                      textAlign="center"
                      justifyContent="flex-start"
                      p={1}>
                      History Transaction
                    </MKBox>
                  </Grid>
                  <Grid item xs={9} md={9}></Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={12} sm={12} lg={12} mt={3}>
                <MKBox width="100%" sx={{overflow: 'hidden'}}>
                  <TableContainer sx={{maxHeight:500}}>
                    <Table stickyHeader aria-label="customized sticky table">
                      <TableBody>
                        {this.renderBody()}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </MKBox>
              </Grid>

            </Grid>
          </Card>
        </MKBox>
      </>
    )
  }
}

export default withStyles(styles)(TransactionHistory)