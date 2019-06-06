const db = require('../models/db')

exports.list = async (req, res, next) => {

  try {

    const {topic_id} = req.query
    const sqlStr = `select * from comments where topic_id='${topic_id}' order by id desc`
    const topics = await db.query(sqlStr)

    res.status(200).json(topics)

  } catch (err) {
    next(err)
  }

}
exports.create = async (req, res, next) => {

  try {

    const body = req.body
    body.user_id = req.session.user.id
    const sqlStr = `insert into comments (content,topic_id,user_id,reply_id)
                    values(
                    '${body.content}',
                    '${body.topic_id}',
                    '${req.session.user.id}',
                    '0')`

    const {insertId} = await db.query(sqlStr)
    const [comments] = await db.query(`select * from comments where id='${insertId}'`)

    // 每更新一条回复，topic的reply_num 字段 +1
    const sqlStrReply = `update topics set reply_num=reply_num+1 where id='${body.topic_id}'`

    await db.query(sqlStrReply)

    res.status(201).json(comments)

  } catch (err) {
    next(err)
  }
}
exports.update = (req, res, next) => {

}
exports.destroy = (req, res, next) => {

}