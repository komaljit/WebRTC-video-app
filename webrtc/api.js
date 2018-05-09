// api call to django aerver
var API = 'http://127.0.0.1:8000';

function doRegister(payload){
    fetch(API+'/register/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(res){
        console.log("inside api file");
        return res;
    });
}

function getPeer(payload, callback){
    fetch(API+'/getpeer/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(res){
        console.log("inside getpeer api");
        return res.json();
    }).then(function(res){
        console.log("inside api file");
        callback(res);
    });
}

exports.getPeer = getPeer;
exports.doRegister = doRegister;

