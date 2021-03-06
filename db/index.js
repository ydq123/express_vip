const mysql = require("mysql");
const config = require("./config");

function connect() {
  return mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    charset: "UTF8MB4_GENERAL_CI",
    multipleStatements: true,
  });
}

function querySql(sql) {
  const conn = connect();
  return new Promise((resolve, reject) => {
    try {
      conn.query(sql, (err, results) => {
        if (err) {
          console.log("查询失败，原因:" + JSON.stringify(err));
          reject(err);
        } else {
          // console.log("查询成功", JSON.stringify(results));
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    } finally {
      conn.end();
    }
  });
}

function queryOne(sql) {
  return new Promise((resolve, reject) => {
    querySql(sql)
      .then((results) => {
        if (results && results.length > 0) {
          resolve(results[0]);
        } else {
          resolve(null);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  querySql,
  queryOne,
};
