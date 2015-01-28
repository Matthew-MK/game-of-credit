app = require("../app")
assert = require("assert")
request = require('supertest')

req = request(app)

describe "API", ->
  describe "GET /", ->
    it "should return status code 200", (done) ->
      req.get("/").expect(200, done)

  describe "GET /non-existing-link", ->
    it "should return status code 404", (done) ->
      req.get("/non-existing-link").expect(404, done)