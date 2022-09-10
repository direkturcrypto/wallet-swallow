import React, { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import Grid from "@mui/material/Grid";

import MKBox from "components/MKBox";

// Material Kit 2 PRO React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

import routes from "routes";
import secureStorage from "libs/secureStorage"

function Layout () {
  const navigate = useNavigate()

  useEffect(()=>{
    const privateKey = secureStorage.getItem('privateKey')
    if (!privateKey)
      navigate('/account/create')
  })

  const handleLogout = (e) => {
    secureStorage.removeItem('privateKey')
    navigate('/account/create')
    navigate(0)
  }

  return (
    <>
      <MKBox bgColor="dark" shadow="sm" py={0.25}>
        <DefaultNavbar
          brand = {"Sample App"}
          action={{
            type: "internal",
            onClick:handleLogout,
            route: "/",
            label: "logout",
            color: "error",
          }}
          routes={routes}
          transparent
          relative
          light/>
      </MKBox>
      <Outlet />
    </>
  )
}
export default Layout