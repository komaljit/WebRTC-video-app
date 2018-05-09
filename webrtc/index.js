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
        console.log('here');
        var payload = {};
        localStorage.setItem("yourId", data);
        payload ['rtc_id'] = JSON.stringify(data);
        payload ['email'] = localStorage.getItem('user');
        console.log(payload.email);
        API.doRegister(payload)
        // document.getElementById('yourId').value = JSON.stringify(data);
    });

    document.getElementById('connect').addEventListener('click', function () {
        var payload = {};
        payload['email'] = document.getElementById('otherId').value;
        API.getPeer(payload,function(res){
            console.log("inside api file");
            console.log(res);
            // var otherId = JSON.parse(document.getElementById('otherId').value);
            var otherId = JSON.parse(res.rtc_id);
            peer.signal(otherId);
        });
    });


    peer.on('stream', function (stream) {
        var video = document.createElement('video');
        document.body.appendChild(video);

        video.src = window.URL.createObjectURL(stream);
        video.play()
    })
});

