const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const feedparser = require('ortoo-feedparser');
const app = express();
const config = require('./config/config');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//url
var bhaskarUrl = config.bhaskarUrl;

// app.get('/mpnews', (req, res)=>{
//   feedparser.parseUrl(bhaskarUrl)
//     .on('response',  function(response, err) {
//       if(err){
//         console.log("Failed to parse article", err);
//       }
//       var article = response;
//       res.render('mpnews', {article: article});
//   });
// })

 


app.get('/', (req, res) =>{
  res.render('home')
});
app.get('/about', (req, res) =>{
 res.render('about')
});
var newsRoutes = require('./routes/news');
var zebRoutes = require('./routes/zebpay');
var KoinexRoutes = require('./routes/exchanges');
app.use(newsRoutes);
app.use(zebRoutes);
app.use(KoinexRoutes);

app.listen(3000, (req, res, err) =>{
  if(err){
    console.log("Failed to start the server", err);
  }
  console.log('Server Has been started');
});
