// JavaScript Document

var localStream = null;
var streamConstraints = { "audio": false, "video": true };

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

//function getUserMedia_click() {
//document.getElementById('debug').innerHTML += 'getUserMedia_click<br>';
//  console.log("getUserMedia_click()");
  navigator.getUserMedia(
    streamConstraints,
    getUserMedia_success,
    getUserMedia_error
  );
//}

function getUserMedia_success(stream) {
  //console.log("getUserMedia_success():", stream);
  document.getElementById('debug').innerHTML += 'getUserMedia_success';
  localVideo.src = URL.createObjectURL(stream); // Подключаем медиапоток к HTML-элементу <video>
//  localVideo1.srcObject = stream;
  localStream = stream; // и сохраняем в глобальной переменной для дальнейшего использования
}

function getUserMedia_error(error) {
 // console.log("getUserMedia_error():", error);
//document.getElementById('debug').innerHTML += error;
}

