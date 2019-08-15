const path = require('path')
const fs = require('fs')
const express = require('express')
const exphbs = require('express-handlebars')

const port = process.env.PORT || 3000

const app = express()

app.engine('hbs', exphbs({ extname: 'hbs' }))
app.set('view engine', 'hbs')

app.get('/slides', (req, res, next) => {
  const slidesPath = path.join(__dirname, 'views', 'slides')

  fs.readdir(slidesPath, (err, files) => {
    if (err) {
      next(err)
    } else {
      res.json(files.map(file => path.parse(file).name))
    }
  })
})
app.get('/slides/:slideName', (req, res) => {
  res.render(`slides/${req.params.slideName}`, { layout: 'slide' })
})
app.use(express.static('public'))

app.listen(port, () => { console.log(`App listening on port ${port}`) })
