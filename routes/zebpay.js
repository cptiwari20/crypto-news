var router = require('express').Router();
const request = require('request');
const config = require('../config/config');
const url = config.zebpayApi;

router.get('/indian', (req, res)=>{
  request({
    url,
    json:  true }, (error, response, body) => {
      if(!error && response.statusCode === 200){
          var pairs = body;
          res.render('contents/indian', {pairs: pairs, ExName: "ZebPay Exchange"})
      }else{
        callback('Unable to fetch the ZebPay data');
      };
    });
});


module.exports = router;
