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
    // self.analyser.getByteTimeDomainData(this.dataArray);
      // self.analyser.getByteFrequencyData(dataArray);

    // drawCanvas(this.dataArray, this.bufferLength);


    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    // drawBar(this.dataArray, this.bufferLength);
    drawBar();
  };

}

function drawBar() {
  // drawVisual = requestAnimationFrame(drawBar);
  var drawVisual = requestAnimationFrame(drawBar);

  audiosource.analyser.getByteFrequencyData(audiosource.dataArray);

  var gradient = canvasCtx.createLinearGradient(0,0,1500,0);
  gradient.addColorStop(0,"#00dbde");
  gradient.addColorStop(1,"#fc00ff");
  canvasCtx.fillStyle = gradient;
  // canvasCtx.fillStyle = 'rgb(255, 255, 255)';
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

  // var posX = 20,
  //     posY = canvas.height / 2;
  //
  // var particles = {},
  //     particleIndex = 0,
  //     settings = {
  //       density: 20,
  //       particleSize: 10,
  //       startingX: canvas.width / 2,
  //       startingY: canvas.height / 4,
  //       gravity: 0.5
  //     };
  //
  // // Set up a function to create multiple particles
  // function Particle() {
  //   // Establish starting positions and velocities
  //   this.x = settings.startingX;
  //   this.y = settings.startingY;
  //
  //   // Determine original X-axis speed based on setting limitation
  //   this.vx = Math.random() * 20 - 10;
  //   this.vy = Math.random() * 20 - 5;
  //
  //   // Add new particle to the index
  //   // Object used as it's simpler to manage that an array
  //   particleIndex ++;
  //   particles[particleIndex] = this;
  //   this.id = particleIndex;
  //   this.life = 0;
  //   this.maxLife = 100;
  // }
  //
  // // Some prototype methods for the particle's "draw" function
  // Particle.prototype.draw = function() {
  //   this.x += this.vx;
  //   this.y += this.vy;
  //
  //   // Adjust for gravity
  //   this.vy += settings.gravity;
  //
  //   // Age the particle
  //   this.life++;
  //
  //   // If Particle is old, it goes in the chamber for renewal
  //   if (this.life >= this.maxLife) {
  //     delete particles[this.id];
  //   }
  //
  //   // Create the shapes
  //   canvasCtx.clearRect(settings.leftWall, settings.groundLevel, canvas.width, canvas.height);
  //   canvasCtx.beginPath();
  //   canvasCtx.fillStyle="#ffffff";
  //   // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
  //   canvasCtx.arc(this.x, this.y, settings.particleSize, 0, Math.PI*2, true);
  //   canvasCtx.closePath();
  //   canvasCtx.fill();
  //
  // }
  //
  // canvasCtx.fillStyle = "rgba(10,10,10,0.8)";
  // canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  //
  // // Draw the particles
  // for (var i = 0; i < settings.density; i++) {
  //   if (Math.random() > 0.97) {
  //     // Introducing a random chance of creating a particle
  //     // corresponding to an chance of 1 per second,
  //     // per "density" value
  //     new Particle();
  //   }
  // }
  //
  // for (var i in particles) {
  //   particles[i].draw();
  // }

  var barWidth = (WIDTH / audiosource.bufferLength) * 2.5;
  var barHeight;
  var barData;
  var x = 0;

  for(var i = 0; i < audiosource.bufferLength; i++) {
    barData = audiosource.dataArray[i];
    barHeight = barData * 4;

    canvasCtx.fillStyle = 'rgba(' + (barData+150) + ', '+ (barData+150)+',' + (barData+150) + ', 0.5'+')';
    canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

    x += barWidth + 1;
  }
};

function drawCanvas(dataArray, bufferLength){

  var data = dataArray[0];
  var v = data / 128.0;
  var y = v * HEIGHT / 2;

  two.clear();

  var circle = two.makeCircle(position.x, position.y, y);
  circle.fill = '#BF0A19';

  var circle2 = two.makeCircle(position.x, position.y - 1000, y);
  circle2.fill = '#F20C36';

  var circle3 = two.makeCircle(position.x, position.y - 2000, y);
  circle3.fill = '#0E2773';

  var circle4 = two.makeCircle(position.x, position.y + 1000, y);
  circle4.fill = '#7BBF78';

  var circle5 = two.makeCircle(position.x, position.y + 2000, y);
  circle5.fill = '#F2DF80';
  // var circle2 = two.makeCircle(position.x - 1000, position.y - 1000, y);
  // circle2.fill = '#FF8000';
  // var circle3 = two.makeCircle(position.x - 1000, position.y + 1000, y);
  // circle3.fill = '#FF8000';
  // var circle4 = two.makeCircle(position.x + 1000, position.y - 1000, y);
  // circle4.fill = '#FF8000';
  //
  // var circle5 = two.makeCircle(position.x + 1000, position.y + 1000 , y);
  // circle5.fill = '#E77471';
  //
  // var circle6 = two.makeCircle(position.x - 2000, position.y - 2000, y);
  // circle6.fill = '#FF8000';
  // var circle7 = two.makeCircle(position.x - 2000, position.y + 2000, y);
  // circle7.fill = '#FF8000';
  // var circle8 = two.makeCircle(position.x + 2000, position.y - 2000, y);
  // circle8.fill = '#FF8000';
  //
  // var circle9 = two.makeCircle(position.x + 2000, position.y + 2000 , y);
  // circle9.fill = '#E77471';

  var group = two.makeGroup(circle, circle2, circle3, circle4, circle5);
  group.translation.set(WIDTH / 2, HEIGHT / 2);
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

var player = document.getElementById('player');
var stream = new SoundcloudStream(player);
var audiosource = new SoundCloudAudioSource(player);
var elem = document.getElementById('visualizer');
var canvas = document.getElementById('viewport');
var canvasCtx = canvas.getContext('2d');
var two = new Two({fullscreen: true}).appendTo(elem);
var position = new Two.Vector(two.width/2, two.height/2);
var posX = 20,
    posY = canvas.height / 2;
// Initial velocities
var vx = 10,
    vy = -10,
    gravity = 1;


window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

var WIDTH = canvas.width;
var HEIGHT = canvas.height;


var play = function(trackurl) {
  stream.loadStream(trackurl,
  function() {
    audiosource.playStream(stream.streamUrl);
    audiosource.draw();
    // setInterval(function(){ audiosource.draw() }, 1000 / 400);
  },
  function(error) {
    console.log(error);
  });
};

var track_url = 'https://soundcloud.com/cosmosmidnight/cosmos-midnight-walk-with-me-feat-kucka';
play(track_url);

}());
