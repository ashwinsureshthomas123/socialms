const express = require('express');
const router = express.Router();
 

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated,(req, res) => {
  let bucketlink={}
   res.render('dashboard', {
    user:req.user,
    bucketlink
  })
});

module.exports = router;
