var should = require('should'),
    angularjs_example = require('../lib/angularjs-example.js')


describe('angularjs-example', function () {
    before(function () {

    })
    it('should be awesome', function(){
        angularjs_example.awesome().should.eql('awesome')
    })
})