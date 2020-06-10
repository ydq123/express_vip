const express = require("express");
const router = express.Router();
const path = require("path");
const boom = require("boom");
const jwt = require("jsonwebtoken");
const user = require("./user"); // 用户
const busines = require("./busines"); // 商家
const common = require("./common"); //公共

// 校验token
// router.use((req, res, next) => {
//   let authorization = req.get("Authorization");
//   // 排除不需要授权的路由
//   if (req.path === "/common/login") {
//     next();
//   } else {
//     let secretOrPrivateKey = "express.vip project";
//     jwt.verify(authorization, secretOrPrivateKey, function (err, decode) {
//       if (err) {
//         //  认证出错
//         res.status(403).send("认证无效，请重新登录。");
//       } else {
//         console.log("完美通过");
//         next();
//       }
//     });
//   }
// });

router.use("/user", user);
router.use("/busines", busines);
router.use("/common", common);

// 托管静态文件
router.use("/public", express.static(path.join(__dirname, "../public")));


/**
 * 集中处理404请求的中间件
 * 注意：该中间件必须放在正常处理流程之后
 * 否则，会拦截正常请求
 */
router.use((req, res, next) => {
  next(boom.notFound("接口不存在"));
});

module.exports = router;
