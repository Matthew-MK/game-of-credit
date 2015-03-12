app = require("../server/app")
assert = require("assert")
request = require('supertest')

req = request(app)

describe "API", ->
  describe "GET /", ->
    it "should return status code 200", ->
      req.get("/").expect(200)

  describe "GET /non-exists", ->
    it "should return status code 200", ->
      req.get("/non-exists").expect(200)