import React, { useEffect } from "react"

// react-router components
import { Routes, Route, useLocation } from "react-router-dom"

// @mui material components
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

// Material Kit 2 React themes
import theme from "assets/theme"

// Material Kit 2 React routes
import routes from "routes"
import Layout from "contents"
import CreateAccount from "contents/Account/Create"
import RestoreAccount from "contents/Account/Restore"
import Dashboard from "contents/Dashboard";
import Transaction from "contents/Transaction"
import TransactionHistory from "contents/Transaction/History"
import SendBalance from "contents/Transaction/Send"
import NotFound from "contents/NotFound"

import secureStorage from "libs/secureStorage"

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      waitingWorker: {},
    };
  }

  componentDidMount () {
  }

  sessionCheck() {
    const account = secureStorage.getItem('account')
    if (!account)
      this.logout()
  }

  logout () {
    secureStorage.removeItem('account')
    window.location.reload();
  }

  getRoutes = (allRoutes) => {
    const index = []
    const routes = allRoutes.map((route) => {
      if(route.index)
        index.push(<Route index element={route.component} key={route.key} />) 
      if (route.collapse) {
        return ( 
          <Route exact path={route.route} element={route.component} key={route.key} >
            {this.getRoutes(route.collapse)}
          </Route> 
        )
      }
      else if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    })
    return routes.concat(index)
  }

  render () {
    const  routeTemp = this.getRoutes(routes)
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route exact path="/account/create" element={<CreateAccount />} key="create-account" />
          <Route path="/account/restore" element={<RestoreAccount />} key="restore-account" />
          <Route path="/" element={<Layout/>} key="layout">
            {routeTemp}
          </Route>
          <Route path="*" element={<NotFound/>} key="notfound"/>
        </Routes>
      </ThemeProvider>
    );
  }
}


export default App