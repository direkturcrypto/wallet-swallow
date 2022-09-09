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
    name: "dashboard",
    icon: <Icon>dashboard</Icon>,
    route:"/dashboard",
    index:true,
    component : <Dashboard/>,
    key:'dashboard',
  },{
    name:'transaction',
    icon: <Icon>shopping-cart</Icon>,
    route:"/transaction",
    key:'transaction',
  },{
    name: 'account',
    key:'account',
    route:'/account',
    collapse : [
      {
      //   name : 'create account',
      //   description : 'Create new account',
      //   key : 'create-account',
      //   route: '/account/create',
      //   index:true,
      // },{
      //   name : 'restore account',
      //   description : 'Restore account',
      //   key : 'restore-account',
      //   route : '/account/restore'
      // },{
        name : 'info account',
        description : 'Info account',
        key : 'info-account',
        route : '/account/info',
        index:true,
      }
    ]
  }
];

export default routes;
