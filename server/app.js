const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 5000

const uri = "mongodb+srv://saas_backend_1412:V11S5OY5Kq7w1s9e@cluster0.syqmf.mongodb.net/saas_startup?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected…')
})
.catch(err => console.log(err))

app.use('/', express.static('./dist', {
  index: "index.html"
}))

app.listen(port, () => console.log(`App listening on port ${port}!`))