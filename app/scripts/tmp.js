(function() {
  'use strict';

  function SoundCloudService($http) {
    var service = {};
    var intv,
        audio = document.querySelector('audio'),
        audiosource = new SoundCloudAudioSource(audio);

    service.scResponse = null;

    service.init = function() {
      SC.initialize({
        client_id: SOUNDCLOUD_API_KEY
      });
    }

    service.searchSoundCloud = function(query) {
      return $http.get('https://api.soundcloud.com/tracks.json?client_id=' + SOUNDCLOUD_API_KEY + '&q=' + query + '&limit=1').
      then(function(response) {
        service.scResponse = response.data;
        console.debug("SoundCloud link: ", service.scResponse[0].permalink_url);
        var streamUrl = service.scResponse[0].stream_url + '?client_id=' + SOUNDCLOUD_API_KEY;
        audio.setAttribute('src', streamUrl);

        return service.scResponse;
      });
    };

    service.play = function(){
      audio.play();
      intv = setInterval(function(){ audiosource.draw() }, 1000 / 30);
    };

    service.pause = function(){
      audio.pause();
      clearInterval(intv);
    };

    service.replay = function(){
      audio.currentTime = 0;
      audio.pause();
      audio.play();
      intv = setInterval(function(){ audiosource.draw() }, 1000 / 30);
    };

    return service;
  }

  var SoundCloudAudioSource = function(audio){
    var self = this;
    var audioCtx = new (window.AudioContext || window.webkitAudioContext);
    var source = audioCtx.createMediaElementSource(audio);

    var analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    audio.crossOrigin = "anonymous";
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    this.bufferLength = analyser.frequencyBinCount;

    this.dataArray = new Uint8Array(this.bufferLength);

    this.draw = function() {
      analyser.getByteTimeDomainData(this.dataArray);
      drawCanvas(this.dataArray,this.bufferLength);
    };

  }

  function drawCanvas(dataArray,bufferLength){
    var canvas = document.getElementById('visualizer');
    var canvasCtx = canvas.getContext("2d");

    var WIDTH = 150;
    var HEIGHT = 150;

    canvasCtx.fillStyle = 'rgb(242, 242, 242)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.lineWidth = 2;
    canvasCtx.beginPath();

    var sliceWidth = WIDTH * 1.0 / bufferLength;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {
      var data = dataArray[i];
      var v = data / 128.0;
      var y = v * HEIGHT/2;

      var r = data + 120 ;
      var g = 255 -  data ;
      var b = data / 3;

      canvasCtx.strokeStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';

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

  var Visualizer = function() {
    var elem = document.getElementById('draw-animation');
    var two = new Two({ width: 285, height: 200 }).appendTo(elem);

    var circle = two.makeCircle(-70, 0, 50);
    var rect = two.makeRectangle(70, 0, 100, 100);
    circle.fill = '#FF8000';
    rect.fill = 'rgba(0, 200, 255, 0.75)';

    var group = two.makeGroup(circle, rect);
    group.translation.set(two.width / 2, two.height / 2);
    group.scale = 0;
    group.noStroke();

    // Bind a function to scale and rotate the group
    // to the animation loop.
    two.bind('update', function(frameCount) {
      // This code is called everytime two.update() is called.
      // Effectively 60 times per second.
      if (group.scale > 0.9999) {
        group.scale = group.rotation = 0;
      }
      var t = (1 - group.scale) * 0.125;
      group.scale += t;
      group.rotation += t * 4 * Math.PI;
    }).play();  // Finally, start the animation loop

  }

  angular.module('SmartMirror')
  .factory('SoundCloudService', SoundCloudService);

}());
