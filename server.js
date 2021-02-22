const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
var mongoConnect = 'mongodb+srv://MFCRUD:nWUROnh4VdGS4Nvj@crud.sk7mx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

console.log("Node is operating at 100%")

MongoClient.connect(mongoConnect, { useUnifiedTopology: true})
  .then(client => {
    console.log('Database: connected!')

    const db = client.db('first-crud')
    const stopsCollection = db.collection('stops')

    
    app.use(bodyParser.urlencoded({extended: true}))

    app.get('/', (req, res) => {
      db.collection('stops').find().toArray()
        .then(results => {
          res.render('index.ejs', { stops : results })
        })
        .catch(error => console.error(error))
        
    })

    app.get('/stopsJSON', (req, res) => {
      db.collection('stops').find().toArray()
        .then(results => {
          res.json({ stops : results })
        })
        .catch(error => console.error(error))
        
    })

    app.post('/stops', (req, res) => {
      stopsCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
          console.log(req.body.stop + " Stop added succesfully.")
        })
        .catch(error => console.error(error))
    })

    app.put('/stops', (req, res) => {
      stopsCollection.findOneAndUpdate(
        { stop: req.body.old },
        {
          $set: {
            stop: req.body.new 
          }
        })
        .then(result => {
          res.redirect('/')
          console.log("Stop updated succesfully.")
        })
        .catch(error => console.error(error))
    }) 
    
    app.delete('/stops', (req, res) => {
      stopsCollection.deleteOne(
        { stop: req.body.stop }
      )
      .then(result => {
        console.log(req.body.stop + " Stop deleted succesfully.")
      })
      .catch(error => console.error(error))
    })
  })
  .catch(error => console.error(error))
  
app.listen(3000, function() {
  console.log('Listens on 3K.')
})

