
const express = require('express');
const router = express.Router();
const userinfo = require('../models/User');
const Userbucket = userinfo.Userbucket;

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
router.get('/upload', (req, res) => res.render('upload'));

router.post('/upload',(req, res) => {
  const { bucketname, filename } = req.body;
  const email = req.user.email;
  console.log(req.body);
  let bucketinfo = new Userbucket({
    email,
    bucketname,
    filename,
  });

let bucketlink="https://"+bucketinfo.bucketname+".s3.us-east-2.amazonaws.com/"+filename;
console.log(bucketname)
bucketinfo.save();
  res.render('dashboard',{
    user:req.user,
    bucketlink
  })
});


module.exports = router;