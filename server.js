const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 5003
const AUTH_TOKEN = 'MI0GxEaeEWmdjvS2S8XFHb'
// const FILE_PATH = path.join(__dirname, 'text.txt')

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
app.post('/api/v1/update/:filename', checkAuth, (req, res) => {
  const filename = req.params.filename
  const filePath = path.join(__dirname, `${filename}.txt`)

  const text = req.body + '\n'
  fs.writeFile(filePath, text, err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to write to file' })
    }
    res.json({ message: 'Updated successfully' })
  })
})

app.post('/api/v1/push/:filename', checkAuth, (req, res) => {
  const filename = req.params.filename
  const filePath = path.join(__dirname, `${filename}.txt`)

  const text = req.body
  fs.appendFile(filePath, text + '\n', err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to append to file' })
    }
    res.json({ message: 'Appended successfully' })
  })
})

// API GET /api/v1/read
app.get('/api/v1/read/:filename', checkAuth, (req, res) => {
  const filename = req.params.filename
  const filePath = path.join(__dirname, `${filename}.txt`)
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read file' })
    }
    res.send(data)
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
