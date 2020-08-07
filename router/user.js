const express = require("express");
const router = express.Router();
const multer = require("multer");
const { querySql, queryOne } = require("../db");
const Result = require("../utils/Result.js");
const request = require("request");

const storge = multer.diskStorage({
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
// 关注的品牌工作室
router.get("/focus", (req, res, next) => {
  const query = req.query;
  let [namesql, type] = ['', ''];
  if (query.busines_name) {
    namesql = `AND info.busines_name like '%${query.busines_name}%'`;
  }
  const sql = `SELECT info.id, info.busines_logo, info.busines_name, info.busines_pass, focus.type, focus.id focusId 
  FROM user_infomation info JOIN user_focus_dept focus ON focus.dept_no = info.id AND focus.type = '1' ${namesql};`;
  querySql(sql)
    .then((result) => {
      new Result(result, "获取数据成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取数据失败").fail(res);
    });
});
// 关注/取消关注工作室
router.post("/focus_dept", (req, res, next) => {
  const body = req.body;
  let sql = "";
  if (!body.focusId) {
    sql = `insert into user_focus_dept (user_id, dept_no, type) SELECT '${body.user_id}',
  '${body.dept_no}','${body.type}' WHERE NOT EXISTS (SELECT user_id, dept_no FROM 
    user_focus_dept WHERE user_id = '${body.user_id}' and dept_no = '${body.dept_no}')`;
  } else {
    sql = `UPDATE user_focus_dept SET type = '${body.type}' WHERE user_id = '${body.user_id}'
     and dept_no = '${body.dept_no}'`;
  }
  queryOne(sql)
    .then((result) => {
      new Result(result, "操作成功").success(res);
    })
    .catch((err) => {
      new Result(err, "操作失败").fail(res);
    });
});
// 搜索工作室
router.post("/search_dept", (req, res, next) => {
  const body = req.body;
  const sql = `select info.id, info.busines_logo, info.busines_name, info.busines_pass,dept.type from 
  user_infomation info left join user_focus_dept dept on info.id=dept.user_id WHERE
  info.busines_name like '%${body.busines_name}%' group by info.busines_name;`;
  querySql(sql)
    .then((result) => {
      new Result(result, "搜索成功").success(res);
    })
    .catch((err) => {
      new Result(err, "搜索失败").fail(res);
    });
});

// 获取消息列表
router.get("/msglist", (req, res, next) => {
  const query = req.query;
  let str = "";
  if (query.type) {
    str = `AND type = '${query.type}'`;
  }
  const sql = `select * from notice_news WHERE user_id = '${query.user_id}' ${str};`;
  querySql(sql)
    .then((result) => {
      new Result(result, "成功").success(res);
    })
    .catch((err) => {
      new Result(err, "失败").fail(res);
    });
});
// 删除消息
router.get("/deletemsg", (req, res, next) => {
  const query = req.query;
  const sql = `delete from notice_news where id = '${query.id}';`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "删除成功").success(res);
    })
    .catch((err) => {
      new Result(err, "删除失败").fail(res);
    });
});
// 消息已读
router.post("/reads", (req, res, next) => {
  const body = req.body;
  const sql = `UPDATE notice_news SET isRead = '1' where id = '${body.id}';`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "成功").success(res);
    })
    .catch((err) => {
      new Result(err, "失败").fail(res);
    });
});

// 申请入住
router.post("/apply_dept", upload.array("avatar"), (req, res, next) => {
  const body = req.body;
  console.log(JSON.stringify(body));
  let files = req.files.file;
  let logo = files[0].path.replace(/\\/g, "/");
  let license = files[1].path.replace(/\\/g, "/");
  const sql = `UPDATE user_infomation SET busines_logo = '${logo}', busines_name = '${body.busines_name}',
  busines_address = '${body.busines_address}', busines_people = '${body.busines_people}', 
  busines_phone = '${body.busines_phone}', license = '${license}' where id = '${body.user_id}';`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "申请成功").success(res);
    })
    .catch((err) => {
      new Result(err, "申请失败").fail(res);
    });
});

// 预约课程
router.post("/appointment", (req, res, next) => {
  const body = req.body;
  const sql = `INSERT INTO courses_appointment (user_id, courses_id, type, qrcode) SELECT '${body.user_id}',
  '${body.courses_id}', '1', UUID() WHERE NOT EXISTS (SELECT user_id, courses_id FROM 
    courses_appointment WHERE user_id = '${body.user_id}' and courses_id = '${body.courses_id}');`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "预约成功").success(res);
    })
    .catch((err) => {
      new Result(err, "预约失败").fail(res);
    });
});
// 取消预约课程
router.post("/cancelappointment", (req, res, next) => {
  const body = req.body;
  const sql = `delete from courses_appointment where id = '${body.apponint_id}';`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "取消预约成功").success(res);
    })
    .catch((err) => {
      new Result(err, "取消预约失败").fail(res);
    });
});
// 约课记录
router.get("/appointment_list", (req, res, next) => {
  const query = req.query;
  const sql = `select c.id, c.user_id, c.course_name, c.course_img, c.course_tearch,
  c.course_start_date, c.count_people, c.address, c.msg, c.course_date, c.course_end_date,
  t.user_id as list_user_id, t.courses_id as courses_id, t.type as type, t.id as apponint_id,
  t.qrcode as qrcode from courses c join courses_appointment t on c.id = t.courses_id where c.user_id
  = '${query.user_id}';`;
  querySql(sql)
    .then((result) => {
      new Result(result, "查询成功").success(res);
    })
    .catch((err) => {
      new Result(err, "查询失败").fail(res);
    });
});
// 扫描二维码验证
router.post("/verification_qrcode", (req, res, next) => {
  const body = req.body;
  const sql = `UPDATE courses_appointment SET qrcode = '' where id = '${body.id}';`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "二维码验证成功").success(res);
    })
    .catch((err) => {
      new Result(err, "二维码验证失败").fail(res);
    });
});

// 获取当前用户关注的人
// select people_id from user_focus_user WHERE user_id = 1; --1关注的人
// select user_id  from user_focus_user WHERE people_id = 1; --1的粉丝
router.get("/get_follow", (req, res, next) => {
  const query = req.query;
  const sql = `SELECT id, username, sex, birth, style_msg, realname, tel, isbusines, busines_bg,
  busines_pass, busines_phone, busines_address, busines_msg, card_msg, courses_msg, busines_logo,
  busines_name, busines_people, license, user_home_bg, user_star, user_logo from user_infomation u join (select people_id from 
    user_focus_user WHERE user_id = '${query.user_id}') t on u.id = t.people_id;`;
  querySql(sql)
    .then((result) => {
      new Result(result, "查询成功").success(res);
    })
    .catch((err) => {
      new Result(err, "查询失败").fail(res);
    });
});
// 获取关注当前用户的人(自己的粉丝)
router.get("/get_fans", (req, res, next) => {
  const query = req.query;
  const sql = `SELECT id, username, sex, birth, style_msg, realname, tel, isbusines, busines_bg,
  busines_pass, busines_phone, busines_address, busines_msg, card_msg, courses_msg, busines_logo,
  busines_name, busines_people, license, user_home_bg, user_star, user_logo from user_infomation u join
  (select user_id  from user_focus_user WHERE people_id = '${query.user_id}') t on u.id = t.user_id;`;
  querySql(sql)
    .then((result) => {
      new Result(result, "查询成功").success(res);
    })
    .catch((err) => {
      new Result(err, "查询失败").fail(res);
    });
});
// A关注B
router.post("/follow", (req, res, next) => {
  const body = req.body;
  const sql = `INSERT INTO user_focus_user (user_id, people_id) VALUES ('${body.user_id}',
   '${body.people_id}');`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "关注成功").success(res);
    })
    .catch((err) => {
      new Result(err, "关注失败").fail(res);
    });
});
// A点赞B
router.post("/thumbs_up", (req, res, next) => {
  const body = req.body;
  const sql = `INSERT INTO user_thumbs_up (user_id, people_id) VALUES ('${body.user_id}',
   '${body.people_id}');`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "点赞成功").success(res);
    })
    .catch((err) => {
      new Result(err, "点赞失败").fail(res);
    });
});

// 用户主页相关信息
router.get("/get_hone_date", (req, res, next) => {
  const query = req.query;
  const sql = `SELECT id, username, sex, birth, style_msg, realname, tel, isbusines, busines_bg,
  busines_pass, busines_phone, busines_address, busines_msg, card_msg, courses_msg, busines_logo,
  busines_name, busines_people, license, user_home_bg, user_star, user_logo, integral
   FROM user_infomation WHERE id ='${query.user_id}';
  SELECT count(*) thumbs_up_num FROM user_thumbs_up WHERE people_id = '${query.user_id}';
  SELECT count(*) focus_num FROM user_focus_user WHERE user_id = '${query.user_id}';
  SELECT count(*) fans_num FROM user_focus_user WHERE people_id = '${query.user_id}';`;
  querySql(sql)
    .then((result) => {
      result = {
        data: result[0],
        thumbs_up_num: result[1][0].thumbs_up_num, //点赞次数
        focus_num: result[2][0].focus_num, //关注人数
        fans_num: result[3][0].fans_num, // 粉丝人数
      };
      new Result(result, "查询成功").success(res);
    })
    .catch((err) => {
      new Result(err, "查询失败").fail(res);
    });
});

// 获取商家主页信息
router.get("/busines_info", (req, res, next) => {
  const query = req.query;
  const sql = `SELECT u.id, u.username, u.sex, u.birth, u.style_msg, u.realname, u.tel, u.isbusines,
  u.busines_bg, u.busines_pass, u.busines_phone, u.busines_address, u.busines_msg, u.card_msg, 
  u.courses_msg, u.busines_logo, u.busines_name, u.busines_people, u.license, u.user_home_bg, 
  u.user_star, u.user_logo, u.integral from user_infomation u JOIN (SELECT user_id, count(*) as focus_num 
  FROM user_focus_dept WHERE dept_no = ${query.user_id} AND type = '1') t on t.user_id = u.id;`;
  querySql(sql)
    .then((result) => {
      new Result(result, "获取成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取失败").fail(res);
    });
});
// 用户编辑资料
router.post("/updata_infomation", upload.single("avatar"), (req, res, next) => {
  const body = req.body;
  const search_sql = `SELECT count(*) as num FROM user_infomation WHERE id = '${body.user_id}';`;
  queryOne(search_sql)
    .then((result) => {
      let num = result.num;
      if (num == 0) {
        return new Result("该用户不存在，请确认后再试").fail(res);
      } else {
        let file = req.file;
        let img = file.path.replace(/\\/g, "/");
        const sql = `UPDATE user_infomation SET user_logo = '${img}', username = '${body.username}',
    birth = '${body.birth}', style_msg = '${body.style_msg}', realname = '${body.realname}',
    tel = '${body.tel}',sex = '${body.sex}' where id = '${body.user_id}'`;
        queryOne(sql)
          .then((result) => {
            new Result(result, "保存资料成功").success(res);
          })
          .catch((err) => {
            new Result(err, "保存资料失败").fail(res);
          });
      }
    })
    .catch((err) => {
      new Result(err, "请求错误，请稍后再试").fail(res);
    });
});

// 打卡
router.post("/clock", (req, res, next) => {
  const body = req.body;
  const sql = `INSERT INTO clock_list (user_id, clock_type, clock_time) VALUES 
  ('${body.user_id}', '${body.clock_type}', '${body.clock_time}');`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "打卡成功").success(res);
    })
    .catch((err) => {
      new Result(err, "打卡失败").fail(res);
    });
});

// 打卡记录
router.get("/get_clock", (req, res, next) => {
  const query = req.query;
  const sql = `SELECT * FROM clock_list WHERE user_id  = ${query.user_id}`;
  querySql(sql)
    .then((result) => {
      new Result(result, "获取成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取失败").fail(res);
    });
});

// 支付订单
router.get("/order_list", (req, res, next) => {
  const query = req.query;
  const sql = `SELECT o.*,m.card_name, m.card_bg_url, u.busines_name, 
  u.busines_logo FROM order_list o join member_card m join user_infomation u on m.id = 
  o.card_id AND o.user_id = u.id  WHERE o.user_id = ${query.user_id} ;`;
  querySql(sql)
    .then((result) => {
      new Result(result, "获取成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取失败").fail(res);
    });
});

// 积分奖励
router.get("/get_integral", (req, res, next) => {
  const query = req.query;
  let len = 0,
    descs = "";
  if (query.type == 1) {
    //分享
    len = 5;
    descs = "分享";
  } else if (query.type == 2) {
    //约课
    len = 10;
    descs = "约课";
  } else {
    //活动打赏
    len = 10;
    descs = "活动打赏";
  }
  const sql = `update user_infomation set integral = integral + ${len} WHERE id = ${query.user_id};
  insert into integral_detail (type, descs, integral, user_id) values ('1', '${descs}', '${len}', '${query.user_id}');`;
  queryOne(sql)
    .then((result) => {
      result = null;
      new Result(result, "成功").success(res);
      // 新增打赏榜记录
      if (query.type == 3) {
        const sql2 = `INSERT INTO rewardList(activitys_id, user_id, integral)
      VALUES ('${query.activitys_id}','${query.user_id}','10');
      update user_infomation set integral = integral - ${len} WHERE id = ${query.user_id};`;
        queryOne(sql2)
          .then((results) => {
            console.log(results);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((err) => {
      new Result(err, "失败").fail(res);
    });
});

// 积分明细
router.get("/integral_detail", (req, res, next) => {
  const query = req.query;
  const sql = `SELECT * from integral_detail WHERE user_id = '${query.user_id}' ;`;
  querySql(sql)
    .then((result) => {
      new Result(result, "获取成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取失败").fail(res);
    });
});

// 兑换积分
router.post("/exchange_integral", (req, res, next) => {
  const body = req.body;
  const sql = `update user_infomation set integral = integral - ${body.num} WHERE id = '${body.user_id}';`;
  queryOne(sql)
    .then((result) => {
      new Result(result, "兑换成功").success(res);
      const sql = `insert into integral_detail (type, descs, integral, user_id) values ('0', '积分兑换', '${body.num}', '${body.user_id}');`;
      queryOne(sql)
        .then((results) => {
          console.log(results);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((err) => {
      new Result(err, "兑换失败,请检查积分是否充足").fail(res);
    });
});

// 打赏活动积分榜
router.get("/rewardList", (req, res, next) => {
  const query = req.query;
  const sql = `SELECT r.*,u.username,u.user_logo,u.sex,u.style_msg from rewardList r join user_infomation
   u on r.user_id = u.id WHERE r.user_id = '${query.user_id}' and r.activitys_id = '${query.activitys_id}';`;
  querySql(sql)
    .then((result) => {
      new Result(result, "获取成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取失败").fail(res);
    });
});

// 获取当前用户已开通的会员卡
router.get("/getMyCard",(req, res, next) => {
  const query = req.query;
  const sql = `SELECT card_id FROM myCard WHERE user_id = '${query.user_id}';`;
  querySql(sql)
    .then((result) => {
      new Result(result, "获取成功").success(res);
    })
    .catch((err) => {
      new Result(err, "获取失败").fail(res);
    });
});

module.exports = router;
