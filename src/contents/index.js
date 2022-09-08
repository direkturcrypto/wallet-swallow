import React, { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export default function Layout() {

  return (
    <>
      <Outlet />
    </>
  )
}