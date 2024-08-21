const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 5003
const AUTH_TOKEN = 'MI0GxEaeEWmdjvS2S8XFHb'
// const FILE_PATH = path.join(__dirname, 'text.txt')

app.use(bodyParser.text())
// app.use(bodyParser.json({}))
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
// app.use(bodyParser.text({ limit: '100mb' }))
app.use(
  bodyParser.raw({
    limit: '1000mb',
    inflate: false,
    parameterLimit: 10000000
  })
)

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

app.get('/api/v1/files', checkAuth, (req, res) => {
  const directoryPath = __dirname

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan directory' })
    }

    const txtFiles = files
      .filter(file => path.extname(file) === '.txt')
      .map(file => path.basename(file, '.txt'))
    res.json({ files: txtFiles })
  })
})

app.post('/', checkAuth, (req, res) => {
  console.log(req.body)
  console.log(JSON.parse(req.body))
  res.json({ message: 'hello world' })
})

app.get('/', checkAuth, (req, res) => {
  res.json({ message: 'health-check OK' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Request invalid' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
