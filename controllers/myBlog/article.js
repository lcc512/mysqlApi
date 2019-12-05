const moment = require('moment')
const db = require('../../models/db')


/**
 * 定义一个变量 用于apiGroup 因为不支持直接输入中文
 * @apiDefine article 文章Api
 */

/**
 * @api {get} article 获取文章列表
 * @apiName list
 * @apiGroup article
 *
 * @apiParam {object} req 请求对象
 * @apiParam {object} res 返回对象
 * @apiParam {object} next next中间件
 *
 * @apiSuccess {Object} articles 文章信息数组
 * @apiSuccess {Object} articlesCount 文章数量
 * @apiSuccessExample Success-Response:
 * {
 *  articles:[],
 *  articlesCount:0
 * }
 *
 */
exports.list = async(req, res, next) => {

    try {

        //解构赋值，当get是带问号参数的请求时，req.query请求体里有这些参数，通过解构赋值给它们
        let { _page = 1, _limit = 20 } = req.query
            //将page限定至少为1，limit至多为20
            //     为了验证分页功能，这里限制为5条
        if(_page < 1) {
            _page = 1
        }
        if(_limit < 1) {
            _limit = 1
        }
        if(_limit > 20) {
            _limit = 20
        }

        const sqlStr = `select * from articles 
                    order by id desc 
                    limit ${(_page - 1) * _limit},${_limit} `

        // 获取总条数
        const sqlStrCount = `select count(*) as articlesCount from articles`

        const articles = await db.query(sqlStr)
        const [{ articlesCount }] = await db.query(sqlStrCount)

        articles.forEach(function(item) {

            item.createTime = moment(new Date(item.createTime)).format('YYYY-MM-DD HH:mm:ss')
            item.updateTime = moment(new Date(item.updateTime)).format('YYYY-MM-DD HH:mm:ss')

        })



        res.status(200).json({
            articles,
            articlesCount
        })

        // console.log(topics)

    } catch(err) {
        next(err)
    }

}

/**
 * @api {get} article/:id 获取单条文章
 * @apiName one
 * @apiGroup article
 *
 * @apiParam {string} :id 文章id
 * @apiParam {object} req 请求对象
 * @apiParam {object} res 返回对象
 * @apiParam {object} next next中间件
 *
 * @apiSuccess {Object} currentBaseInfo 文章信息对象
 * @apiSuccessExample Success-Response:
 * {
 *  id:0,
 *  title:'title'
 *  content:'content'
 * }
 *
 */
exports.one = async(req, res, next) => {

    try {

        const { id } = req.params

        const sqlStr = `select * from articles where id='${id}'`
        const baseInfo = await db.query(sqlStr)

        const currentBaseInfo = baseInfo[0]

        currentBaseInfo.createTime = moment(new Date(currentBaseInfo.createTime)).format('YYYY-MM-DD HH:mm:ss')
        currentBaseInfo.updateTime = moment(new Date(currentBaseInfo.updateTime)).format('YYYY-MM-DD HH:mm:ss')

        res.status(200).json(currentBaseInfo)

    } catch(err) {
        next(err)
    }

}

/**
 * @api {post} article 创建单条文章
 * @apiName create
 * @apiGroup article
 *
 * @apiParam {object} req 请求对象
 * @apiParam {object} res 返回对象
 * @apiParam {object} next next中间件
 *
 * @apiSuccess {Object} topic 创建成功的文章信息对象
 * @apiSuccessExample Success-Response:
 * {
 *  id:0,
 *  title:'title'
 *  content:'content'
 * }
 *
 */
exports.create = async(req, res, next) => {

    try {

        console.log(req.body)
        const body = req.body

        const sqlStr = `insert into articles (title,content,tagList)
  values(
  '${body.title}',
  '${body.content}',
  '${body.tagList}'
  )
  `

        const result = await db.query(sqlStr)
        const [topic] = await db.query(`select * from articles where id='${result.insertId}'`)

        res.status(201).json(topic)

    } catch(err) {
        next(err)
    }
}

/**
 * @api {patch} article/:id 更新单条文章
 * @apiName update
 * @apiGroup article
 *
 * @apiParam {string} :id 文章id
 * @apiParam {object} req 请求对象
 * @apiParam {object} res 返回对象
 * @apiParam {object} next next中间件
 *
 * @apiSuccess {string} result.affectedRows 更新成功条数(一般为1)
 * @apiSuccessExample Success-Response:
 * 
 * 1
 */
exports.update = async(req, res, next) => {

    try {

        // console.log(req.body)
        const body = req.body
        const { id } = req.params

        const sqlStr = `update articles set 
    title='${body.title}',
    content='${body.content}',
    tagList='${body.tagList}'
    where id=${id}`

        const result = await db.query(sqlStr)
        res.status(201).json(result.affectedRows)


    } catch(err) {
        next(err)
    }

}

/**
 * @api {delete} article/:id 删除单条文章
 * @apiName destroy
 * @apiGroup article
 *
 * @apiParam {string} :id 文章id
 * @apiParam {object} req 请求对象
 * @apiParam {object} res 返回对象
 * @apiParam {object} next next中间件
 *
 * @apiSuccess {string} result.affectedRows 删除成功条数(一般为1)
 * @apiSuccessExample Success-Response:
 * 
 * 1
 */
exports.destroy = async(req, res, next) => {

    try {

        const { id } = req.params

        const sqlStr = `delete from articles where id=${id}`
        const result = await db.query(sqlStr)
        res.status(201).json(result.affectedRows)


    } catch(err) {
        next(err)
    }

}
