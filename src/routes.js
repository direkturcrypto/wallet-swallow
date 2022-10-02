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
import TransactionHistory from "contents/Transaction/History"
import TransactionDetail from "contents/Transaction/Detail"
import SendBalance from "contents/Transaction/Send"
import WC from "contents/WalletConnect";
import AddNetwork from "contents/AddNetwork";
import Network from "contents/Network";

const routes = [
  {
    name: "Dashboard",
    icon: <Icon>dashboard</Icon>,
    route:"/dashboard",
    index:true,
    component : <Dashboard/>,
    key:'wallet',
    show: true
  },{
    name: "List Network",
    icon: <Icon>network</Icon>,
    route:"/network",
    index:true,
    component : <Network/>,
    key:'network',
    show: false
  },{
    name:'transaction',
    icon: <Icon>shopping-cart</Icon>,
    route:"/transaction",
    key:'transaction',
    show:true,
    collapse : [
      {
        index:true,
        name : 'History',
        icon : <Icon>history</Icon>,
        route : '/transaction/history',
        key : 'transaction-history',
        component : <TransactionHistory/>,
        show: false
      },{
        name:'detail',
        icon : <Icon>detail</Icon>,
        route : '/transaction/detail/:hash',
        key: 'transaction-detail',
        component : <TransactionDetail/>,
        show:false
      },{
        name : 'Send',
        icon : <Icon>send</Icon>,
        route : '/transaction/send',
        key : 'send-balance',
        component : <SendBalance/>,
        show: false
      }
    ]
  },{
    name: "WalletConnect",
    icon: <Icon>wallet</Icon>,
    route:"/dapps",
    index:true,
    component : <WC/>,
    key:'dapps',
    show: true
  }  
];

export default routes;
