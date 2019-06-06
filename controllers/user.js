const md5=require('blueimp-md5')
const db=require('../models/db')


exports.list = async (req, res, next) => {

  const sqlStr = `select * from users 
                  where username='${req.query.username}'
                  or email='${req.query.email}'`

  const topics = await db.query(sqlStr)

  res.status(200).json(topics)
}
exports.create = async (req, res, next) => {


  try{
  // console.log(req.body)
  const body=req.body
  const sqlStr = `insert into users (username,password,email,nickname,gender)
  values(
  '${body.email}',
  '${md5(body.password)}',
  '${body.email}',
  '${body.nickname}',
  '${body.gender}'
  )
  `


    const result = await db.query(sqlStr)
    const [user] = await db.query(`select * from topics where id='${result.insertId}'`)

    res.status(201).json(user)

  }catch (err) {
    next(err)
  }


}
exports.update = (req, res, next) => {

}
exports.destroy = (req, res, next) => {

}