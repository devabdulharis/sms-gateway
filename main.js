const { readFileSync } = require('fs')
const express = require('express')
const axios = require('axios')
const port = process.env.PORT || 3000

const app = express()

app.get('/', (req, res) => {
  res.end(readFileSync('./example.html', 'utf-8'))
})

app.post('/', (req, res) => {
  const client = axios.create({
    baseURL: 'http://192.168.30.10:8080',
  });

  client.post(`/v1/sms/?phone=${req.query.number}&message=${req.query.body}`)
    .then(response => {
      if (response.status === false) {
        res.json({ // send response data
          status: "Pesan gagal Terkirim" // check command status
        })
      } else {
        res.json({ // send response data
          status: "Pesan Terkirim" // check command status
        })
      }
  });
})

app.listen(port, err => {
  if (err) throw err
  console.log(`App run on port ${port}`)
});