const fs = require('fs'); 

proxyFileHelper = {};

//checks if the proxyList.json file exists, if it does not exist, then create one. 
proxyFileHelper.checkIfExist = function(callback) {
    fs.exists('../../proxyList.json', (exists) => {
        //if there is not a proxyList.txt, then create one.
        if (!exists) {
            let json_format = {"siteToTest":"", "proxies":{}}
            let json_string = JSON.stringify(json_format, null, 4)
            fs.writeFile('../../proxyList.json', json_string, (err) => {
                if (err) console.error('Error creating the proxyList');
            })
        }

        return callback(null);
    })
}

//gets all the proxies from the proxyList.json
proxyFileHelper.getAllProxies = function(callback) { 
    fs.readFile('../../proxyList.json', 'utf8', (err, proxyList) => {
        if (err) console.log(err); 
        let json_parsed = JSON.parse(proxyList);
        let proxies = Object.keys(json_parsed["proxies"])
    
        return callback(null, proxies); 
    })
}

proxyFileHelper.writeProxyResult = function(proxy, speed, callback) {

}

proxyFileHelper.addProxyToFile = function(proxy, callback) {

}

proxyFileHelper.removeProxyFromFile = function(proxy, callback) {

}


proxyFileHelper.checkIfExist(() =>{
    console.log('done')
})

module.exports = proxyFileHelper