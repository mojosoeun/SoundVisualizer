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

//opening the input asks the user to activate their mic
motu.open(function(){
	//opening is activates the microphone
	//starting lets audio through
	motu.start(10);
  console.log("!!!!!")
});
