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

function getPeer(payload){
    fetch(API+'/getpeer/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(function(res){
        console.log("inside getpeer api");
        return res;
    });
}

// export getPeer = getPeer;
exports.getPeer = getPeer;
exports.doRegister = doRegister;


// fetch(`${api}/users/`, {
//         method: 'POST',
//         headers: {
//             ...headers,
//         'Content-Type': 'application/json'
//     },
//     /*credentials:'include',*/
//     body: JSON.stringify(payload),
//     credentials:'include'
// }).then(res => {
//
//     return res.json();
// })
// .catch(error => {
//     console.log("This is error");
// return error;
// });