var soundcloud = sound(dom.query('.ctrgroup__player__audio'));

describe('dom', function() {
  describe('isCorrectSoundCloudURL', function() {
    it('should return false when soundcloud url is incorrect', function() {
      expect(dom.util.isCorrectSoundCloudURL('test')).to.be.false;
    });
    it('should return true when soundcloud url is correct', function() {
      expect(dom.util.isCorrectSoundCloudURL('https://soundcloud.com/swindail/turbine-blue-swindail-remix')).to.be.true;
    });
  });

  describe('query', function() {
    it('should return correct "HTMLElement" when call query function with className selector', function() {
      expect(dom.query('.layer__title').outerHTML).to.equal('<h1 class="layer__title"> This browser is not supported </h1>');
    });
  });

  describe('toogle', function() {
    it('className should "ctrgroup" when first call toggle function with "ctrgroup--hidden"', function() {
      dom.util.toggle(dom.query('.ctrgroup'), 'ctrgroup--hidden');
      expect(dom.query('.ctrgroup').className).to.equal('ctrgroup');
    });
  });
});

describe('sound', function() {
  describe('_init', function() {
    it('have to exist audio analyser when init sound.js', function() {
      expect(soundcloud.analyser).to.be.exist;
    });
  });
  describe('play', function() {
    it('should play audio when call soundcloud play function', function() {
      var stream_url = "https://api.soundcloud.com/tracks/293573440/stream?client_id=802c2f1c80c96881ff265799929e8a2c";
      soundcloud.play(stream_url);
      expect(!dom.query('.ctrgroup__player__audio').paused).to.be.true;
    });
  });
  //TODO
  // describe('search', function() {
  //   it('should get error message when call soundcloud search function with soundcloud forbidden url', function(done) {
  //     var trackUrl = "https://soundcloud.com/lukasgraham/mama-said";
  //   });
  // });
});

describe('sona', function() {
  describe('init', function() {
    it('have to exist fgCanvas when init sona.js', function() {
      var option = {
        'analyser' : soundcloud.analyser,
        'canvas': dom.query('.visualPanel')
      };
      sona.init(option);
      expect(dom.query('.fgCanvas')).to.be.exist;
    });
  });
  describe('drawAlbumImg', function() {
    it('should set tag of img tag when call drawAlbumImg with imgurl', function() {
      var imgUrl = "https://i1.sndcdn.com/artworks-000194108151-qw9zbv-large.jpg";
      sona.drawAlbumImg(imgUrl);
      expect(dom.query('.imgCanvas').src).to.equal(imgUrl);
    });
  });
});
