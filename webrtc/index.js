var userMedia = require('getusermedia');
var API = require('./api');


userMedia({ video: true, audio: true }, function (err, stream) {
    if (err) return console.error(err);

    var Peer = require('simple-peer');
    var peer = new Peer({
        initiator: location.hash === '#init',
        trickle: false,
        stream: stream
    });

    peer.on('signal', function (data) {
        console.log('hereeeeeee');
        document.getElementById('yourId').value = JSON.stringify(data);
        var payload = {};
        payload ['rtc_id'] = JSON.stringify(data);
        payload ['email'] = document.getElementById('email').value;
        console.log(payload.email);
        API.doRegister(payload)
        // document.getElementById('yourId').value = JSON.stringify(data);
    });

    document.getElementById('connect').addEventListener('click', function () {
        var payload = {};
        payload['otherId'] = JSON.parse(document.getElementById('otherId').value);
        api.getPeer(payload).then(function(res){
            console.log("inside api file");
            return res;
        });

        // peer.signal(otherId);
    });

    // document.getElementById('api').addEventListener('click', function () {
    //     console.log("api button working");
    //     var payload = {};
    //     var yourId = JSON.parse(document.getElementById('yourId').value);
    //     payload ['rtc_id'] = JSON.stringify(yourId);
    //     payload ['email'] = document.getElementById('email').value;
    //     console.log(payload.email);
    //     API.doRegister(payload);
    // });

    document.getElementById('send').addEventListener('click', function () {
        var yourMessage = document.getElementById('yourMessage').value;
        peer.send(yourMessage)
    });

    peer.on('data', function (data) {
        document.getElementById('messages').textContent += data + '\n'
    });

    peer.on('stream', function (stream) {
        var video = document.createElement('video');
        document.body.appendChild(video);

        video.src = window.URL.createObjectURL(stream);
        video.play()
    })
});

