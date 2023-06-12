const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
app.use(express.static("dist"));
const apiKey = process.env.API_KEY;

app.use(
  "/api",
  createProxyMiddleware({
    target: apiKey ? apiKey : "http://localhost:8080/",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
  })
);

app.listen(3000, function () {
  console.log("hi ghost mock-------------");
});
