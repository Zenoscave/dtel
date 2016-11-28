var request = require('supertest')
var chai = require('chai')
var should = chai.should()
var utils = require('../common/gulp-utils')(request, should)

describe('/', function () {
  var base = ''
  describe('GET', function () {
    utils.testMethodOnRoute(base, '/', 'get', 302, [utils.defaultTests])
  })
  describe('POST', function() {
    utils.testMethodOnRoute(base, '/', 'post', 404, [utils.defaultTests])
  })
})

