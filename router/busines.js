const express = require("express");
const router = express.Router();
const { querySql, queryOne } = require("../db");
const Result = require("../utils/Result.js");

// 广告位轮播
router.post("/setbanner", (req, res, next) => {
  let body = req.body;
  const sql = `insert into dept_banner (user_id, dept_no, banner_url) VALUES
   ('${body.user_id}', '${body.dept_no}', '${body.banner_url}');`;
  querySql(sql)
    .then((result) => {
      new Result(result, "新增数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "新增数据失败").fail(res);
    });
});
router.get("/getbanner", (req, res, next) => {
  const query = req.query;
  if (!query.user_id || !query.dept_no) {
    new Result("用户id或商家id不能为空").fail(res);
  } else {
    const sql = `select * from dept_banner where user_id = '${query.user_id}' and 
    dept_no = '${query.dept_no}'`;
    querySql(sql)
      .then((result) => {
        new Result(result, "获取数据成功").success(res);
      })
      .catch((err) => {
        new Result(err, "获取数据失败").fail(res);
      });
  }
});
router.get("/delebanner", (req, res, next) => {
  const query = req.query;
  if (!query.id) {
    new Result("id为空").fail(res);
  } else {
    const sql = `delete from dept_banner where id = '${query.id}'`;
    querySql(sql)
      .then((result) => {
        new Result(result, "删除数据成功").success(res);
      })
      .catch((err) => {
        new Result(err, "删除数据失败").fail(res);
      });
  }
});
router.post("/updatebanner", (req, res, next) => {
  const body = req.body;
  if (!body.id) {
    new Result("id为空").fail(res);
  } else {
    const sql = `UPDATE dept_banner SET banner_url = '${body.banner_url}' where id = '${body.id}'`;
    querySql(sql)
      .then((result) => {
        new Result(result, "修改数据成功").success(res);
      })
      .catch((err) => {
        new Result(err, "修改数据失败").fail(res);
      });
  }
});

// 商家主页
router.get("/gethome", (req, res, next) => {
  const query = req.query;
  const sql = `select * from user_infomation where id = ${query.id}`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "获取数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取数据失败").fail(res);
    });
});
router.post("/updatehome", (req, res, next) => {
  const body = req.body;
  const sql = `UPDATE user_infomation SET busines_address = '${body.busines_address}',
  busines_pass = '${body.busines_pass}', busines_phone = '${body.busines_phone}',
  busines_msg = '${body.busines_msg}' where id = '${body.id}'`;
  querySql(sql)
    .then((result) => {
      new Result(result, "修改数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "修改数据失败").fail(res);
    });
});

module.exports = router;
