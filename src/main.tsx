import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import App from "./App";
import "antd/dist/reset.css"
import store from "./redux/store";
import { Provider } from "react-redux"; // or 'antd/dist/antd.less'
// import "codemirror/lib/codemirror.css";
// import "codemirror/mode/javascript/javascript.js";
// import "codemirror/mode/python/python.js";
// import "codemirror/theme/darcula.css";
import * as echarts from "echarts";
window.echarts = echarts;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
