(function() {
  'use strict';


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

  var drawCanvas = function(dataArray, bufferLength){
    var elem = document.getElementById('visualizer');
    var two = new Two({ width: 600, height: 600 }).appendTo(elem);

    for(var i = 0; i < bufferLength; i++) {
      var data = dataArray[i];
      var v = data / 128.0;
      var y = v * HEIGHT/2;
      var circle = two.makeCircle(v, 0, y);
      var rect = two.makeRectangle(70, 0, y, 100);
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

  }

  var audio = document.querySelector('audio'),
      audiosource = new SoundCloudAudioSource(audio);

  SC.initialize({
    client_id: SOUNDCLOUD_API_KEY
  });

  SC.get('/resolve', { url: 'https://soundcloud.com/nayer-ashraf/doubt' }, function(sound) {

    var streamUrl = sound.stream_url + '?client_id=' + SOUNDCLOUD_API_KEY;

    audio.setAttribute('src', streamUrl);
    audio.play();
    // intv = setInterval(function(){ audiosource.draw() }, 1000 / 30);
  });





}());
