import React, {useState, useEffect} from "react"
import PropTypes from "prop-types";
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

// Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Zoom from '@mui/material/Zoom';

import Icon from "@mui/material/Icon";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import {fnumber} from "libs/helper"
import MKButton from "components/MKButton";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor:'#e8f4f7'
  },
  '&:nth-of-type(even)': {
    backgroundColor:'#cbe3ee'
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// const useStyles = makeStyles({
//   stickyHeader:{
//     position:'sticky',
//     top:0,
//     zIndex:2,
//     backgroundColor:'#f9fafb'
//   }
// })

function TableAssets({tableData}) {
  const [assets, setAssets] = useState([])

  useEffect(()=>{
    const _assets = tableData.map(key=>{
      return { ...key, show:false }
    })
    setAssets(_assets)
  },[tableData])

  const renderRows = assets.map((key,idx)=>{
    const rowKey = `row-${idx}`
    const balance = parseInt(key.balance)/ (10 ** key.contract_decimals)

    const toggleButton = (show, index) => {
      const _assets = [...assets]
      _assets[index]['show'] = show
      setAssets(_assets)
    }

    return (
      <StyledTableRow hover tabIndex={-1} key={rowKey}>
        <MKBox component="td"
          width="80%"
          sx={{
            fontSize:'14px',
            padding:'10px !important'
          }}>
          <MKBox display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
            <MKTypography variant="h6" verticalAlign="middle">
              {key.contract_ticker_symbol}
            </MKTypography>
            <MKTypography variant="button" color="text"
              verticalAlign="middle"  
              sx={{width:'max-content'}}>
              {key.contract_name}
            </MKTypography>
          </MKBox>
        </MKBox>
        <MKBox component="td"
          width="20%"
          sx={{
            fontSize:'20px',
            padding:'10px !important'
          }}>
          <MKBox width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end"
            onMouseLeave={()=> toggleButton(false, idx)}
            onMouseEnter={(event)=> toggleButton(true, idx)}>
            
            <MKBox display="flex" flexDirection="column" justifyContent="center" alignItems="flex-end" py={0.5} 
              px={1}>
              <MKTypography variant="h6" verticalAlign="middle" sx={{width:'max-content'}}>
                {fnumber(balance,'en-US')} {key.contract_ticker_symbol}
              </MKTypography>
              <MKTypography variant="button" color="text" verticalAlign="middle" sx={{width:'max-content'}}>
                {fnumber(key.quote,'en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'})}
              </MKTypography>
            </MKBox>

            <Zoom in={key.show}>
              <MKBox display={key.show?'flex':'none'} alignItems="flex-end" ml={1}>
                <MKButton variant="gradient" color="secondary">
                  <Icon sx={{mr:1}}>send</Icon>
                  SEND
                </MKButton>
              </MKBox>
            </Zoom>

          </MKBox>
        </MKBox>
      </StyledTableRow>
    )
  })

  return (
    <MKBox width="100%" sx={{overflow: 'hidden'}}>
      <TableContainer sx={{
          maxHeight: 500
        }}>
        <Table stickyHeader aria-label="customized sticky table">
          <TableBody>
            {renderRows}
          </TableBody>
        </Table>
      </TableContainer>
    </MKBox>
  )
}

TableAssets.defaultProps = {
  tableData : []
}

TableAssets.propTypes = {
  tableData : PropTypes.array.isRequired
}

export default TableAssets