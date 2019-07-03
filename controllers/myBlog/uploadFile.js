const moment = require('moment')
const db = require('../../models/db')
const fs = require('fs')
const path = require('path')
const multer = require('multer')

var express = require('express');
var COS = require('cos-nodejs-sdk-v5');
var router = express.Router();


exports.uploadImg = async (req, res, next) => {

  try {

    // console.log(req.body)
    // // const body = req.body
    //
    //
    // fs.writeFile(__dirname + '/images/test.jpg', body.data, 'binary', function (err) {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log('写入成功');
    //     // console.log(req);
    //   }
    // });
    //
    // var test = {
    //   url: __dirname + '/images/test.jpg',
    //   number: 0
    // }
    //
    // res.status(200).json(test)

  } catch (err) {
    next(err)
  }

}

