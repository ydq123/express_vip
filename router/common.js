const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { querySql } = require("../db");
const Result = require("../utils/Result.js");

var storge = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/image");
  },
  filename: function (req, file, cb) {
    var fileformat = file.originalname.split(".");
    cb(
      null,
      fileformat[0] + "-" + Date.now() + "." + fileformat[fileformat.length - 1]
    );
  },
});
var upload = multer({ storage: storge }); // 文件储存路径
// 文件上传
router.post("/upload", upload.single("avatar"), (req, res, next) => {
  let body = req.body;
  let file = req.file;
  let banner_img = path.resolve("./", file.path).replace(/\\/g, "/");
  if (body.type == 1) {
    if (!body.user_id || !body.dept_no) {
      new Result("用户id或商家id不能为空").fail(res);
      return;
    }
    // 轮播图
    if (body.id) {
      const sql = `UPDATE dept_banner SET banner_img = '${banner_img}' WHERE id = '${body.id}'`;
      querySql(sql)
        .then((result) => {
          new Result(result, "修改成功").success(res);
        })
        .catch((err) => {
          new Result(err, "修改失败").fail(res);
        });
    } else {
      const sql = `insert into dept_banner (user_id, dept_no, banner_img)
    VALUES ('${body.user_id}', '${body.dept_no}', '${banner_img}');`;
      querySql(sql)
        .then((result) => {
          new Result(result, "上传成功").success(res);
        })
        .catch((err) => {
          new Result(err, "上传失败").fail(res);
        });
    }
  } else if (body.type == 2) {
    const sql = `UPDATE user_infomation SET busines_bg = '${banner_img}' WHERE id = '${body.id}'`;
    querySql(sql)
      .then((result) => {
        new Result(result, "修改成功").success(res);
      })
      .catch((err) => {
        new Result(err, "修改失败").fail(res);
      });
  }
});

module.exports = router;
