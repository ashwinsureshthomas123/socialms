const express = require('express');
const router = express.Router();
const aws = require('aws-sdk')
const awskey = require('../config/aws.json')

aws.config.update({
  secretAccessKey: awskey.secretAccessKey,
  accessKeyId: awskey.accessKeyId,
  region: awskey.region
})
const s3 = new aws.S3();
 

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated,(req, res) => {
  //
   const end = null;
   const usr=req.user.name;
   
   res.render('dashboard', {
    user:usr
  })
  console.log(usr);
});

module.exports = router;
