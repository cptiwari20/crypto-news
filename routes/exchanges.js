var router = require('express').Router();
const cloudscraper = require('cloudscraper');
const request = require('request')
const config = require('../config/config');
const kurl = config.koinexApi;
const url = config.zebpayApi;

// var koins = [];
// function coins()){
//   return cloudscraper.get(kurl, function(error, response, body) {
//     if (error) {
//       console.log('Error occurred');
//     } else {
//       var body = JSON.parse(body);
//       var Koins = body.stats.inr;
//       return Koins.BTC;
//     }
//   });
// } 
// console.log('Koins:', coins())
var data = '';
request('https://bitbns.com/order/getTickerWithVolume/', {json:true}, (error, response, body) =>{
  if(!error && response.statusCode === 200){
    body.BTC === data;
  }else(
    console.log("unable to fetch data")
  )
})

console.log(data)


router.get('/compare', (req, res)=>{
  cloudscraper.get(kurl, function(error, response, body) {
    if (error) {
      console.log('Error occurred');
    } else {
      var body = JSON.parse(body);
      var Koins = body.stats.inr;
      request('https://www.buyucoin.com/api/v1.2/currency/markets', {json:true},
        (error, response, body) => {
         var Bcoins = body.data;     
      request('https://www.unocoin.com/trade?all', {json:true}, 
              (error, response, body)=>{
              var UnoCoin = body.avg;
        request({
          url, 
          json:  true }, (error, response, body) => {
            if(!error && response.statusCode === 200){
                var coins = body;
                res.render('contents/compare', 
                {Koins: Koins, Zcoins: coins, UnBTC: UnoCoin, Bcoins: Bcoins})
                
            }else{
              callback('Unable to fetch the ZebPay data');
            };
          });
        })
      })    
    }
  });
})

module.exports = router;
