const moment = require('moment')
const db = require('../../models/db')
const fs=require('fs')
const path=require('path')


exports.uploadImg = async (req, res, next) => {

  try {

    // console.log(req.body)
    const body = req.body

    console.log(__dirname)

    fs.writeFile(__dirname + '/images/test.jpg', body.data, 'binary' , function (err) {
      if(err) {
        console.error(err);
      } else {
        console.log('写入成功');
        console.log(req.body);
      }
    });

    var test={
      url:__dirname + '/images/test.jpg',
      number:0
    }

    res.status(200).json(test)

  } catch (err) {
    next(err)
  }

}

