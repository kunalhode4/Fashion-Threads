const connectToMongo = require('./db');
const path = require('path');
var cors = require('cors');
connectToMongo();

const express = require('express')
const app = express()
const host = "172.20.10.5"
const port = 5000


app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/product'));
app.use('/api', require('./routes/order'));
app.use('/api', require('./routes/review'));

app.listen(port, host, () => {
  console.log(`Example app listening ${host} on port ${port}`)
})
