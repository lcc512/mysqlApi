const express=require('express')
const router=require('./router')
const session=require('express-session')
var bodyParser = require('body-parser')


const app=express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(session({
  secret:'itcast',
  resave:false,
  saveIninitialized:false
}))

app.use('/mobileapp',router.routerMobileApp)
app.use('/myBlog',router.routerMyBlog)

// 统一处理500错误，用next方法，查看node最后讲的那些
app.use((err,req,res,next)=>{

  res.status(500).json({
    error:err.message
  })
})

app.get('/',(req,res,next)=>{
  res.status(200).send('api server is running...222')
})

app.listen(3333,()=>{
  console.log('App is running at port 3333')
})