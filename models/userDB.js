
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'assignDBuser',
  password: 'assignDBpass',
  database: 'assignDB',
});

function getUsers(callback) {
  connection.query('SELECT * FROM users', function (err, results) {
    if (err) {
      console.error(err);
      return callback([]);
    }
    callback(results);
  });
}

function addUser(user, callback) {
  connection.execute(
    'INSERT INTO users (fname, lname, username, passwd) VALUES (?, ?, ?, ?)',
    [user.fname, user.lname, user.username, user.passwd ?? '123456'],
    function (err, results) {
      if (err) {
        console.error(err);
        return callback(null);
      }
      callback(results);
    }
  );
}

function deleteUser(userID, callback) {
  connection.execute(
    'DELETE FROM users WHERE userID = ?',
    [userID],
    function (err, results, fields) {
      callback(results);
    });
  }

module.exports = { getUsers, addUser, deleteUser };