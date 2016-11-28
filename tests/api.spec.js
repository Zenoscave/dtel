var request = require("supertest")
var chai = require("chai")
var should = chai.should()
var utils = require("./helper")(request, should)

describe("/api", function () {
  var base = "/api"
  describe("GET", function () {
    utils.testMethodOnRoute(base, "/", "get", 404, [utils.defaultTests])
  })
  describe("POST", function() {
    utils.testMethodOnRoute(base, "/", "post", 404, [utils.defaultTests])
  })
})
