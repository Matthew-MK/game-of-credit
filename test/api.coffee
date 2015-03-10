app = require("../server/app")
assert = require("assert")
request = require('supertest')

req = request(app)

describe "API", ->
  describe "GET /", ->
    it "should return status code 200", (done) ->
      req.get("/").expect(200, done)