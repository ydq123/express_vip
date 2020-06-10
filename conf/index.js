const multer = require("multer");

// 文件上传方法封装
const storge = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/image");
  },
  filename: function (req, file, cb) {
    var fileformat = file.originalname.split("."); //取文件名和后缀
    cb(
      null,
      fileformat[0] + "_" + Date.now() + "." + fileformat[fileformat.length - 1]
    );
  },
});

const config = {
  serverIp: "http://172.20.10.6:3000/",
  CODE_ERROR: -1,
  CODE_SUCCESS: 0,
  upload: multer({ storage: storge }), // 文件储存路径
};



module.exports = config;
