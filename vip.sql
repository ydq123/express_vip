/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : vip

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 18/07/2020 12:43:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activitys
-- ----------------------------
DROP TABLE IF EXISTS `activitys`;
CREATE TABLE `activitys`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `activity_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `activity_content` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `activity_img` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activitys
-- ----------------------------
INSERT INTO `activitys` VALUES (1, '1', 'www', '1', 'http://172.20.10.6:3000/public/image/cai_1593115950740.jpg');
INSERT INTO `activitys` VALUES (2, '1', 'www', '1', 'http://106.55.150.59:8015/public/image/cardZ_1594125521969.jpg');

-- ----------------------------
-- Table structure for activitys_comment
-- ----------------------------
DROP TABLE IF EXISTS `activitys_comment`;
CREATE TABLE `activitys_comment`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '评论活动表',
  `activitys_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `comment_content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `comment_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `comment_date` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activitys_comment
-- ----------------------------
INSERT INTO `activitys_comment` VALUES (6, '1', '嘻嘻嘻哈', '1', '2020-05-30 08:48:48');
INSERT INTO `activitys_comment` VALUES (7, '1', '嘻嘻嘻哈', '1', '2020-05-30 08:51:46');
INSERT INTO `activitys_comment` VALUES (8, '1', '嘻嘻嘻哈', '1', '2020-05-30 08:51:47');

-- ----------------------------
-- Table structure for activitys_join
-- ----------------------------
DROP TABLE IF EXISTS `activitys_join`;
CREATE TABLE `activitys_join`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `activitys_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activitys_join
-- ----------------------------
INSERT INTO `activitys_join` VALUES (4, '2', '3');

-- ----------------------------
-- Table structure for blacklist
-- ----------------------------
DROP TABLE IF EXISTS `blacklist`;
CREATE TABLE `blacklist`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `dept_no` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blacklist
-- ----------------------------
INSERT INTO `blacklist` VALUES (1, '1', '2');

-- ----------------------------
-- Table structure for clock_list
-- ----------------------------
DROP TABLE IF EXISTS `clock_list`;
CREATE TABLE `clock_list`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `clock_type` enum('1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '1上班 2下班',
  `clock_time` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of clock_list
-- ----------------------------
INSERT INTO `clock_list` VALUES (1, '1', '1', '2020-10-10 10:30:00');
INSERT INTO `clock_list` VALUES (2, '1', '2', '2020-10-10 18:30:00');

-- ----------------------------
-- Table structure for courses
-- ----------------------------
DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `course_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `course_img` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `course_tearch` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `course_start_date` time(0) NULL DEFAULT NULL,
  `count_people` int(0) NULL DEFAULT NULL,
  `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `msg` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `course_date` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `course_end_date` time(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of courses
-- ----------------------------
INSERT INTO `courses` VALUES (3, '1', '嘻嘻哈', 'http://172.20.10.6:3000/public/image/cai-1590893250354.jpg', '李老师', '10:30:00', 15, '南京城内', '留言咯', '2010-10-10，2020-10-10', '11:00:00');
INSERT INTO `courses` VALUES (4, '1', '嘻嘻哈', 'http://172.20.10.6:3000/public/image/cai-1590893252245.jpg', '李老师', '12:00:00', 15, '南京城内', '留言咯', '2010-10-10，2020-10-10', '15:00:00');
INSERT INTO `courses` VALUES (5, '1', '嘻嘻哈', 'http://172.20.10.6:3000/public/image/cai-1590893253859.jpg', '李老师', '10:10:00', 15, '南京城内', '留言咯', '2010-10-10，2020-10-10', '23:00:00');

-- ----------------------------
-- Table structure for courses_appointment
-- ----------------------------
DROP TABLE IF EXISTS `courses_appointment`;
CREATE TABLE `courses_appointment`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `courses_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT '1收藏 0取消收藏',
  `qrcode` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of courses_appointment
-- ----------------------------
INSERT INTO `courses_appointment` VALUES (14, '1', '5', '1', '');
INSERT INTO `courses_appointment` VALUES (15, '1', '6', '1', '46e92489-c127-11ea-abee-e454e804e97b');
INSERT INTO `courses_appointment` VALUES (16, '1', '7', '1', '499d7149-c127-11ea-abee-e454e804e97b');
INSERT INTO `courses_appointment` VALUES (17, '2', '5', '1', '51388030-c127-11ea-abee-e454e804e97b');

-- ----------------------------
-- Table structure for dept_banner
-- ----------------------------
DROP TABLE IF EXISTS `dept_banner`;
CREATE TABLE `dept_banner`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `banner_url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `banner_img` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 53 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dept_banner
-- ----------------------------
INSERT INTO `dept_banner` VALUES (50, '123', 'www', 'http://172.20.10.6:3000/public/image/dfl-sc_1591531122233.jpg');
INSERT INTO `dept_banner` VALUES (51, '1', 'w1', 'public/image/dfl-bh_1594209866420.jpg');
INSERT INTO `dept_banner` VALUES (52, '1', 'w1', 'public/image/dfl-bh_1594209864294.jpg');
INSERT INTO `dept_banner` VALUES (53, '1', 'w1', 'public/image/dfl-bh_1594209860952.jpg');

-- ----------------------------
-- Table structure for dept_manage
-- ----------------------------
DROP TABLE IF EXISTS `dept_manage`;
CREATE TABLE `dept_manage`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` int(0) NOT NULL COMMENT '当前用户id',
  `dept_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dept_manage
-- ----------------------------
INSERT INTO `dept_manage` VALUES (2, 1, 'xixihaha2');
INSERT INTO `dept_manage` VALUES (3, 1, '嘻嘻哈哈2');

-- ----------------------------
-- Table structure for focus_courses
-- ----------------------------
DROP TABLE IF EXISTS `focus_courses`;
CREATE TABLE `focus_courses`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '约课程记录表',
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `dept_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `courses_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for integral_detail
-- ----------------------------
DROP TABLE IF EXISTS `integral_detail`;
CREATE TABLE `integral_detail`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `type` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '0为- 1为+',
  `descs` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '描述',
  `create_date` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `integral` int(0) NULL DEFAULT NULL,
  `user_id` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for member_card
-- ----------------------------
DROP TABLE IF EXISTS `member_card`;
CREATE TABLE `member_card`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `card_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `card_bg_url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `card_type` enum('1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '1-团 2-私教',
  `card_class_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '选择的卡分类id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of member_card
-- ----------------------------
INSERT INTO `member_card` VALUES (7, '1', '嘿嘿', 'http://172.20.10.6:3000/public/image/cai_1591712707979.jpg', '1', '2');
INSERT INTO `member_card` VALUES (8, '1', '西哈2', 'http://172.20.10.6:3000/public/image/busiess_1591709784668.jpg', '1', '3');
INSERT INTO `member_card` VALUES (9, '1', '哈哈', 'http://172.20.10.6:3000/public/image/dfl-sc_1591880010079.jpg', '1', '2,3');
INSERT INTO `member_card` VALUES (10, '1', '哈哈', 'http://172.20.10.6:3000/public/image/cai_1593112579231.jpg', '1', '2,3');

-- ----------------------------
-- Table structure for member_card_class
-- ----------------------------
DROP TABLE IF EXISTS `member_card_class`;
CREATE TABLE `member_card_class`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `class_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `class_price` decimal(10, 2) NULL DEFAULT NULL,
  `classify` enum('1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '1-期限卡 2-次数卡',
  `classify_start_date` date NULL DEFAULT NULL COMMENT '有效开始时间',
  `classify_end_date` date NULL DEFAULT NULL COMMENT '有效结束时间',
  `use_count_week` mediumint(0) NULL DEFAULT NULL COMMENT '每周使用次数 不填则不限制',
  `use_count` mediumint(0) NULL DEFAULT NULL COMMENT '设置总次数',
  `card_integral` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '积分',
  `card_money` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '优惠',
  `card_course` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '课时',
  `isGive` enum('1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '2' COMMENT '1-开卡赠送 2-关闭开卡赠送',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of member_card_class
-- ----------------------------
INSERT INTO `member_card_class` VALUES (2, '1', '嘻嘻哈哈', 120.00, '1', '2010-11-10', '2010-11-18', 12, 10, '10', '12', '15', '2');
INSERT INTO `member_card_class` VALUES (3, '1', '分类3', 120.00, '1', '2010-11-10', '2010-11-18', 12, 10, '10', '12', '15', '2');
INSERT INTO `member_card_class` VALUES (4, '1', '分类1', 120.00, '1', '2010-11-10', '2010-11-18', 12, 10, '10', '12', '15', '2');
INSERT INTO `member_card_class` VALUES (5, '1', '分类5', 120.00, '1', '2010-11-10', '2010-11-18', 12, 10, '10', '12', '15', '2');

-- ----------------------------
-- Table structure for notice_msg
-- ----------------------------
DROP TABLE IF EXISTS `notice_msg`;
CREATE TABLE `notice_msg`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `type` enum('1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '1商家消息 2系统消息',
  `msgContent` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `msg_head_img` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `create_date` date NOT NULL,
  `isRead` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '0未读 1已读',
  `user_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notice_msg
-- ----------------------------
INSERT INTO `notice_msg` VALUES (1, '1', '1', '1', '2020-04-28', '0', '1');
INSERT INTO `notice_msg` VALUES (2, '2', '1', '1', '2020-05-28', '0', '1');

-- ----------------------------
-- Table structure for notice_news
-- ----------------------------
DROP TABLE IF EXISTS `notice_news`;
CREATE TABLE `notice_news`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `type` enum('1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '1商家消息 2系统消息',
  `msgContent` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `create_date` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `isRead` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '0未读 1已读',
  `user_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notice_news
-- ----------------------------
INSERT INTO `notice_news` VALUES (7, '2', 'w shi 备注涉及到i是否哈桑', '2020-06-14 15:20:14', '0', '1');

-- ----------------------------
-- Table structure for order_list
-- ----------------------------
DROP TABLE IF EXISTS `order_list`;
CREATE TABLE `order_list`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `card_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '会员卡id',
  `create_date` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `paymoney` decimal(10, 2) NOT NULL,
  `order_no` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '订单号',
  `user_id` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_list
-- ----------------------------
INSERT INTO `order_list` VALUES (5, '7', '2020-07-18 10:57:15', 1.00, '1', '1');

-- ----------------------------
-- Table structure for user_agreement
-- ----------------------------
DROP TABLE IF EXISTS `user_agreement`;
CREATE TABLE `user_agreement`  (
  `content` varchar(8000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `wechat` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `isUpdate` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_apply
-- ----------------------------
DROP TABLE IF EXISTS `user_apply`;
CREATE TABLE `user_apply`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dept_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `apply_logo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `applyName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tel` char(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `License` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_focus_dept
-- ----------------------------
DROP TABLE IF EXISTS `user_focus_dept`;
CREATE TABLE `user_focus_dept`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dept_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` enum('0','1','2','3') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '0不关注 1关注 2会员 3同事',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_focus_dept
-- ----------------------------
INSERT INTO `user_focus_dept` VALUES (5, '1', '2', '3');
INSERT INTO `user_focus_dept` VALUES (8, '1', '1', '1');
INSERT INTO `user_focus_dept` VALUES (14, '2', '1', '1');

-- ----------------------------
-- Table structure for user_focus_user
-- ----------------------------
DROP TABLE IF EXISTS `user_focus_user`;
CREATE TABLE `user_focus_user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `people_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '关注/粉丝的那个人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_focus_user
-- ----------------------------
INSERT INTO `user_focus_user` VALUES (2, '1', '2');
INSERT INTO `user_focus_user` VALUES (3, '2', '1');
INSERT INTO `user_focus_user` VALUES (4, '2', '2');
INSERT INTO `user_focus_user` VALUES (5, '1', '1');
INSERT INTO `user_focus_user` VALUES (6, '1', '3');

-- ----------------------------
-- Table structure for user_infomation
-- ----------------------------
DROP TABLE IF EXISTS `user_infomation`;
CREATE TABLE `user_infomation`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '既是用户id也是店铺dept_no',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sex` enum('男','女') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `birth` date NULL DEFAULT NULL,
  `style_msg` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `realname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `tel` char(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `isbusines` enum('1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '2' COMMENT '1-是商家  2-不是',
  `busines_bg` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `busines_pass` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `busines_phone` char(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `busines_address` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `busines_msg` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `card_msg` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '会员卡说明',
  `courses_msg` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '课程说明',
  `busines_logo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `busines_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `busines_people` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `license` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '营业执照',
  `user_home_bg` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户主页背景图',
  `user_star` int(0) NULL DEFAULT 0 COMMENT '点赞',
  `openid` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_logo` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `integral` int(0) NULL DEFAULT 0 COMMENT '个人积分',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_infomation
-- ----------------------------
INSERT INTO `user_infomation` VALUES (1, '123', '女', '1995-11-11', '123', '123', '123', '1', 'http://172.20.10.6:3000/public/image/u618-1590447251520.png', '1115', '123', '123', '嘻嘻哈哈55', NULL, NULL, 'public/image/cai-1594208130396.jpg', '123', '123', 'public/image/dfl-ly-1594208130398.jpg', NULL, NULL, NULL, 'http://172.20.10.6:3000/public/image/logo-1593500569490.png', 0);
INSERT INTO `user_infomation` VALUES (2, '小桃红', '女', '1996-10-12', 'http://szimg.mukewang.com/5becd5ad0001b89306000338-360-202.jpg', '李丽', '13169418688', '1', 'http://172.20.10.6:3000/public/image/cai-1591518970795.jpg', '123', '13169418600', 'xixixi', '123', NULL, NULL, NULL, '2号店', NULL, NULL, NULL, NULL, NULL, NULL, 0);
INSERT INTO `user_infomation` VALUES (20, '嘻嘻boy', '男', NULL, NULL, NULL, NULL, '2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '543', 'www.jpg', 0);
INSERT INTO `user_infomation` VALUES (21, '咸菜', '女', NULL, NULL, NULL, NULL, '2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'E9709208C35B71E6EF25C73D500423CE', 'http://qzapp.qlogo.cn/qzapp/101884768/E9709208C35B71E6EF25C73D500423CE/30', 0);
INSERT INTO `user_infomation` VALUES (22, '黑夜', '男', NULL, NULL, NULL, NULL, '2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'oRrdQtzu_91MYCmNym5wfODcr9QU', 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eovj3ln2oNksLOjKw8dRLYOdnhTZ5603xiayEdD3bnTvniaNjNxYT12PK1yhZ0iamX3VVicNHjHDNmAdg/132', 0);
INSERT INTO `user_infomation` VALUES (23, '测测试', '男', '2019-10-10', '个性签名', '哈哈', '13996183515', '2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'B1B1EA1906CCEF6A12EBACE2AEF4DE20', 'http://172.20.10.6:3000/public/image/1-1593507817763.png', 0);

-- ----------------------------
-- Table structure for user_thumbs_up
-- ----------------------------
DROP TABLE IF EXISTS `user_thumbs_up`;
CREATE TABLE `user_thumbs_up`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '点赞人的id',
  `people_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '被点赞人的id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_thumbs_up
-- ----------------------------
INSERT INTO `user_thumbs_up` VALUES (1, '1', '1');
INSERT INTO `user_thumbs_up` VALUES (2, '1', '1');
INSERT INTO `user_thumbs_up` VALUES (3, '1', '1');
INSERT INTO `user_thumbs_up` VALUES (4, '1', '1');
INSERT INTO `user_thumbs_up` VALUES (5, '1', '1');
INSERT INTO `user_thumbs_up` VALUES (6, '1', '1');
INSERT INTO `user_thumbs_up` VALUES (7, 'undefined', 'undefined');

-- ----------------------------
-- Table structure for vip_explain
-- ----------------------------
DROP TABLE IF EXISTS `vip_explain`;
CREATE TABLE `vip_explain`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` enum('1','2','3') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '1会员协议，2约课说明 3平台反馈',
  `content` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of vip_explain
-- ----------------------------
INSERT INTO `vip_explain` VALUES (1, '1', '1', '123....');
INSERT INTO `vip_explain` VALUES (2, '2', '1', '123....');
INSERT INTO `vip_explain` VALUES (3, '1', '2', '123....');
INSERT INTO `vip_explain` VALUES (4, '1', '3', '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n3515415');
INSERT INTO `vip_explain` VALUES (5, '000', '3', '4545....');
INSERT INTO `vip_explain` VALUES (6, 'undefined', '3', '4545....');
INSERT INTO `vip_explain` VALUES (7, '22', '3', '哈哈哈哈哈哈');

-- ----------------------------
-- Table structure for works
-- ----------------------------
DROP TABLE IF EXISTS `works`;
CREATE TABLE `works`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `work_url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `work_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `work_play_num` int(0) NULL DEFAULT 0,
  `work_star` int(0) NULL DEFAULT 0,
  `work_msg` int(0) NULL DEFAULT NULL,
  `isHot` enum('1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '2' COMMENT '1-是热门 2不是',
  `work_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of works
-- ----------------------------
INSERT INTO `works` VALUES (2, 'http://172.20.10.6:8015/public/image/busiess_1593689830934.jpg', 'www', 0, 0, NULL, '2', '2020-07-02 19:37:10', '1');
INSERT INTO `works` VALUES (3, 'http://172.20.10.6:8015/public/image/busiess_1593689868934.jpg', 'www', 0, 0, NULL, '2', '2020-07-02 19:37:48', '1');
INSERT INTO `works` VALUES (4, 'http://106.55.150.59:8015/public/image/p-6cf9e575_1593698868482.jpg', 'undefined', 0, 0, NULL, '2', '2020-07-02 22:07:48', 'undefined');
INSERT INTO `works` VALUES (5, 'http://106.55.150.59:8015/public/image/p-6e81add5_1593698931939.jpg', 'undefined', 0, 0, NULL, '2', '2020-07-02 22:08:51', 'undefined');
INSERT INTO `works` VALUES (6, 'http://106.55.150.59:8015/public/image/p-6ec8ae60_1593698983557.jpg', 'undefined', 0, 0, NULL, '2', '2020-07-02 22:09:43', 'undefined');
INSERT INTO `works` VALUES (7, 'http://106.55.150.59:8015/public/image/p-940c4f61_1593699031976.jpg', 'undefined', 0, 0, NULL, '2', '2020-07-02 22:10:31', 'undefined');
INSERT INTO `works` VALUES (8, 'http://106.55.150.59:8015/public/image/p-975cfbf3_1593699218733.jpg', 'undefined', 0, 0, NULL, '2', '2020-07-02 22:13:38', '1');
INSERT INTO `works` VALUES (9, 'http://106.55.150.59:8015/public/image/p-9c7c8177_1593699521487.jpg', 'undefined', 0, 0, NULL, '2', '2020-07-02 22:18:41', '1');

-- ----------------------------
-- Table structure for works_comment
-- ----------------------------
DROP TABLE IF EXISTS `works_comment`;
CREATE TABLE `works_comment`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '评论作品表',
  `works_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `comment_content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `comment_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `comment_date` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of works_comment
-- ----------------------------
INSERT INTO `works_comment` VALUES (1, '1', '嘻嘻嘻哈', '1', '2020-05-29 23:43:24');
INSERT INTO `works_comment` VALUES (2, '1', '嘻嘻嘻哈', '1', '2020-05-29 23:43:34');
INSERT INTO `works_comment` VALUES (3, '1', '嘻嘻嘻哈', '1', '2020-05-29 23:43:35');
INSERT INTO `works_comment` VALUES (4, '1', '嘻嘻嘻哈', '1', '2020-06-01 22:06:21');

SET FOREIGN_KEY_CHECKS = 1;
