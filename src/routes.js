/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

*/

// @mui material components
import Icon from "@mui/material/Icon";

import Dashboard from "contents/Dashboard";

const routes = [
  {
    name: "wallet",
    icon: <Icon>wallet</Icon>,
    route:"/dashboard",
    index:true,
    component : <Dashboard/>,
    key:'wallet',
  },{
    name:'transaction',
    icon: <Icon>shopping-cart</Icon>,
    route:"/transaction",
    key:'transaction',
  },{
    name: 'account',
    key:'account',
    route:'/account/info',
    icon: <Icon>person</Icon>
  }
];

export default routes;
