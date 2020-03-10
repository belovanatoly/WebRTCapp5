// JavaScript Document

console.log("begin");

var socket = io.connect();

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
	
	document.getElementById('debug').innerHTML += "begin<br>";
	
function getUserMedia_click(){
	document.getElementById('logs').innerHTML="getUserMedia is clicked";
	getUserMedia();
}

function getUserMedia(){
	navigator.getUserMedia(mediaConstraints,
		function (stream)
		{
			localStream = stream;
			//console.log(stream.getTracks()[0]);
			//console.log(stream.getTracks()[1]);

			console.log("MediaStream is created");
			console.log(stream);
			document.getElementById('debug').innerHTML += "MediaStream is created<br>";
			
			video = document.getElementById('localVideo');
			//video.srcObject = stream;
			video.src = URL.createObjectURL(stream);
			video.autoplay = true;
   			video.muted = true;

		},
		function (err)
		{
			console.error(err);
			document.getElementById('debug').innerHTML += err +'<br>';
		}
	);
}




///////////////////

