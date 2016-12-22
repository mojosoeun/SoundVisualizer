(function($, sound, sona){
  'use strict';

  var isIE = /*@cc_on!@*/false || !!document.documentMode;

  if(isIE) {
    $.query('.layer').style.display = 'table';
  }

  var param = 'track',
      form = $.query('.ctrgroup__player__form'),
      toggleButton = $.query('.ctrgroup__togglebtn'),
      trackInputer = $.query('.ctrgroup__player__form__input'),
      visualPanel = $.query('.visualPanel'),
      defaultPanel = $.query('.defaultPanel'),
      ctrGroup = $.query('.ctrgroup'),
      audio = $.query('.ctrgroup__player__audio'),
      util = $.util,
      soundcloud = sound(audio);

  sona.init({
    'analyser' : soundcloud.analyser,
    'canvas': visualPanel
  });

  util.onoffmenu(ctrGroup);

  $.hide(visualPanel);

  if (getUrlParameter(param)) {
    var trackUrl = getUrlParameter(param);
    trackInputer.value = trackUrl;
    play(trackUrl);
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
      soundcloud.play(streamUrl);
      sona.drawAlbumImg(artworkUrl);
      setTimeout(util.onoffmenu(ctrGroup), 3000); // auto-hide the control panel
    }, function(err){
      util.cLog(err);
    });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    $.hide(defaultPanel);
    window.location.href = window.location.origin + '?track=' + trackInputer.value;
    console.log(window.location.href);
    play(trackInputer.value);
  });

  toggleButton.addEventListener('click', function(e) {
    e.preventDefault();
    util.onoffmenu(ctrGroup);
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
