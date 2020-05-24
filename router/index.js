const express = require("express");
const router = express.Router();
const boom = require("boom");
const user = require("./user"); // 用户
const busines = require("./busines"); // 商家
const common = require("./common");
 
router.use("/user", user);
router.use("/busines", busines);
router.use("/common", common);

/**
 * 集中处理404请求的中间件
 * 注意：该中间件必须放在正常处理流程之后
 * 否则，会拦截正常请求
 */
// router.use((req, res, next) => {
//   next(boom.notFound("接口不存在"));
// });

module.exports = router;
