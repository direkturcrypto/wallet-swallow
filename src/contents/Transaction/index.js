import React from "react"
import {Outlet} from "react-router-dom"

class Transaction extends React.Component {

  render () {
    return (
      <>
        <Outlet/>
      </>
    )
  }
}

export default Transaction