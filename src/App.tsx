import React, { useState, useEffect } from "react";
import logo from "./assets/img/logo.svg";
import "./assets/css/App.css";

import { Button } from "antd";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./routers/index";
import MainBox from "./components/MainBox";
import Login from "./pages/User/Login";
import { SSOLogin, getUrlKey } from "./utils/util";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // if (!localStorage.getItem("Access-Token")) {
    //   const ticket = getUrlKey("ticket", window.location.href);
    //   if (ticket) {
    //     SSOLogin(ticket).then(() => {
    //       const href = window.location.href
    //         .split("&ticket=")[0]
    //         .split("?ticket=")[0];
    //       window.location.replace(href);
    //       // window.location.reload();
    //     });
    //   } else {
    //     window.console.log("准备跳转登陆地址");
    //     const loginUrl = `https://cas.ctripcorp.com/caso/login?service=${encodeURIComponent(
    //       window.location.href
    //     )}`;
    //     window.location.replace(loginUrl);
    //   }
    // }
  }, []);
  return (
    <div className="App">
      <HashRouter>
        {/* renderRoutes(routes)会把routers作为props传入到Home组件中 */}
        {renderRoutes(routes)}
      </HashRouter>
    </div>
  );
}

export default App;
