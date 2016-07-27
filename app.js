(function() {
  'use strict';
  
  var elem = document.getElementById('visualizer');
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
}());
