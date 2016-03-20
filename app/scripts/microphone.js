'use strict';

/**
 * @ngdoc function
 * @name soundVisualizerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the soundVisualizerApp
 */
//select the third input
var motu = new Tone.ExternalInput(3);
var jsNode = Tone.context.createScriptProcessor(4096, 1, 1);
jsNode.noGC();
motu.connect(jsNode);
var audioBuffer = Tone.context.createBuffer(1, Tone.context.sampleRate * 100, Tone.context.sampleRate);
var bufferArray = this.audioBuffer.getChannelData(0);
var bufferPosition = 0
//opening the input asks the user to activate their mic

var open = function(){
	jsNode.onaudioprocess = _onprocess.bind();
	motu.open(callback, err);
}

var start = function() {
	//0 out the buffer
	for (var i = 0; i < bufferArray.length; i++){
		bufferArray[i] = 0;
	}
	bufferPosition = 0;
	motu.start();
};

var _onprocess = function(event){
	//meter the input
	var bufferSize = jsNode.bufferSize;
	// var smoothing = 0.3;
	var input = event.inputBuffer.getChannelData(0);
	var x;
	var recordBufferLen = bufferArray.length;
	for (var i = 0; i < bufferSize; i++){
		x = input[i];
			// sum += x * x;
		//if it's recording, fill the record buffer
		// if (this.isRecording){
		// 	if (this.bufferPosition < recordBufferLen){
		// 		this.bufferArray[this.bufferPosition] = x;
		// 		this.bufferPosition++;
		// 	} else {
		// 		this.stop();
		// 		//get out of the audio thread
		// 		setTimeout(this.onended.bind(this), 5);
		// 	}
		// }
	}
	// var rms = Math.sqrt(sum / bufferSize);
	// this.meter = Math.max(rms, this.meter * smoothing);
};

open(function(){

})
