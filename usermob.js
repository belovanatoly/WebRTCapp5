// JavaScript Document

var localStream = null;
var streamConstraints = { "audio": false, "video": true };

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  navigator.getUserMedia(
    streamConstraints,
    getUserMedia_success,
    getUserMedia_error
  );

function getUserMedia_success(stream) {

  document.getElementById('debug').innerHTML += 'getUserMedia_success 2';
  localVideo.src = URL.createObjectURL(stream); 
//  localVideo1.srcObject = stream;
}

function getUserMedia_error(error) {
 console.log("getUserMedia_error():", error);
// document.getElementById('debug').innerHTML += error;
}

