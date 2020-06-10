const express = require("express");
const router = express.Router();
const request = require("request");
const jwt = require("jsonwebtoken");
var wxpay = require("../utils/wxpay");
var xmlreader = require("xmlreader");
const { querySql, queryOne } = require("../db");
const Result = require("../utils/Result.js");

router.post("/login", (req, res, next) => {
  const body = req.body;
  // 判断注册还是登录
  let sql = `SELECT COUNT(*) as num FROM user_infomation WHERE openid = ${body.openid};`;
  queryOne(sql)
    .then((result) => {
      // jwt生成token
      let content = { openid: body.openid }; // 要生成token的主题信息
      let secretOrPrivateKey = "express.vip project"; // 这是加密的key（密钥） 根据个人自定义
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: "1m", // 一周过期
      });
      let num = result.num;
      if (num) {
        res.json({ code: 1, message: "登陆成功", token: token });
      } else {
        //注册
        let sql = `INSERT INTO user_infomation(openid, username, user_logo, sex) VALUES ('${body.openid}',
        '${body.username}', '${body.user_logo}', '${body.sex}');`;
        queryOne(sql).then((result) => {
          res.json({ code: 1, message: "注册成功", token: token });
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/wxpay", (req, res) => {
  var appid = "wx09a524e3258350da";
  var appsecret = "4f136e756d7a61680e6fc8134025ee3e";
  var mchid = "1446087902"; //商户号
  var mchkey = "8r435jVd7yA0354nsvkxb4cN3x7Se4322"; //密钥
  var wxurl = "http://XXXXXXXXX/weixinNotify.action";

  // 前端传过来的参数
  let orderCode = req.query.orderCode;
  let money = req.query.money;
  let orderID = req.query.orderID;
  console.log(
    "APP传过来的参数是",
    orderCode +
      "----" +
      money +
      "------" +
      orderID +
      "----" +
      appid +
      "-----" +
      appsecret +
      "-----" +
      mchid +
      "-----" +
      mchkey
  );
  //首先生成签名sign
  let mch_id = mchid;
  let nonce_str = wxpay.createNonceStr();
  let timestamp = wxpay.createTimeStamp();
  let body = "微信支付";
  let out_trade_no = orderCode;
  let total_fee = wxpay.getmoney(money);
  let spbill_create_ip = req.connection.remoteAddress;
  let notify_url = wxurl;
  let trade_type = "APP";
  let sign = wxpay.paysignjsapi(
    appid,
    body,
    mch_id,
    nonce_str,
    notify_url,
    out_trade_no,
    spbill_create_ip,
    total_fee,
    trade_type,
    mchkey
  );
  //组装xml数据
  var formData = "<xml>";
  formData += "<appid>" + appid + "</appid>"; //appid
  formData += "<body><![CDATA[" + "测试微信支付" + "]]></body>";
  formData += "<mch_id>" + mch_id + "</mch_id>"; //商户号
  formData += "<nonce_str>" + nonce_str + "</nonce_str>"; //随机字符串，不长于32位。
  formData += "<notify_url>" + notify_url + "</notify_url>";
  formData += "<out_trade_no>" + out_trade_no + "</out_trade_no>";
  formData += "<spbill_create_ip>" + spbill_create_ip + "</spbill_create_ip>";
  formData += "<total_fee>" + total_fee + "</total_fee>";
  formData += "<trade_type>" + trade_type + "</trade_type>";
  formData += "<sign>" + sign + "</sign>";
  formData += "</xml>";
  console.log("formData===", formData);
  var url = "https://api.mch.weixin.qq.com/pay/unifiedorder";
  request({ url: url, method: "POST", body: formData }, function (
    err,
    response,
    body
  ) {
    if (!err && response.statusCode == 200) {
      console.log(body);
      xmlreader.read(body.toString("utf-8"), function (errors, response) {
        if (null !== errors) {
          console.log(errors);
          return;
        }
        console.log("长度===", response.xml.prepay_id.text().length);
        var prepay_id = response.xml.prepay_id.text();
        console.log("解析后的prepay_id==", prepay_id);
        //将预支付订单和其他信息一起签名后返回给前端
        let finalsign = wxpay.paysignjsapifinal(
          appid,
          mch_id,
          prepay_id,
          nonce_str,
          timestamp,
          mchkey
        );
        res.json({
          appId: appid,
          partnerId: mchid,
          prepayId: prepay_id,
          nonceStr: nonce_str,
          timeStamp: timestamp,
          package: "Sign=WXPay",
          sign: finalsign,
        });
      });
    }
  });
});

module.exports = router;
