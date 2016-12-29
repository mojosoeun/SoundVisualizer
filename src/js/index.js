(function($, sound, sona){
  'use strict';

  var version = detectIE();

  if (version) {
    if(version < 12) {
      $.query('.layer').style.display = 'table';
    }
  }

  var param = 'track',
      form = $.query('.ctrgroup__player__form'),
      toggleButton = $.query('.ctrgroup__togglebtn'),
      trackInputer = $.query('.ctrgroup__player__form__input'),
      visualPanel = $.query('.visualPanel'),
      warnPanel = $.query('.warnPanel'),
      defaultPanel = $.query('.defaultPanel'),
      ctrGroup = $.query('.ctrgroup'),
      audio = $.query('.ctrgroup__player__audio'),
      util = $.util,
      soundcloud = sound(audio);

  sona.init({
    'analyser' : soundcloud.analyser,
    'canvas': visualPanel
  });

  util.toggle(ctrGroup, 'ctrgroup--hidden');

  $.hide(visualPanel);

  if (getUrlParameter(param)) {
    var trackUrl = getUrlParameter(param);
    trackInputer.value = trackUrl;
    play(trackUrl);
  }

  function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    return false;
  }

  function getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  function play(track){
    soundcloud.search(track, function(streamUrl, artworkUrl){
      $.show(visualPanel);
      $.hide(warnPanel);
      soundcloud.play(streamUrl);
      sona.drawAlbumImg(artworkUrl);
      setTimeout(util.toggle(ctrGroup, 'ctrgroup--hidden'), 3000); // auto-hide the control panel
    }, function(err){
      if(err.status === 403){
        $.query('.warnPanel__p').innerHTML = 'This song is not supported';
      } else {
        $.query('.warnPanel__p').innerHTML = err;
      }
      $.show(warnPanel);
    });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    $.hide(defaultPanel);
    if(util.isCorrectSoundCloudURL(trackInputer.value)) {
      play(trackInputer.value);
    } else {
      $.query('.warnPanel__p').innerHTML = 'invalid soundcloud url';
      $.show(warnPanel);
    }
  });

  toggleButton.addEventListener('click', function(e) {
    e.preventDefault();
    util.toggle(ctrGroup, 'ctrgroup--hidden');
  });

  audio.addEventListener("ended", function(){
    $.show(visualPanel);
    sona.clearBackEffect();
  });

  window.addEventListener("keydown", function(event){
    if (event.which === 32){
      if (audio.paused) {
          audio.play();
      } else {
          audio.pause();
      }
    }
  });

})(dom, sound, sona);
