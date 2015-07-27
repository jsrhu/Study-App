var mongodb = require('mongodb');
var Client = mongodb.MongoClient;
var insert = require('./insert.js');
var monk = require('monk');
var db = monk('localhost/database1');
var url = 'mongodb://localhost:27017/database1';
// function returnDatabase(){
//   Client.connect(url, function (err, db) {
//     if (err) {
//       console.log('Unable to connect to the mongoDB server. Error:', err);
//     } 
//     else {
//       console.log('Connection established to', url);
//       return db;
//     }
//   });
// }
// db.get('users').insert({bigpoppa:'biggie'},function(err,cb){
//   console.log('IM HERE');
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log('Im here1');
//   }
// })
var users = db.get('users');
console.log(users);
db.close();
