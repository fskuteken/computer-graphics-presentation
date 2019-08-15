const path = require('path')
const fs = require('fs')
const express = require('express')
const exphbs = require('express-handlebars')

const port = process.env.PORT || 3000

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/slides', (req, res, next) => {
  const slidesPath = path.join(__dirname, 'views', 'slides')

  fs.readdir(slidesPath, (err, files) => {
    if (err) {
      next(err)
    } else {
      res.json(files.map(file => file.replace('.handlebars', '')))
    }
  })
})
app.get('/slides/:slideName', (req, res) => {
  res.render(`slides/${req.params.slideName}`, { layout: 'slide' })
})
app.use(express.static('public'))

app.listen(port, () => { console.log(`App listening on port ${port}`) })
