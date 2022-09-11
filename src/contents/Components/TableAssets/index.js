import React, {useState, useEffect} from "react"
import PropTypes from "prop-types";
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

// Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKTypography from "components/MKTypography";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor:'#e8f4f7'
  },
  '&:nth-of-type(even)': {
    backgroundColor:'#cbe3ee'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const useStyles = makeStyles({
  stickyHeader:{
    position:'sticky',
    top:0,
    zIndex:2,
    backgroundColor:'#f9fafb'
  }
})
function TableAssets(props) {
  const classes = useStyles()

	const [sortable,setSortable] = useState(false)
  const [sticky,setSticky] = useState(false)
  const [isSorting,setSorting] = useState(false)
  const [preview,setPreview] = useState(true)

  const {
    tableData,
  } = props

  const renderRows = tableData.map((key,idx)=>{
    const rowKey = `row-${idx}`
    return (
      <StyledTableRow hover tabIndex={-1} key={rowKey}>
        <MKBox
          component="td"
          key={idx}
          sx={{ 
            fontSize:'14px',
            padding:'20px !important',
            fontWeight:'bold'
          }}>
          <MKBox display="flex" alignItems="center" py={0.5} px={1}>
            <MKAvatar src={key.logo_url} variant="rounded" size="sm" />
            <MKTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
              {key.contract_name}
            </MKTypography>
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

export default TableAssets