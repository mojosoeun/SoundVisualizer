(function() {
  'use strict';

  function SoundCloudService($http) {
    var service = {};
    var audioCtx = null,
        _stream = null,
        intv = null,
        streamUrl = "",
        audio = document.querySelector('audio');
    service.scResponse = null;

    service.init = function() {
      SC.initialize({
        client_id: SOUNDCLOUD_APT_KEY
      });
    }

    service.searchSoundCloud = function(query) {
      return $http.get('https://api.soundcloud.com/tracks.json?client_id=' + SOUNDCLOUD_APT_KEY + '&q=' + query + '&limit=1').
      then(function(response) {
        service.scResponse = response.data;
        console.debug("SoundCloud link: ", service.scResponse[0].permalink_url);
        streamUrl = service.scResponse[0].stream_url + '?client_id=' + SOUNDCLOUD_APT_KEY;
        return service.scResponse;
      });
    };

    service.startVisualizer = function(){

      audio.setAttribute('src', streamUrl);
      audio.play();

      var errorCallback = function(e) {
        console.log('Reeeejected!', e);
      };

      audioCtx = new (window.AudioContext || window.webkitAudioContext);
      var source = audioCtx.createMediaElementSource(audio);
      // var filter = audioCtx.createBiquadFilter();

      var analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      audio.crossOrigin = "anonymous";
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      var bufferLength = analyser.frequencyBinCount;
      console.log(bufferLength);

      var dataArray = new Uint8Array(bufferLength);

      function draw() {
        analyser.getByteTimeDomainData(dataArray);
        drawCanvas(dataArray,bufferLength);
      };

      intv = setInterval(function(){ draw() }, 1000 / 30);
    };

    service.stopVisualizer = function(){
      clearInterval(intv);
      audio.pause();
      audioCtx.close();
      // _stream.getAudioTracks()[0].stop();
    }
    return service;
  }

  function drawCanvas(dataArray,bufferLength){
    var canvas = document.getElementById('visualizer');
    var canvasCtx = canvas.getContext("2d");

    var WIDTH = 150;
    var HEIGHT = 150;

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.strokeStyle = 'rgb(255,255,255)';

    canvasCtx.lineWidth = 2;
    canvasCtx.beginPath();

    var sliceWidth = WIDTH * 1.0 / bufferLength;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {
      var data = dataArray[i];
      var v = data / 128.0;
      var y = v * HEIGHT/2;

      if(i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }
    canvasCtx.lineTo(canvas.width, canvas.height/2);
    canvasCtx.stroke();
  }

  angular.module('SmartMirror')
  .factory('SoundCloudService', SoundCloudService);

}());
