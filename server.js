const path = require('path')
const fs = require('fs')
const express = require('express')

const port = process.env.PORT || 3000

const app = express()

app.get('/slides', (req, res, next) => {
  const slidesPath = path.join(__dirname, 'public', 'slides')

  fs.readdir(slidesPath, (err, files) => {
    if (err) {
      next(err)
    } else {
      res.json(files)
    }
  })
})
app.use(express.static('public'))

app.listen(port, () => { console.log(`App listening on port ${port}`) })
