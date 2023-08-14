const express = require('express');
const mysql = require('mysql');
require('dotenv').config();
const router = express.Router();

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME
});

router.get('/', function (req, res, next) {
  connection.query(
    `select * from tasks;`,
    (error, results) => {
      console.log('get error:', error);
      console.log('get results: ', results);
      res.render('index', {
        title: 'ToDo App',
        todos: results,
      });
    }
  );
});

router.post('/', function (req, res, next) {
  // NOTE: 
  /**
   * NOTE: 下記コードを追加するとエラーになる
   * `error connecting: Error: Cannot enqueue Handshake after already enqueuing a Handshake.`
   * connectionが接続されていない場合、connection.query関数内で接続を行っているみたいなので不要かも
   */
  // connection.connect((err) => {
  //   if (err) {
  //     console.log('error connecting: ' + err.stack);
  //     return
  //   }
  //   console.log('success');
  // });
  const todo = req.body.add;
  console.log("🚀 ~ file: index.js:31 ~ todo:", todo)
  connection.query(
  `insert into tasks (user_id, content) values (1, '${todo}');`,
  (error, results) => {
    console.log('post error', error);
    res.redirect('/');
  }
);
});

module.exports = router;