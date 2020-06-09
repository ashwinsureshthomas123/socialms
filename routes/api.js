const http = require("http");
const querystring = require("querystring");
const express=require('express');
const app=express();
const userinfo = require('../models/User');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Userbucket = userinfo.Userbucket;

app.get('/',function(req, res) {
    var data = querystring.stringify({
        email: req.user.email, password: req.user.password
    });

    var options = {
        host: 'localhost',
        port: 2000,
        path: '/api',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    var req = http.request(options, function(res)
    {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log("body: " + chunk);
        });
    });
    req.write(data);
    req.end();
    res.redirect("http://localhost:2000/");
});
app.post('/',function(req, res) {
    const bucketlink=req.body.image;
    console.log(bucketlink);
    const email = req.body.email;
    let bucketinfo = new Userbucket({
    email,
    bucketlink,
    });
    console.log(bucketinfo);
    bucketinfo.save();
});
module.exports = app;