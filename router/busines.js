const express = require("express");
const router = express.Router();
const multer = require("multer");
const { querySql, queryOne } = require("../db");
const Result = require("../utils/Result.js");
const { serverIp, upload } = require("../conf");

// 广告位轮播
router.post("/setbanner", upload.single("avatar"), (req, res, next) => {
  let body = req.body;
  let file = req.file;
  let banner_img = serverIp + file.path.replace(/\\/g, "/");
  const sql = `insert into dept_banner (user_id, banner_url, banner_img) VALUES
   ('${body.user_id}', '${body.banner_url}', '${banner_img}');`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "新增数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "新增数据失败").fail(res);
    });
});
router.post("/updatebanner", upload.single("avatar"), (req, res, next) => {
  const body = req.body;
  let file = req.file;
  let banner_img = serverIp + file.path.replace(/\\/g, "/");
  if (!body.id || !body.user_id) {
    new Result("数据id或用户id为空").fail(res);
  } else {
    const sql = `UPDATE dept_banner SET banner_url = '${body.banner_url}',
    banner_img = '${banner_img}' where id = '${body.id}' and user_id = ${body.user_id}`;
    queryOne(sql)
      .then((result) => {
        new Result(result, "修改数据成功").success(res);
      })
      .catch((err) => {
        new Result(err, "修改数据失败").fail(res);
      });
  }
});
router.get("/getbanner", (req, res, next) => {
  const query = req.query;
  const sql = `select * from dept_banner where user_id = '${query.user_id}'`;
  querySql(sql)
    .then((result) => {
      new Result(result, "获取数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取数据失败").fail(res);
    });
});
router.get("/delebanner", (req, res, next) => {
  const query = req.query;
  if (!query.id || !query.user_id) {
    new Result("数据id或用户id为空").fail(res);
  } else {
    const sql = `delete from dept_banner where id = '${query.id}' and user_id = ${query.user_id}`;
    queryOne(sql)
      .then((result) => {
        new Result(result, "删除数据成功").success(res);
      })
      .catch((err) => {
        new Result(err, "删除数据失败").fail(res);
      });
  }
});

// 商家主页
router.get("/gethome", (req, res, next) => {
  const query = req.query;
  const sql = `select id, isbusines, busines_bg, busines_pass, busines_phone, busines_address
  busines_msg from user_infomation where id = ${query.id}`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "获取数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取数据失败").fail(res);
    });
});
router.post("/updatehome", upload.single("avatar"), (req, res, next2) => {
  const body = req.body;
  let file = req.file;
  let img = serverIp + file.path.replace(/\\/g, "/");
  const sql = `UPDATE user_infomation SET busines_address = '${body.busines_address}',
  busines_pass = '${body.busines_pass}', busines_phone = '${body.busines_phone}',
  busines_msg = '${body.busines_msg}', busines_bg = '${img}' where id = '${body.id}'`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "修改数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "修改数据失败").fail(res);
    });
});

// 会员卡
router.get("/getcard", (req, res, next) => {
  const query = req.query;
  let idsql = "";
  if (query.id) {
    idsql = `AND m.id = ${query.id}`;
  }
  const sql = `select m.*, m2.class_name, m2.class_price from member_card m JOIN 
  member_card_class m2 on m.card_class_id = m2.id where m.user_id = ${query.user_id} ${idsql}`;
  querySql(sql)
    .then((result) => {
      new Result(result, "获取数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取数据失败").fail(res);
    });
});
router.post("/addcard", upload.single("avatar"), (req, res, next) => {
  let body = req.body;
  let file = req.file;
  let img = serverIp + file.path.replace(/\\/g, "/");
  const sql = `INSERT INTO member_card (user_id, card_name, card_bg_url, card_type, 
    card_class_id) VALUES ('${body.user_id}', '${body.card_name}', '${img}', '${body.card_type}', 
    '${body.card_class_id}');`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "新增数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "新增数据失败").fail(res);
    });
});
router.get("/delecard", (req, res, next) => {
  const query = req.query;
  const sql = `delete from member_card where id = ${query.id}`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "删除数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "删除数据失败").fail(res);
    });
});
router.post("/updatecard", upload.single("avatar"), (req, res, next) => {
  const body = req.body;
  let file = req.file;
  let img = serverIp + file.path.replace(/\\/g, "/");
  const sql = `UPDATE member_card SET card_name = '${body.card_name}', card_type = '${body.card_type}'
  , card_class_id = '${body.card_class_id}', card_bg_url = '${img}' where id = '${body.id}'`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "修改数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "修改数据失败").fail(res);
    });
});

// 会员分类管理
// 列表
router.get("/getclasscard", (req, res, next) => {
  const query = req.query;
  let idsql = "";
  if (query.id) {
    idsql = `AND id = ${query.id}`;
  }
  const sql = `select * from member_card_class where user_id = ${query.user_id} ${idsql}`;
  querySql(sql)
    .then((result) => {
      new Result(result, "获取数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取数据失败").fail(res);
    });
});
// 新增
router.post("/addclasscard", (req, res, next) => {
  let body = req.body;
  const sql = `INSERT INTO member_card_class (user_id, class_name, class_price, use_count_week,
    classify, classify_start_date, classify_end_date, use_count,isGive, card_integral, 
    card_money, card_course) VALUES ('${body.user_id}', '${body.class_name}', '${body.class_price}',
    '${body.use_count_week}', '${body.classify}', '${body.classify_start_date}', 
    '${body.classify_end_date}', '${body.use_count}', '${body.isGive}', '${body.card_integral}',
    '${body.card_money}', '${body.card_course}');`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "新增数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "新增数据失败").fail(res);
    });
});
// 删除
router.get("/deleclasscard", (req, res, next) => {
  const query = req.query;
  const sql = `delete from member_card_class where id = ${query.id}`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "删除数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "删除数据失败").fail(res);
    });
});
// 修改
router.post("/updateclasscard", (req, res, next) => {
  const body = req.body;
  const sql = `UPDATE member_card_class SET class_name = '${body.class_name}', 
  class_price = '${body.class_price}', use_count_week = '${body.use_count_week}', 
  classify = '${body.classify}', classify_start_date = '${body.classify_start_date}', 
  classify_end_date = '${body.classify_end_date}', use_count = '${body.use_count}', 
  card_integral = '${body.card_integral}', isGive = '${body.isGive}', 
  card_money = '${body.card_money}', card_course = '${body.card_course}' where id = '${body.id}'`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "修改数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "修改数据失败").fail(res);
    });
});

// 分店管理
router.get("/get_dept", (req, res, next) => {
  const query = req.query;
  const sql = `select * from dept_manage where user_id = ${query.user_id}`;
  querySql(sql)
    .then((result) => {
      new Result(result, "获取数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取数据失败").fail(res);
    });
});
router.post("/add_dept", (req, res, next) => {
  let body = req.body;
  const sql = `INSERT INTO dept_manage (user_id, dept_name) 
  VALUES ('${body.user_id}', '${body.dept_name}');`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "新增数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "新增数据失败").fail(res);
    });
});
router.get("/delete_dept", (req, res, next) => {
  const query = req.query;
  const sql = `delete from dept_manage where id = ${query.id}`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "删除数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "删除数据失败").fail(res);
    });
});
router.post("/update_dept", (req, res, next) => {
  const body = req.body;
  const sql = `UPDATE dept_manage SET dept_name = '${body.dept_name}' where id = '${body.id}'`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "修改数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "修改数据失败").fail(res);
    });
});

// 课程管理
router.get("/getcourse", (req, res, next) => {
  const query = req.query;
  const condition = query.date
    ? `and c.course_date like '%${query.date}%'`
    : "";
  const sql = `select c.id, c.user_id, c.course_name, c.course_img, c.course_tearch, 
  c.course_start_date, c.count_people, c.address, c.msg, c.course_date, c.course_end_date, 
  t.user_id as list_user_id, t.courses_id as courses_id, t.type as type, t.id as apponint_id 
  from courses c left join courses_appointment t on c.id = t.courses_id where c.user_id 
  = '${query.user_id}' ${condition};`;
  console.log(sql);
  querySql(sql)
    .then((result) => {
      new Result(result, "获取数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取数据失败").fail(res);
    });
});
router.post("/addcourse", upload.single("avatar"), (req, res, next) => {
  let body = req.body;
  let file = req.file;
  let img = serverIp + file.path.replace(/\\/g, "/");
  const sql = `INSERT INTO courses (user_id, course_name, course_img, course_tearch, 
  course_start_date, course_end_date, course_date, count_people, address, msg) 
  VALUES ('${body.user_id}', '${body.course_name}', '${img}', '${body.course_tearch}',
  '${body.course_start_date}', '${body.course_end_date}', '${body.course_date}', '${body.count_people}', 
  '${body.address}', '${body.msg}');`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "新增数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "新增数据失败").fail(res);
    });
});
router.get("/delecourse", (req, res, next) => {
  const query = req.query;
  const sql = `delete from courses where id = ${query.id}`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "删除数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "删除数据失败").fail(res);
    });
});
router.post("/updatecourse", upload.single("avatar"), (req, res, next) => {
  const body = req.body;
  let file = req.file;
  let img = serverIp + file.path.replace(/\\/g, "/");
  const sql = `UPDATE courses SET course_name = '${body.course_name}',
  course_img = '${img}', course_tearch = '${body.course_tearch}', msg = '${body.msg}',
  course_start_date = '${body.course_start_date}', course_end_date = '${body.course_end_date}', 
  count_people = '${body.count_people}', course_date = '${body.course_date}', 
  address = '${body.address}' where id = '${body.id}'`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "修改数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "修改数据失败").fail(res);
    });
});

// 作品管理
router.post("/add_work", upload.single("avatar"), (req, res, next) => {
  let body = req.body;
  let file = req.file;
  let video = serverIp + file.path.replace(/\\/g, "/");
  const sql = `INSERT INTO works (user_id,work_title, work_url) VALUES ('${body.user_id}',
  '${body.work_title}', '${video}');`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "新增数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "新增数据失败").fail(res);
    });
});
router.get("/get_work", (req, res, next) => {
  const query = req.query;
  const sql = `select * from works where user_id = ${query.user_id}`;
  querySql(sql)
    .then((result) => {
      new Result(result, "获取数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取数据失败").fail(res);
    });
});
router.get("/dele_work", (req, res, next) => {
  const query = req.query;
  const sql = `delete from works where id = ${query.id}`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "删除数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "删除数据失败").fail(res);
    });
});
// 设置作品热门
router.get("/setHot", (req, res, next) => {
  const query = req.query;
  const sql = `update works SET isHot='${query.isHot}' where id = ${query.id}`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "修改数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "修改数据失败").fail(res);
    });
});
// 发布评论
router.post("/makeComment", (req, res, next) => {
  const body = req.body;
  const sql = `insert into works_comment (works_id, comment_id, comment_content) values
  ('${body.works_id}','${body.comment_id}','${body.comment_content}')`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "新增数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "新增数据失败").fail(res);
    });
});
// 获取评论列表
router.get("/getComment", (req, res, next) => {
  const query = req.query;
  const sql = `select * from works_comment where works_id = ${query.works_id}`;
  querySql(sql)
    .then((result) => {
      new Result(result, "获取数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取数据失败").fail(res);
    });
});

// 活动管理
router.post("/add_activity", upload.single("avatar"), (req, res, next) => {
  let body = req.body;
  let file = req.file;
  let img = serverIp + file.path.replace(/\\/g, "/");
  const sql = `INSERT INTO activitys (user_id, activity_img,activity_title, activity_content) VALUES 
  ('${body.user_id}', '${img}','${body.activity_title}', '${body.activity_content}');`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "新增数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "新增数据失败").fail(res);
    });
});
// 活动列表
router.get("/get_activity", (req, res, next) => {
  const query = req.query;
  const sql = `select activitys.*,(select count(activitys_join.activitys_id) from 
  activitys_join where activitys.id=activitys_join.activitys_id) join_num from activitys 
  WHERE user_id =  ${query.user_id}`;
  querySql(sql)
    .then((result) => {
      new Result(result, "获取数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取数据失败").fail(res);
    });
});
router.get("/dele_activity", (req, res, next) => {
  const query = req.query;
  const sql = `delete from activitys where id = ${query.id}`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "删除数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "删除数据失败").fail(res);
    });
});
// 设置活动热门
router.get("/setHot_activity", (req, res, next) => {
  const query = req.query;
  const sql = `update activitys SET isHot='${query.isHot}' where id = ${query.id}`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "修改数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "修改数据失败").fail(res);
    });
});
// 活动-发布评论
router.post("/makeComment_activity", (req, res, next) => {
  const body = req.body;
  const sql = `insert into activitys_comment (activitys_id, comment_id, comment_content) values
  ('${body.activitys_id}','${body.comment_id}','${body.comment_content}')`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "新增数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "新增数据失败").fail(res);
    });
});
// 活动-获取评论列表
router.get("/getComment_activity", (req, res, next) => {
  const query = req.query;
  const sql = `select * from activitys_comment where activitys_id = ${query.activitys_id}`;
  querySql(sql)
    .then((result) => {
      new Result(result, "获取数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取数据失败").fail(res);
    });
});
// 参与活动
router.post("/join_activity", (req, res, next) => {
  const body = req.body;
  const sql = `insert into activitys_join (user_id, activitys_id) SELECT '${body.user_id}',
  '${body.activitys_id}' WHERE NOT EXISTS (SELECT user_id, activitys_id FROM 
    activitys_join WHERE user_id = '${body.user_id}' and activitys_id = '${body.activitys_id}')`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "参加成功").success(res);
    })
    .catch((err) => {
      new Result(err, "参加失败").fail(res);
    });
});
// 活动-参与活动的人员
router.get("/join_people", (req, res, next) => {
  const query = req.query;
  const sql = `SELECT u.id, u.sex, u.style_msg, u.username, u.user_home_bg FROM user_infomation
   u JOIN activitys_join a on a.user_id = u.id WHERE a.activitys_id = ${query.activitys_id}`;
  querySql(sql)
    .then((result) => {
      new Result(result, "获取数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取数据失败").fail(res);
    });
});

module.exports = router;
