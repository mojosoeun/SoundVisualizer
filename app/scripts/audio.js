'use strict';

/**
 * @ngdoc function
 * @name soundVisualizerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the soundVisualizerApp
 */
//select the third input
var motu = new Tone.ExternalInput();

this.audioBuffer = Tone.context.createBuffer(1, Tone.context.sampleRate * 100, Tone.context.sampleRate);
this.bufferArray = this.audioBuffer.getChannelData(0);
//opening the input asks the user to activate their mic

start = function(){
	//0 out the buffer
	for (var i = 0; i < this.bufferArray.length; i++){
		this.bufferArray[i] = 0;
	}
	console.log(this.bufferArray);
	
};
