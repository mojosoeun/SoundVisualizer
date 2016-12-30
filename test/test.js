var expect = chai.expect;

describe('dom', function() {
  describe('isCorrectSoundCloudURL', function() {
    it('should return false when soundcloud url is incorrect', function() {
      expect(dom.util.isCorrectSoundCloudURL('test')).to.be.false;
    });
    it('should return true when soundcloud url is correct', function() {
      expect(dom.util.isCorrectSoundCloudURL('https://soundcloud.com/swindail/turbine-blue-swindail-remix')).to.be.true;
    });
  });
});
