const express = require('express')

const port = process.env.PORT || 3000

const app = express()

app.use(express.static('public'))

app.listen(port, () => { console.log(`App listening on port ${port}`) })
