(function() {
  'use strict';

var SoundcloudStream = function() {
  var self = this;
  var client_id = SOUNDCLOUD_API_KEY;
  this.sound = {};
  this.streamUrl = "";

  this.loadStream = function(track_url, successCallback, errorCallback) {
    SC.initialize({
      client_id: client_id
    });

    SC.resolve(track_url)
    .then(function(data){
      self.streamUrl = data.stream_url + '?client_id=' + client_id;
      successCallback();

    }).catch(function(error){
      errorCallback(error);
    });
  }
};

var SoundCloudAudioSource = function(audio){
  var self = this;
  var audioCtx = new (window.AudioContext || window.webkitAudioContext);
  var source = audioCtx.createMediaElementSource(audio);

  self.analyser = audioCtx.createAnalyser();
  self.analyser.fftSize = 256;
  audio.crossOrigin = "anonymous";
  source.connect(self.analyser);
  self.analyser.connect(audioCtx.destination);

  this.bufferLength = self.analyser.frequencyBinCount;

  this.dataArray = new Uint8Array(this.bufferLength);

  this.playStream = function(streamUrl) {
    audio.setAttribute('src', streamUrl);
    audio.play();
  }

  this.draw = function() {
    drawBar(this.dataArray, this.bufferLength);
  };

}

function drawBar() {
  var drawVisual = requestAnimationFrame(drawBar);

  audiosource.analyser.getByteFrequencyData(audiosource.dataArray);

  var gradient = canvasCtx.createLinearGradient(0,0,1500,0);
  gradient.addColorStop(0,"#00dbde");
  gradient.addColorStop(1,"#fc00ff");
  canvasCtx.fillStyle = gradient;
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

  var barWidth = (WIDTH / audiosource.bufferLength) * 2.5;
  var barHeight;
  var barData;
  var x = 0;

  for(var i = 0; i < audiosource.bufferLength; i++) {
    barData = audiosource.dataArray[i];
    // mesh.rotation.x += barData;
    // mesh.rotation.y += barData + 1;
    barHeight = barData * 3;

    canvasCtx.fillStyle = 'rgba(' + (barData+150) + ', '+ (barData+150)+',' + (barData+150) + ', 0.5'+')';
    canvasCtx.fillRect(x, HEIGHT-barHeight/2, barWidth, barHeight/2);
    canvasCtx.beginPath();
    canvasCtx.arc(x, HEIGHT-barHeight/2 - 100, barWidth /3 , 0, 2 * Math.PI, false);
    canvasCtx.fill();

    x += barWidth + 1;
  }



  // renderer.render(scene, camera);
};

var player = document.getElementById('player'),
    stream = new SoundcloudStream(player),
    audiosource = new SoundCloudAudioSource(player),
    canvas = document.getElementById('viewport'),
    canvasCtx = canvas.getContext('2d');

window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

var WIDTH = canvas.width;
var HEIGHT = canvas.height;

function fade(element) {
    var op = 1;
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 1000);
}

var play = function(trackurl) {
  stream.loadStream(trackurl,
  function() {
    fade(document.getElementById('controlPanel'));
    fade(document.getElementById('LP-percent'));
    document.getElementById('viewport').style.display = 'block';
    audiosource.playStream(stream.streamUrl);
    audiosource.draw();
  },
  function(error) {
    console.log(error);
  });
};

form.addEventListener('submit', function(e) {
  e.preventDefault();
  var trackUrl = document.getElementById('input').value;
  play(trackUrl);
});

}());
