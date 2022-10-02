import React, {useState, useEffect} from 'react'
import PropTypes from "prop-types";
import { useNavigate, useLocation } from 'react-router-dom';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from '@mui/material/Divider';

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";

import secureStorage from 'libs/secureStorage';

function DropdownNetwork ({updateNetwork}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [networks, setNetworks] = useState([])
  const [selectedNetwork, setSelectedNetwork] = useState(null)
  const [dropdown, setDropdown] = useState(null);

  const openDropdown = ({ currentTarget }) => setDropdown(currentTarget);
  const closeDropdown = () => setDropdown(null)

  const chooseNetwork = (network) => {
    if (network.chainId!==selectedNetwork.chainId) {
      setSelectedNetwork(network)
      updateNetwork(network)
      secureStorage.setItem('selectedNetwork', network)
      navigate('/')
    }
    setDropdown(null)
  }
  
  useEffect(()=>{
    const _networks = secureStorage.getItem('networks')
    const _selectedNetwork = secureStorage.getItem('selectedNetwork')
    setNetworks(_networks)
    setSelectedNetwork(_selectedNetwork)
  }, [location.pathname])

  // Styles
  const iconStyles = {
    ml: 1,
    fontWeight: "bold",
    transition: "transform 200ms ease-in-out",
  }

  const dropdownIconStyles = {
    transform: dropdown ? "rotate(180deg)" : "rotate(0)",
    ...iconStyles,
  }

  return (
    <>
      <MKButton variant="gradient" color="info" 
        size="small"
        onClick={openDropdown}>
        {selectedNetwork?.name} <Icon sx={dropdownIconStyles}>expand_more</Icon>
      </MKButton>
      <Menu sx={{marginTop:'5px'}} anchorEl={dropdown} open={Boolean(dropdown)} onClose={closeDropdown}>
        {networks.map((item, i)=> (
          <MenuItem 
            selected={item.chainId===selectedNetwork.chainId} key={i} 
            onClick={()=> chooseNetwork(item)}
          >
            {item.name}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={()=> {
          closeDropdown()
          navigate('/network')
        }}>
          Add Network
        </MenuItem>
      </Menu>
    </>
  )
}

DropdownNetwork.prototype = {
  updateNetwork: PropTypes.func,
}

export default DropdownNetwork