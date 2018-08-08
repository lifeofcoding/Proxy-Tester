const fs = require('fs'); 

proxyFileHelper = {};

//read the proxyList.json 
proxyFileHelper.readProxyFile = function(callback) { 
    fs.readFile('../../proxyList.json', 'utf8', (err, data) => {
        if (err) console.log(err); 
        let parsed_json = JSON.parse(data); 

        return callback(null, parsed_json); 
    })
}
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

//gets the name of the site to test the proxies (taken from the proxyList.json file)
proxyFileHelper.getSiteToTestOn = function(callback) {
    fs.readFile('../../proxyList.json', 'utf8', (err, proxyList) => {
        if (err) console.log(err); 
        let json_parsed = JSON.parse(proxyList);
        let site_to_test = json_parsed["siteToTest"]
    
        return callback(null, site_to_test); 
    })
}

//gets all the proxies from the proxyList.json in a list.
proxyFileHelper.getAllProxies = function(callback) { 
    fs.readFile('../../proxyList.json', 'utf8', (err, proxyList) => {
        if (err) console.log(err); 
        let json_parsed = JSON.parse(proxyList);
        let proxies = Object.keys(json_parsed["proxies"])
    
        return callback(null, proxies); 
    })
}

//writes the result proxy test
proxyFileHelper.writeProxyResult = function(proxy, speed, callback) {
    proxyFileHelper.readProxyFile((err, data) => {
        let edited_proxy_list = data
        if (edited_proxy_list['proxies'].hasOwnProperty(proxy)) { // if the proxy is not already in the file
            let result = (speed < 1000) ? "Good" : "Bad";
            edited_proxy_list['proxies'][proxy] = {'speed': speed, 'result':result}; 
            let stringify_data = JSON.stringify(edited_proxy_list, null, 4); 
            fs.writeFile('../../proxyList.json', stringify_data, (err) => {
                if (err) console.log(err); 
                return callback()
            })
        }
    })
}

proxyFileHelper.addProxyToFile = function(proxy, callback) {
        proxyFileHelper.readProxyFile((err, data) => {
            let edited_proxy_list = data
            if (!edited_proxy_list['proxies'].hasOwnProperty(proxy)) { // if the proxy is not already in the file
                edited_proxy_list['proxies'][proxy] = {'speed':'', 'result':''}; 
                let stringify_data = JSON.stringify(edited_proxy_list, null, 4); 
                fs.writeFile('../../proxyList.json', stringify_data, (err) => {
                    if (err) console.log(err); 
                    return callback()
                })
            }
        })
}

proxyFileHelper.removeProxyFromFile = function(proxy, callback) {
    proxyFileHelper.readProxyFile((err, data) => {
        let edited_proxy_list = data
        delete edited_proxy_list.proxy
        let stringify_data = JSON.stringify(edited_proxy_list); 

        fs.writeFile('../../proxyList.json', stringify_data, (err) => {
            if (err) console.log(err); 
            return callback()
        })
    })
}

proxyFileHelper.getRandomUserAgent = function(callback) {
    fs.readFile('../../useragents.txt', 'utf8', (err, data) => {
        let user_agents_list = data.split('\n')
        let random_num = Math.floor(Math.random() * user_agents_list.length - 1); // picks a random number from 1 to length of list
        let random_user_agent = user_agents_list[random_num].trim() // needs trim since there is white space 
        
        return callback(err, random_user_agent);  
    })
}

module.exports = proxyFileHelper