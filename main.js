require('dotenv').config()
const express = require('express')
const app = express()

const db = require("./helpers/db.helper")

const host = process.env.HOST
const port = process.env.PORT

app.get('/', async (req, res) => {
  // res.send('Welcome to article-cache Web Service!')
  qres = await db.pgPool("SELECT * FROM articles", [])
  res.send(qres)
})





app.listen(port, () => {
  console.log(`Example app listening at ${host}:${port}`)
})