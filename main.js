require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express')

const { articleRoutes } = require('./routes/article.route');

const host = process.env.HOST
const port = process.env.PORT

const app = express()

app.use(express.urlencoded({ extended: false })) 
app.use(express.json())

app.get('/', async (req, res) => {
  res.send('Welcome to article-cache Web Service by Alif Ramdani!')
})

// Other routes
articleRoutes(app)

app.listen(port, () => {
  console.log(`Server listening at ${host}:${port}`)
})