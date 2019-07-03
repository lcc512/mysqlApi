const moment = require('moment')
const db = require('../../models/db')


exports.one = async (req, res, next) => {

  try {

    // const {id} = req.params

    const sqlStr = `select * from myblog_options where id=1`
    const options = await db.query(sqlStr)

    const currentOptions=options[0]

    res.status(200).json(currentOptions)

  } catch (err) {
    next(err)
  }

}

exports.update = async (req, res, next) => {

  try {

    // console.log(req.body)
    const body = req.body
    // const {id} = req.params

    const sqlStr = `update myblog_options set tagAllList='${body.tagAllList}' where id=1`

    const result = await db.query(sqlStr)
    res.status(201).json(result.affectedRows)


  } catch (err) {
    next(err)
  }

}
