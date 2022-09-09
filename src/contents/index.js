import React, { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import secureStorage from "libs/secureStorage"

function Layout () {
  const navigate = useNavigate()

  useEffect(()=>{
    const account = secureStorage.getItem('account')
    if (!account)
      navigate('/account/create')
  })

  return (
    <>
      <Outlet />
    </>
  )
}
export default Layout