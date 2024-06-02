const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000
const AUTH_TOKEN = 'MI0GxEaeEWmdjvS2S8XFHb'
const FILE_PATH = path.join(__dirname, 'text.txt')

app.use(bodyParser.text())

// Middleware kiểm tra authorization
const checkAuth = (req, res, next) => {
  const token = req.headers['authorization']
  if (token && token === AUTH_TOKEN) {
    next()
  } else {
    res.status(403).json({ error: 'Forbidden' })
  }
}

// API POST /api/v1/update
app.post('/api/v1/update', checkAuth, (req, res) => {
  const text = req.body + '\n'
  fs.writeFile(FILE_PATH, text, err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to write to file' })
    }
    res.json({ message: 'Updated successfully' })
  })
})

app.post('/api/v1/push', checkAuth, (req, res) => {
  const text = req.body
  fs.appendFile(FILE_PATH, text + '\n', err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to append to file' })
    }
    res.json({ message: 'Appended successfully' })
  })
})

// API GET /api/v1/read
app.get('/api/v1/read', checkAuth, (req, res) => {
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read file' })
    }
    res.send(data)
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
