const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const connectionString = "mongodb://localhost:27017/"
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('project')
    const quotesCollection = db.collection('trains')

	app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))


	app.get('/', function (req, res) {
	   res.render('home.ejs' );
	})
	app.get('/add', function (req, res) {
    res.render('add.ejs' );
 })
 app.get('/user', function (req, res) {
  res.render('user.ejs' );
})
 app.get('/del', function (req, res) {
  res.render('Delete.ejs' );
})
app.get('/upd', function (req, res) {
  res.render('Update.ejs' );
})
	
    app.get('/show', (req, res) => {
      db.collection('trains').find().toArray()
        .then(trains => {
          res.render('Train_details.ejs', { alltrains: trains })
        })
    })
    app.post('/trains', (req, res) => {
      db.collection('trains').insertOne(req.body)
        .then(result => {
			 res.redirect('/show')
        })
		.catch(error => console.error(error))
    })
    app.post('/users', (req, res) => {
      db.collection('users').insertOne(req.body)
        .then(result => {
			 res.redirect('/show')
        })
		.catch(error => console.error(error))
    })
    app.put('/update', (req, res) => {
            db.collection('trains').findOneAndUpdate(
              { train_number : req.body.train_number },
              {
                $set: {
                  train_duration: req.body.train_duration,
                  source_location: req.body.source_location,
                  destination_location: req.body.destination_location,
                  date: req.body.date_r
                }
              },
              {
                upsert: true
              }
            )
              .then(result => {
                res.redirect('/show')
                 })
              .catch(error => console.error(error))
          })
    app.delete('/delete', (req, res) => {
      db.collection('trains').deleteOne(
        { train_number: req.body.train_number }
      )
        .then(result => {
          res.redirect('/show')
          if (result.deletedCount === 0) {
            return res.json('No Train to delete')
          }
          
        })
        .catch(error => console.error(error)) 
    })

	
    app.listen(8081, function () {
	console.log('listening on 8081')
    })
  })
  .catch(console.error)

  



