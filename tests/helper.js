global.server = require('../runner')
module.exports = function(request, should) {
  return {
    defaultTests: function (done) {
      return function (err, res) {
        should.not.exist(err)
        done()
      }
    },

    testMethodOnRoute: function (base, route, method, code, tests) {
      tests.forEach(function(test) {
          return it('should return ' + code, function (done) {
              var runner = function(done) {
                  tests.forEach(function (test) { test(done) })
                  done()
              }
              if (request(server)[method]) {
                  request(server)[method](base + route)
                      .expect(code)
                      .end(runner(done))
              }
          })
      })
    }
  }
}