const glob = require('glob')
const express = require('express')
const exphbs = require('express-handlebars')

const port = process.env.PORT || 3000

const app = express()

function slides() {
  const files = glob.sync('views/slides/**/*.hbs')

  return files.map(file => file.replace('views/slides/', '').replace('.hbs', ''))
}

app.engine('hbs', exphbs({ extname: 'hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res, next) => {
  res.render('presentation', { layout: 'presentation' })
})

app.get('/slides', (req, res, next) => {
  res.json(slides())
})

app.get('/slides/:slideNumber', (req, res) => {
  res.render(`slides/${slides()[req.params.slideNumber]}`, { layout: 'slide' })
})

app.use(express.static('public'))

app.listen(port, () => { console.log(`App listening on port ${port}`) })
