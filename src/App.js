import { useEffect } from "react"

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

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>{
    const index = []
    const routes = allRoutes.map((route) => {
      if(route.index)
        index.push(<Route index element={route.component} key={route.key} />) 
      if (route.collapse) {
        return ( 
          <Route exact path={route.route} element={route.component} key={route.key} >
            {getRoutes(route.collapse)}
          </Route> 
        )
      }
      else if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    })
    return routes.concat(index)
  };

  const  routeTemp = getRoutes(routes)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout key='layout' />}>
          {routeTemp}
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
