const proxyFileHelper = require('./proxyFileHelper.js'); 
const request = require('request');

const proxyTester = {}; 

proxyTester.testAllProxies = function(callback) {
    proxyFileHelper.getSiteToTestOn((err, data) => {
        let site_to_test_on = data; 
        proxyFileHelper.getRandomUserAgent((err, data) => {
            let user_agent = data; 
            var start = Date.now()
            request.get({
                url: site_to_test_on,
                headers : { 'User-Agent': user_agent }, 
                time : true
                }, function(error, response, body){
                    console.log('Request time in ms', Date.now() - start);
                });
        })  
    })
}
proxyTester.testAllProxies()
module.exports = proxyTester; 