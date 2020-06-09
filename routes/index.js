const express = require('express');
const router = express.Router();
const userinfo = require('../models/User');
const Userbucket = userinfo.Userbucket;

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated,(req, res) => {
  var query={email : req.user.email};
  var bucketlist=[];
  var i;
  var bucketname=function(user,callback){
    Userbucket.find(query).where("email",user.email).
    exec(function(err, data) {
        data.reverse();
        callback(err, data);
      });
  }
  bucketname(req.user,function(err, data) {
    if (err) { 
      return;
    }
    for(i=0;i<data.length;i++){
      bucketlist.push(data[i].bucketlink);
    }
    console.log(bucketlist);
    res.render('dashboard', {
      bucketlink: bucketlist,
      user: req.user
    })
});
  
});

module.exports = router;
