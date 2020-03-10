// JavaScript Document

console.log("begin");

var mediaConstraints = {
  audio: true, 
  video: true 
};

var localStream = null;
var pc = null;
//var servers = null;


var servers = {"iceServers": 
	    [
            {"url": "stun:stun.l.google.com:19302"}
	    ]
        };

		
navigator.getUserMedia = (
	navigator.getUserMedia ||
	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia ||
	navigator.msGetUserMedia
);

RTCPeerConnection = (
	RTCPeerConnection ||
	webkitRTCPeerConnection ||
	mozRTCPeerConnection ||
	msRTCPeerConnection
);

RTCSessionDescription = (
	RTCSessionDescription ||
	webkitRTCSessionDescription ||
	mozRTCSessionDescription ||
	msRTCSessionDescription
);

RTCIceCandidate = (
	RTCIceCandidate ||
	webkitRTCIceCandidate ||
	mozRTCIceCandidate ||
	msRTCIceCandidate
);

if(!RTCPeerConnection) {
	console.log ('Your browser doesn\'t support WebRTC');
	document.getElementById('debug').innerHTML += "Your browser does not support WebRTC<br>";

	}

function getUserMedia_click() {
document.getElementById('debug').innerHTML += 'getUserMedia_click<br>';
  console.log("getUserMedia_click()");
  navigator.getUserMedia(
    streamConstraints,
    getUserMedia_success,
    getUserMedia_error
  );
}

function getUserMedia_success(stream) {
  console.log("getUserMedia_success():", stream);
  localVideo.src = URL.createObjectURL(stream); // Подключаем медиапоток к HTML-элементу <video>
//  localVideo1.srcObject = stream;
  localStream = stream; // и сохраняем в глобальной переменной для дальнейшего использования
}

function getUserMedia_error(error) {
  console.log("getUserMedia_error():", error);
document.getElementById('debug').innerHTML += error;
}


///////////////////

