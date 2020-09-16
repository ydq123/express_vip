const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const router = require("./router");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//设置允许跨域访问该服务.
app.all("*", function (req, res, next) {
 	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  	next();
});

// 路由
app.use(router);

app.listen(8015, () => {
  console.log("server is running~~");
});
