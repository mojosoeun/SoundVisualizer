'use strict';

/**
 * @ngdoc function
 * @name soundVisualizerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the soundVisualizerApp
 */
//select the third input
// var ExternalInput = function(bufferDuration){
//
// 	this.motu = new Tone.ExternalInput(3);
// 	this.jsNode = Tone.context.createScriptProcessor(4096, 1, 1);
// 	this.jsNode.noGC();
// 	this.motu.connect(this.jsNode);
// 	this.audioBuffer = Tone.context.createBuffer(1, Tone.context.sampleRate * 100, Tone.context.sampleRate);
// 	this.bufferArray = this.audioBuffer.getChannelData(0);
// 	this.bufferPosition = 0;
// 	this.isRecording = false;
// 	this._bufferDuration = bufferDuration;
// 	this.meter = 0;
// 	this.onended = Tone.noOp;
// }
//
// ExternalInput.prototype.open = function(callback, err){
// 	jsNode.onaudioprocess = _onprocess.bind();
// 	motu.open(callback, err);
// }
//
// ExternalInput.prototype.start = function() {
// 	//0 out the buffer
// 	for (var i = 0; i < this.bufferArray.length; i++){
// 		this.bufferArray[i] = 0;
// 	}
// 	this.bufferPosition = 0;
// 	this.head = 0;
// 	this.motu.start();
// };
//
// ExternalInput.prototype._onprocess = function(event){
// 	//meter the input
// 	var bufferSize = this.jsNode.bufferSize;
// 	// var smoothing = 0.3;
// 	var input = event.inputBuffer.getChannelData(0);
// 	var x;
// 	var recordBufferLen = this.bufferArray.length;
// 	for (var i = 0; i < bufferSize; i++){
// 		x = input[i];
//     	// sum += x * x;
// 		//if it's recording, fill the record buffer
// 		if (this.isRecording){
// 			if (this.bufferPosition < recordBufferLen){
// 				this.bufferArray[this.bufferPosition] = x;
// 				this.bufferPosition++;
// 			} else {
// 				this.stop();
// 				//get out of the audio thread
// 				setTimeout(this.onended.bind(this), 5);
// 			}
// 		}
// 		}
// 	};
//
// ExternalInput.prototype.setBuffer = function(buffer){
// 	var targetArray = this.audioBuffer.getChannelData(0);
// 	var copyArray = buffer.getChannelData(0);
// 	for (var i = 0; i < copyArray.length; i++){
// 		targetArray[i] = copyArray[i];
// 	}
// };
//
// return motu;
// }

var promisifiedOldGUM = function(constraints, successCallback, errorCallback) {

  var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
  if(!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
  }
  return new Promise(function(successCallback, errorCallback) {
      getUserMedia.call(navigator, constraints, successCallback, errorCallback);
    });

}

if(navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if(navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
}

var constraints = { audio: true, video: false };
navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
	console.log(stream);
  //gotStream(stream)
})
.catch(function(err) {
  console.log(err.name + ": " + err.message);
});


function gotStream(stream) {

		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		var audioCtx = new AudioContext();
		var source = audioCtx.createMediaElementSource(stream);
    // console.log(document.querySelectorAll('audio')[1]);
    // console.log(source);
    var analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    analyser.getByteTimeDomainData(dataArray);

    var WIDTH = 300;
    var HEIGHT = 150;

    function draw() {
        analyser.getByteTimeDomainData(dataArray);
        port.postMessage({arr: dataArray, bufferLength: analyser.frequencyBinCount});
    };
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        port = chrome.runtime.connect({name: "visualizer"});
        var intv = setInterval(function(){draw()}, 1000 / 30);
        port.onDisconnect.addListener(function(){clearInterval(intv)});
    });
}
