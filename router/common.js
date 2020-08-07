const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
var { wxpay, alipay } = require("../utils/wxpay");
const { querySql, queryOne } = require("../db");
const Result = require("../utils/Result.js");

router.post("/login", (req, res, next) => {
  const body = req.body;
  // 判断注册还是登录
  let sql = `SELECT COUNT(*) as num, id as userId FROM user_infomation WHERE openid = '${body.openid}';`;
  queryOne(sql)
    .then((result) => {
      // jwt生成token
      let content = { openid: body.openid }; // 要生成token的主题信息
      let secretOrPrivateKey = "express.vip project"; // 这是加密的key（密钥） 根据个人自定义
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: "1m", // 一周过期
      });
      let { num } = result;
      results = Object.assign(result, { token: token });
      if (num) {
        new Result(results, "登录成功").success(res);
      } else {
        //注册
        let sql = `INSERT INTO user_infomation(openid, username, user_logo, sex) VALUES ('${body.openid}',
        '${body.username}', '${body.user_logo}', '${body.sex}');`;
        querySql(sql).then((result) => {
          results.userId = result.insertId;
          new Result(results, "注册成功").success(res);
        });
      }
    })
    .catch((error) => {
      new Result(error, "很遗憾，注册登录失败，请重试").fail(res);
    });
});

// 微信支付
router.post("/wxpay", (req, res) => {
  let MD5 = require("md5");
  let request = require("request");
  let xml2js = require("xml2js");
  let url = "https://api.mch.weixin.qq.com/pay/unifiedorder";
  let appid = "wxcf563ffe48508aaa"; //(appid号)
  let mchId = "1446087902"; //(商户号)
  let notifyUrl =
    "http://localhost:8015/common/receive/" +
    req.body.cardId +
    "/" +
    req.body.userId; //(支付成功微信返回的回调函数)
  let outTradeNo = req.body.outTradeNo; //（我们自己的订单号）
  let totalFee = parseFloat(req.body.money) * 100; //（这个就是钱啦，但是要注意单位是分的）
  let body = "支付"; //（这个是我们要给这个商品的介绍）
  let nonceStr = new Date().getTime(); //（这个是需要一个随机字符串）
  let tradeType = "APP"; //（我个人理解是什么支付方式）
  let stringA =
    "appid=" +
    appid +
    "&body=" +
    body +
    "&mch_id=" +
    mchId +
    "&nonce_str=" +
    nonceStr +
    "&notify_url=" +
    notifyUrl +
    "&out_trade_no=" +
    outTradeNo +
    "&total_fee=" +
    totalFee +
    "&trade_type=" +
    tradeType;
  let key = "oR1rdQtzu91MYC2mNym5wf3ODc4r9Q5U";
  let stringSignTemp = stringA + "&key=" + key;
  let sign = MD5(stringSignTemp).toUpperCase();
  const formData = `<xml><appid>${appid}</appid><body>${body}</body><mch_id>${mchId}</mch_id><nonce_str>${nonceStr}</nonce_str><notify_url>${notifyUrl}</notify_url><out_trade_no>${outTradeNo}</out_trade_no><total_fee>${totalFee}</total_fee><trade_type>${tradeType}</trade_type><sign>${sign}</sign></xml>`;
  return request(
    {
      url: url,
      method: "POST",
      body: formData,
      header: "Content-Type: text/html; charset=utf-8", //（这里有一个坑，没设置有时候会报"签名错误"）
    },
    function (err, response, body) {
      if (!err && response.statusCode === 200) {
        xml2js.parseString(body, function (err, json) {
          if (!err) {
            var result = wxpay.formMessage(json.xml);
            res.json(result);
          }
        });
      }
    }
  );
});

// 微信支付成功回调（自动）
router.post("/receive/:cardId/:userId", function (req, res) {
  var xml2js = require("xml2js");
  var xmlParser = new xml2js.Parser({
    explicitArray: false,
    ignoreAttrs: true,
  });
  xmlParser.parseString(req.body, function (err, result) {
    if (err) {
      return new Result(err, "支付失败").fail(res);
    }
    // let data = JSON.parse(JSON.stringify(result)).xml;
    // console.log(JSON.parse(JSON.stringify(result)));
    console.log(JSON.stringify(result));
    let total_fee = result.total_fee / 100;
    // 分别记录订单和支出明细和个人已购会员卡
    const sql = `INSERT INTO order_list (user_id, card_id, paymoney, order_no) VALUES
    ('${req.params.userId}', '${req.params.cardId}', '${total_fee}', '${result.out_trade_no}');
    INSERT INTO integral_detail (user_id, type, descs, integral) VALUES ('${req.params.userId}', '1', '充值', '${total_fee}');
    INSERT INTO myCard(user_id, card_id) VALUES('${req.params.userId}','${req.params.cardId}');`;
    querySql(sql)
      .then((result) => {
        new Result(result, "记录数据成功").success(res);
      })
      .catch((err) => {
        new Result(err, "记录数据失败").fail(res);
      });
  });
});

// 支付宝支付
router.get("/vipalipay",function (req, res) {
  alipay.creatOrder(req.query['userId'], req.query['price'], res);
});


// 支付宝支付回调  授权回调地址verify2
//返回 验证---------------------------------------------------
router.post('/verify', function (req, res) {
  // router.get('/return', function(req, res) {
  ///验证签名
  if (!alipay.RSAVerify(req.body)) {
      console.log('验证签名失败');
      res.end('error')
      return //验证失败 就返回
  }

  //价格 转成数字，自行打印req.body。
  const total_amount = parseInt(req.body['total_amount']);
  //订单的唯一id
  const orderId = req.body['out_trade_no'];

//-------------------------------------------------------------
  //业务逻辑
//-------------------------------------------------------------
  res.end('success');// 给支付宝返回 success    
  res.end('error');// 订单不接受，返回错误。
});


module.exports = router;
