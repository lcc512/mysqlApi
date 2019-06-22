const moment = require('moment')
const db = require('../../models/db')

exports.list = async (req, res, next) => {

  try {

    //解构赋值，当get是带问号参数的请求时，req.query请求体里有这些参数，通过解构赋值给它们
    let {_page = 1, _limit = 20} = req.query
//将page限定至少为1，limit至多为20
//     为了验证分页功能，这里限制为5条
    if (_page < 1) {
      _page = 1
    }
    if (_limit < 1) {
      _limit = 1
    }
    if (_limit > 20) {
      _limit = 20
    }

    const sqlStr = `select * from articles 
                    order by id desc 
                    limit ${(_page - 1) * _limit},${_limit} `

    // 获取总条数
    const sqlStrCount = `select count(*) as articlesCount from articles`

    const articles = await db.query(sqlStr)
    const [{articlesCount}] = await db.query(sqlStrCount)

    res.status(200).json({
      articles,
      articlesCount
    })

    // console.log(topics)

  } catch (err) {
    next(err)
  }

}


exports.one = async (req, res, next) => {

  try {

    const {id} = req.params

    const sqlStr = `select * from articles where id='${id}'`
    const baseInfo = await db.query(sqlStr)

    res.status(200).json(baseInfo[0])

  } catch (err) {
    next(err)
  }

}


exports.create = async (req, res, next) => {

  try {

    // console.log(req.body)
    const body = req.body
    // body.user_id = req.session.user.id
    const sqlStr = `insert into articles (title,content)
  values(
  '${body.title}',
  '${body.content}'
  )
  `

    const result = await db.query(sqlStr)
    const [topic] = await db.query(`select * from articles where id='${result.insertId}'`)

    res.status(201).json(topic)

  } catch (err) {
    next(err)
  }
}
exports.update = async (req, res, next) => {

  try {

    // console.log(req.body)
    const body = req.body
    const {id} = req.params

    const sqlStr = `update articles set title='${body.title}',content='${body.content}'
    where id=${id}`

    const result = await db.query(sqlStr)
    res.status(201).json(result.affectedRows)


  } catch (err) {
    next(err)
  }

}

exports.destroy = async (req, res, next) => {

  try {

    const {id} = req.params

    const sqlStr = `delete from articles where id=${id}`
    const result = await db.query(sqlStr)
    res.status(201).json(result.affectedRows)


  } catch (err) {
    next(err)
  }

}