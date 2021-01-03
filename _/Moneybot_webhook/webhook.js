'use strict';
const Restify = require('restify');
const server = Restify.createServer({
  name: "MoneyBot"
});
const request = require('request');
const PORT = process.env.PORT || 3000;

server.use(Restify.bodyParser());
server.use(Restify.jsonp());

const convertCurrency = (amountToConvert, outputCurrency, cb) => {
  const {
    amount,
    currency
  } = amountToConvert;
  return request({
    url: "https://api.fixer.io/latest",
    qs: {
      base: currency,
      symbols: outputCurrency
    },
    method: 'GET',
    json: true
  }, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      let computedValue = Math.round(body.rates[outputCurrency] * amount);
      cb(null, `${amount} ${currency} converts to about ${outputCurrency} ${computedValue} as per current rates!`);
    } else {
      cb(error, null);
    }
  });

}

// POST route handler
server.post('/', (req, res, next) => {
  let {
    status,
    result
  } = req.body;

  if(status.code === 200 && result.action === 'convert') {
    const {
      outputCurrency,
      amountToConvert
    } = result.parameters;

      // Check if input currency code === output currency code
      if(amountToConvert.currency === outputCurrency) {
        const {
          amount,
          currency
        } = amountToConvert;
        let responseText = `Well, ${amount} ${outputCurrency} is obviously equal to ${amount} ${outputCurrency}!`;
        res.json({
          speech: responseText,
          displayText: responseText,
          source: "moneybot-webhook"
        });
      } else {
        // Query the fixer.io API to fetch rates and create a response
        convertCurrency(amountToConvert, outputCurrency, (error, result) => {
          if(!error && result) {
            res.json({
              speech: result,
              displayText: result,
              source: "moneybot-webhook"
            });
          }
        });
      }
  }

  return next();
});

server.listen(PORT, () => console.log(`MoneyBot running on ${PORT}`));
