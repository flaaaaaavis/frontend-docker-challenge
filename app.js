const express = require('express')
const app = express()
const port = 5000

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Frontend app listening on port ${port}`)
})