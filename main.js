require('dotenv').config()
const express = require('express')

const { articleRoutes } = require('./routes/article.route');

const host = process.env.HOST
const port = process.env.PORT

const app = express()

express.urlencoded({ extended: true })
express.json()

app.get('/', async (req, res) => {
  res.send('Welcome to article-cache Web Service!')
})

// Other routes
articleRoutes(app)

app.listen(port, () => {
  console.log(`Example app listening at ${host}:${port}`)
})