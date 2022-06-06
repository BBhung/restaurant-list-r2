//載入express
const express = require('express') 
const port = 3000
const app = express()

//載入express-handlebars 樣本引擎
const exphbs = require('express-handlebars') 
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
const Restaurant = require('./models/Restaurant') 
//const methodOverride = require('method-override') 
//app.use(methodOverride('_method')) 
//app.use(express.urlencoded({ extended: true}))

// 引用 body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

//載入mongoose
const mongoose = require('mongoose') 
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

//設定靜態檔案
app.use(express.static('public')) 

//設定首頁路由
app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurantsData => res.render("index", { restaurantsData }))
    .catch(err => console.log(err))
})

//設定新增路由
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//設定每個餐廳資訊
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurantsData => res.render('detail', { restaurantsData }))
    .catch(error => console.log(error))
})

//編輯餐廳資訊
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurantsData => res.render('edit', { restaurantsData }))
    .catch(error => console.log(error))
})

//更新餐廳資訊
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurantsData => {
      restaurantsData.name = req.body.name
      restaurantsData.name_en = req.body.name_en
      restaurantsData.category = req.body.category
      restaurantsData.image = req.body.image
      restaurantsData.location = req.body.location
      restaurantsData.phone = req.body.phone
      restaurantsData.google_map = req.body.google_map
      restaurantsData.rating = req.body.rating
      restaurantsData.description = req.body.description
      return restaurantsData.save()
    })
    .then(()=> res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//刪掉餐廳
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurantsData => restaurantsData.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//設定餐廳名字和類別搜尋找到特定的餐廳
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter( restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurants: restaurants, keyword: keyword})
})


app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})