const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const router = require("./router");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//设置允许跨域访问该服务.
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Methods", "*");
  // res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// 路由
app.use(router);

app.listen(8015, () => {
  console.log("server is running~~");
});
