var router = require('express').Router();
var CoinMarketCap = require("node-coinmarketcap");
var coinmarketcap = new CoinMarketCap();
const webhoseio = require('webhoseio');
const request = require('request');
const config = require('../config/config');

var url = config.bitNews;
router.get('/prices', (req, res)=>{
  request({
    url,
    json:  true }, (error, response, body) => {
      if(!error && response.statusCode === 200){
          var articles = body.articles
          coinmarketcap.multi(coins => {
            var coins = coins.getTop(100)
            res.render('contents/price', {coins: coins, articles: articles})
          });
      }else{
        callback('Unable to fetch the news');
      };
    });
});


router.get('/news', (req, res)=>{
  request({
    url,
    json:  true }, (error, response, body) => {
      if(!error && response.statusCode === 200){
          var articles = body.articles
          coinmarketcap.multi(coins => {
            var coins = coins.getTop(100)
            res.render('contents/news', {coins: coins, articles: articles})
          });
      }else{
        callback('Unable to fetch the news');
      };
    });
});

router.get('/indianews', (req, res) =>{
  const client = webhoseio.config({token: '9d37907e-e7eb-49bb-87c8-a2ba1e718a42'});
    const query_params = {
	"q": "language:english site_type:news thread.country:IN",
	"ts": "1526974134835",
	"sort": "crawled"
    }
    client.query('filterWebContent', query_params)
    .then(output => {
      var posts = output['posts'];
      
      res.render('contents/indiaNews', {posts: posts})
        // console.log(output['posts'][0]['text']); // Print the text of the first post
        // console.log(output['posts'][0]['published']); // Print the text of the first post publication date
    });
})
var Feed = require('rss-to-json');
router.get('/bhaskar', (req, res) => {

  Feed.load('https://www.bhaskar.com/rss-feed/2338/', function(err, rss){
    var rss = rss.items;
    res.render('contents/bhaskar', {posts: rss})
  });   
});
    
module.exports = router;
