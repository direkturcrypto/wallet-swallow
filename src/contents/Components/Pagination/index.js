import React, {useEffect, useState} from 'react'
import PropTypes from "prop-types";

import { makeStyles } from '@mui/styles';

import Grid from "@mui/material/Grid";
import { Autocomplete } from "@mui/material";
import Icon from "@mui/material/Icon";

import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import MKPagination from "components/MKPagination";

import _ from "lodash"

const styles = {
  rowsPerPage:{
    width : '50px'
  }
}

const useStyles = makeStyles(styles);
function Pagination (props) {
  
  const {  
    color, 
    className,
    totalButton,
    currentPage,
    totalPages,
    totalData,
    onChangePage,

  } = props;

  const { t } = useTranslation()
	const classes = useStyles();
	const [rowsPerPage,setRowsPerpage] = useState(props.defaultRowsPerPage?props.defaultRowsPerPage:props.rowsPerPage?props.rowsPerPage[0]:'')

  const handleRowsPerpage = (newValue) => {
		if (newValue) {
			setRowsPerpage(newValue)
			if(props.onChangeRowsPerPage) props.onChangeRowsPerPage(newValue)
			else alert('Rows per page '+newValue)
		}
	}

	const paginationButton = () => {
		let i = currentPage-parseInt(totalButton/2) < 1 ? 1 : currentPage-parseInt(totalButton/2)
		let n = currentPage+parseInt(totalButton/2) > totalPages ? totalPages : currentPage+parseInt(totalButton/2)

		if (totalPages<totalButton)
			n = totalPages
		let buttonPages = [{
			disabled:currentPage===1?true:false,
			text: (<Icon>keyboard_double_arrow_left</Icon>),
			onClick: ()=>onChangePage(1)
		}]
		buttonPages.push({
			disabled:currentPage===1?true:false,
			text: (<Icon>keyboard_arrow_left</Icon>),
			onClick: ()=>onChangePage(currentPage-1)
		})

		if(currentPage>parseInt(totalButton/2)+1)
			buttonPages.push({ disabled: true , text: '...'})
		for(i ; i<=n ; i++){
			buttonPages.push({active: currentPage===i ? true : false, text: i, onClick:(value)=>onChangePage(value) })
		}

		if(currentPage<totalPages-parseInt(totalButton/2))
			buttonPages.push({ disabled: true , text: '...'})
		
		buttonPages.push({ 
			disabled: currentPage === totalPages || totalPages=== 0? true : false ,
			text: (<Icon>keyboard_arrow_right</Icon>),
			onClick:()=>onChangePage(currentPage+1) 
		})
		buttonPages.push({ 
			disabled: currentPage === totalPages || totalPages=== 0? true : false ,
			text: (<Icon>keyboard_double_arrow_right</Icon>),
			onClick:()=>onChangePage(totalPages)
		})

		buttonPages.push({ disabled: true , text: 'Dari '+ totalData })
		
		return buttonPages
	}

  const pages = props.pages?props.pages:paginationButton()
  return (
    <Grid container>
			<Grid item xs={12} sm={8}>
				<MKBox width="100%" display="flex" justifyContent="flex-start">
					<MKPagination>
						{pages.map((prop, key)=>{
							return (
								<MKBox key={key} >
									{prop.onClick!=undefined?(
										<MKPagination
											disabled={prop.disabled}
											active={prop.active}
											onClick={()=>prop.onClick(prop.text)}
											item>
											{prop.text}
										</MKPagination>
									):(
										<MKTypography ml={2} variant="button" color="text">
											{prop.text}
										</MKTypography>
									)}
								</MKBox>
							)
						})}
					</MKPagination>
				</MKBox>
			</Grid>

			{props.rowsPerPage &&
				<Grid item xs={12} sm={4}>
					<MKBox width="100%" display="flex" flexDirection={{xs:"column", md:"row"}} 
						justifyContent="flex-end" 
						alignItems="center">
						<MKBox mr={2}>
							<MKTypography variant="button" color="text" textTransform="uppercase">
                Baris per halaman
							</MKTypography>
						</MKBox>
						
						<Autocomplete
							value={rowsPerPage}
							options={props.rowsPerPage}
							getOptionLabel={(option)=> {
								if (!option) return
								return option.toString()
							}}
							onChange={(e, newValue)=> handleRowsPerpage(newValue)}
							renderInput={(params) => <MKInput {...params} placeholder="Baris per halaman" variant="standard" fullWidth/>}
							/>
					</MKBox>
				</Grid>
			}
		</Grid>
  )
}


Pagination.defaultProps = {
  color: "primary",
  totalButton:7,
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalData: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      text: PropTypes.oneOfType([PropTypes.number, PropTypes.string,PropTypes.element])
        .isRequired,
      onClick: PropTypes.func
    })
  ),
  className: PropTypes.string,
  rowsPerPage: PropTypes.array,
  onChange: PropTypes.func,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "danger"
  ]),
};

export default Pagination