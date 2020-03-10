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


function newPeerConnection_click(){
	document.getElementById('logs').innerHTML = "newPeerConnection is clicked<br>";

pc = new RTCPeerConnection(servers);
if (pc) {
	console.log('pc is created');
	document.getElementById('debug').innerHTML += "pc is created<br>";
	console.log(pc);

		pc.addStream(localStream);
		//localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
			
		console.log("MediaStream is added");
		logs = document.getElementById('logs');
		logs.innerHTML="MediaStream is added";
		document.getElementById('debug').innerHTML += "MediaStream is added<br>";

		pc.onicecandidate = function (e){
			console.log("ICE candidate:");
			console.log(e.candidate);
			if (e.candidate) {document.getElementById('debug').innerHTML += "ICE candidate: " + e.candidate.candidate + '<br>';}
				else {document.getElementById('debug').innerHTML += "ICE candidate: null<br>";}
			socket.emit("message", {type: "candidate", candidate: e.candidate});
			};

		pc.onaddstream = function(e) {
			console.log("Stream received!");
			console.log(e.stream);
			document.getElementById('debug').innerHTML += "Stream received!<br>";
	
			var video = document.getElementById('remoteVideo');
			video.autoplay = true;
			video.muted = true;
			//video.srcObject = e.stream; 
			video.src = URL.createObjectURL(e.stream);
			};

		pc.oniceconnectionstatechange = function (e)
		{
			console.log('oniceconnectionstatechange');
			document.getElementById('debug').innerHTML += "oniceconnectionstatechange<br>";
			document.getElementById('debug').innerHTML += e.target.iceConnectionState + "<br>";
			console.log(e.target);
			document.getElementById('connection').innerHTML = e.target.iceConnectionState + " ... " + e.target.iceGatheringState;
		};
	
		}
	else {
		console.log('Error: pc is not created. please creat pc.');
		document.getElementById('debug').innerHTML += "Error: pc is not created. please creat pc.<br>";
		}
}



function createOffer_click(){	
	document.getElementById('logs').innerHTML = "createOffer is clicked<br>";
if (pc)	{
		document.getElementById('logs').innerHTML="Offer is sended";
		pc.createOffer(
			function(desc)
			{
				console.log('createOffer');
				document.getElementById('debug').innerHTML += "createOffer<br>";
				pc.setLocalDescription(desc);
				console.log('setLocalDescription');
				console.log(desc);
				document.getElementById('debug').innerHTML += "setLocalDescription<br>";
				socket.emit("message", desc);
			},
			function(err)
			{
				console.error(err);
				document.getElementById('debug').innerHTML += err + "<br>";
			}
		);
		}
		else console.log('error: pc is not created. please creat pc.');

		
}

function AudioOff_click(){
	document.getElementById('remoteVideo').muted = true;
}

function AudioOn_click(){
	document.getElementById('remoteVideo').muted = false;
}


///////////////////
socket.on('success', function ()
{
	console.log("socket.on connected");
	document.getElementById('debug').innerHTML += "socket.on connected<br>";
});


socket.on('message', function(message)
{
	console.log("Message from server:");
	console.log(message);
	if (message.type == "answer")
	{
		if (pc){
			pc.setRemoteDescription(new RTCSessionDescription(message));
			console.log('setRemoteDescription');
			console.log(message);
			document.getElementById('logs').innerHTML="Aswer is received";
			document.getElementById('debug').innerHTML += "Aswer is received<br>";
			document.getElementById('debug').innerHTML += "setRemoteDescription<br>";


			}
	}
	
	if (message.type == "offer")
	{
			console.log('Offer is received:');
			document.getElementById('logs').innerHTML="Offer is received";
			document.getElementById('debug').innerHTML += "Offer is received<br>";

			console.log(message);
			if(pc){
				pc.setRemoteDescription(new RTCSessionDescription(message));
				console.log('setRemoteDescription');
				console.log(message);
				document.getElementById('debug').innerHTML += "setRemoteDescription<br>";

				console.log('createAnswer');
				document.getElementById('debug').innerHTML += "createAnswer<br>";

				pc.createAnswer
				(function(desc)
				{
					pc.setLocalDescription(desc)
					console.log('setLocalDescription');
					console.log(desc);
					document.getElementById('debug').innerHTML += "setLocalDescription<br>";
					socket.emit("message", desc);
					document.getElementById('logs').innerHTML="Answer is sended";

				}, 
				function(err)
				{
					console.error(err);
					document.getElementById('debug').innerHTML += err+ "<br>";
				}
			);
			}
	}

	if (message.type == "candidate")
	{
			if (message.candidate)
			{
				console.log('IceCandidate is receved:');
				console.log(message.candidate);
				document.getElementById('debug').innerHTML += "IceCandidate is receved<br>";
				if (pc) {
					pc.addIceCandidate(new RTCIceCandidate(message.candidate));
					console.log('new IceCandidate is added');
					document.getElementById('debug').innerHTML += "new IceCandidate is added<br>";
					}
			}
	}
	
});


socket.on('error', function(err)
{
	console.log("Error!");
	console.error(err);
	document.getElementById('debug').innerHTML += "Error!<br>" + err + '<br>';

});

