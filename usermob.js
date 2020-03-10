// JavaScript Document

var localStream = null;
var streamConstraints = { "audio": false, "video": true };
var pc1;
var pc2;
var servers = null;

var PeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection  || RTCPeerConnection;
if(!PeerConnection) throw 'Your browser doesn\'t support WebRTC';
//var IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate || ;
var SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;

document.getElementById('debug').innerHTML += 'begin';

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

function getUserMedia_success(stream) {
  console.log("getUserMedia_success():", stream);
  localVideo.src = URL.createObjectURL(stream); // Подключаем медиапоток к HTML-элементу <video>
//  localVideo.srcObject = stream;
  localStream = stream; // и сохраняем в глобальной переменной для дальнейшего использования
}

function getUserMedia_error(error) {
  console.log("getUserMedia_error():", error);
document.getElementById('debug').innerHTML += error;
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
///////////////////

