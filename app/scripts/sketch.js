(function() {
  'use strict';

  var canvas = document.getElementById('visualizer');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }

  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0,0,255,1.0)';
  ctx.fillRect(120,10,150,150);

}());
