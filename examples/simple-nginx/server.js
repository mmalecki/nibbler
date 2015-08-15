var http = require('http')
var redis = require('redis')
var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())

var client = redis.createClient()

app.get('/todo', function(req, res) {
  client.lrange('todos', 0, -1, function(err, content) {
    if (err) res.status(500).json({ message: err.message })
    res.status(200).json(content)
  })
})

app.post('/todo', function(req, res) {
  client.lpush('todos', req.body.todo, function(err) {
    if (err) res.status(500).json({ message: err.message })
    res.status(200).send()
  })
})

app.listen(3000)
