var xmlreader = require("xmlreader");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

var wxpay = {
  formMessage: function (result) {
    var message = {};
    if (typeof result === "object") {
      var keys = Object.keys(result);
      for (var i = 0; i < keys.length; i++) {
        var item = result[keys[i]];
        var key = keys[i];
        if (!(item instanceof Array) || item.length === 0) {
          continue;
        }
        if (item.length === 1) {
          var val = item[0];
          if (typeof val === "object") {
            message[key] = formMessage(val);
          } else {
            message[key] = (val || "").trim();
          }
        } else {
          message[key] = [];
          for (var j = 0, k = item.length; j < k; j++) {
            message[key].push(formMessage(item[j]));
          }
        }
      }
    }
    return message;
  },
};

var alipay = {
  //根据用户id 创建订单id
  creatOrder(userId, price, res) {
    //由于是iOS 或者 android 的请求，携带当前用户的唯一id和买东西的价格。

    //-------------------------------------------------------------
    //业务逻辑
    //这里数据库业务， 产生订单的唯一id和订单的时间
    //-------------------------------------------------------------
    let orderId = this.createNonceStr();
    let currenTime = this.createTimeStamp();
    //生成订单
    this.creatOrderInfo(price, orderId, currenTime, res);
  },
  // 随机字符串产生函数
  createNonceStr: function () {
    return Math.random().toString(36).substr(2, 15);
  },

  // 时间戳产生函数
  createTimeStamp: function () {
    return parseInt(new Date().getTime() / 1000) + "";
  },

  //根据唯一ID创建，价格，时间，生成订单对象
  creatOrderInfo(price, orderId, currenTime, res) {
    const biz_content = {
      timeout_express: "30m", //超时时间
      seller_id: "20884228000000000", // 卖家支付宝用户号
      product_code: "QUICK_MSECURITY_PAY",
      total_amount: price + "", //价格
      subject: "vip", //介绍
      body: "vip", //详情介绍
      out_trade_no: orderId, //订单的唯一id,
    };

    const jsonBiz_content = JSON.stringify(biz_content); //JSON

    const orderInfo = {
      app_id: "2021001169612008", //支付宝分配给开发者的应用Id
      biz_content: jsonBiz_content, //订单基础信息
      charset: "utf-8",
      method: "alipay.trade.app.pay", //支付接口名称
      notify_url: "http://localhost:8015/common/verify", //自己设置异步回调接口
      sign_type: "RSA",
      timestamp: currenTime, //时间
      version: "1.0",
    };

    //拼接未加密的订单，由于我上面的订单就是根据key排序写的，所以不需要根据key排序了。
    const info = this.generateOrder(orderInfo, false);

    //RSA加密订单
    const sign = crypto.createSign("RSA-SHA1");
    // const private_key = fs.readFileSync("./rsa_private_key_pkcs8.pem"); //注意生成的密钥，是带数字8的。
    const private_key = fs.readFileSync(
      path.join(__dirname, "./rsa_private_key_pkcs8.pem")
    ); //注意生成的密钥，是带数字8的。
    sign.update(info, "utf8"); //设置验证签名参数
    const signOrder = encodeURIComponent(sign.sign(private_key, "base64")); //RSA加密后  在encoded

    //----------------------------------------------------------------------
    //拼接订单encode
    const encodeOrder = this.generateOrder(orderInfo, true);
    const infoReturn = {
      order: encodeOrder + "&sign=" + signOrder,
    };
    //返回JSON数据
    res.json(JSON.stringify(infoReturn));
  },

  //字符串拼接生成订单,是否encode转义
  generateOrder(orderInfo, encode) {
    let info = "";
    for (let key in orderInfo) {
      let orderInfoValue = orderInfo[key];

      if (encode) {
        //把value 转义encodeURI
        orderInfoValue = encodeURIComponent(orderInfoValue);
      }
      //拼接参数
      info += key + "=" + orderInfoValue + "&";
    }

    //删除最后一个&
    return info.substring(0, info.length - 1);
  },
  //验证签名
  RSAVerify(object) {
    let obj = {};
    let keys = Object.keys(object).sort(); //排序
    let prestr = [];
    //去掉 sign与sign_type，装进数组
    keys.forEach(function (e) {
      if (e != "sign" && e != "sign_type" && (object[e] || object[e] === 0)) {
        prestr.push(`${e}=${object[e]}`);
      }
    });
    //拼接
    prestr = prestr.join("&");
    //根据排序后的订单验签名
    return crypto
      .createVerify("RSA-SHA1")
      .update(prestr)
      .verify(
        fs.readFileSync("./rsa_public_key.pem"),
        object["sign"],
        "base64"
      ); //注意这个公钥是支付宝给的，并不是自己生成的。
  },
};

module.exports = {
  wxpay,
  alipay,
};
