const express = require('express')
const router = express.Router()

const articlesController = require('../controllers/myBlog/article')
const uploadFileController = require('../controllers/myBlog/uploadFile')
const optionsController = require('../controllers/myBlog/options')

const db = require('../models/db')


// 登录验证中间件
// 路由router. 的方法，按顺序依次执行方法。把checkLogin 放在 topicController.list 之前，那么会先执行 checkLogin，
// 这个方法里，执行完next() 后，才执行下一个list方法
//   .get('/topics', checkLogin, topicController.list)
function checkLogin(req, res, next) {
  if (!req.session.user) {

    return res.status(401).json({
      error: '未登录-中间件判断'
    })
  }
  next()
}

//验证用户是否有话题权限
async function checkTopicUser(req, res, next) {

  try {
    const {id} = req.params

    // 要删除的话题属于当前登录的用户，则可删除，否则不允许
    const [topic] = await db.query(`select user_id from topics where id=${id}`)

    //先判断话题是否存在，然后再看里面的id属性是否匹配
    if (!topic) {
      return res.status(404).json({
        error: 'Topic not Found'
      })
    }

    if (topic.user_id !== req.session.user.id) {
      return res.status(400).json({
        error: '非当前用户所属话题，不可操作'
      })
    }
    next()


  } catch (err) {
    next(err)
  }

}

/*
测试api
 */
router.get('/test',function () {

  console.log(1111111111111)
  const sqlStr = 'select * from test'

  const topics =  db.query(sqlStr)

  console.log(topics)

})



/*
文章路由
 */
router
  .get('/article', articlesController.list)
  .get('/article/:id', articlesController.one)
  .post('/article', articlesController.create)
  .patch('/article/:id', articlesController.update)
  .delete('/article/:id', articlesController.destroy)


/*
上传文件
 */
router
  .post('/uploadImg', uploadFileController.uploadImg)


/*
备选项
 */
router
  .get('/options', optionsController.one)
  .patch('/options', optionsController.update)


module.exports = router