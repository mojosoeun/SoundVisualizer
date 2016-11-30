/*! audio_helper.js © sonasoeun.me, 2016 */
var audio_helper = (function(global) {
  'use strict';

  var client_id = SOUNDCLOUD_API_KEY;

  function audio_helper(audio) {
    if ( !(this instanceof audio_helper) ) {
      SC.initialize({
        client_id: client_id
      });

      return new audio_helper(audio);
    }
    this._init.apply(this, arguments);
  }


  audio_helper.fn = audio_helper.prototype = {
    'constructor': audio_helper,
    'author' : 'sona',
    'version': '1.0.0',
    '_init' : function(audio) {
      var audioCtx = new (window.AudioContext || window.webkitAudioContext)
        , source = audioCtx.createMediaElementSource(audio)

      this.audio = audio;
      this.analyser = audioCtx.createAnalyser();

      this.analyser.fftSize = 256;
      this.analyser.connect(audioCtx.destination);

      this.audio.crossOrigin = "anonymous";
      source.connect(this.analyser);
    },
    'search' : function(trackUrl, successCallback, errorCallback){
      SC.resolve(trackUrl)
        .then(function(data){
          var streamUrl = data.stream_url + '?client_id=' + client_id;
          var artworkUrl = data.artwork_url;
          successCallback.call(this,streamUrl,artworkUrl);
      }).catch(function(error){
          errorCallback(error);
      });
    },
    'play': function(streamUrl){
      this.audio.setAttribute('src', streamUrl);
      this.audio.play();
    }
  }

  return audio_helper;

})(this);
