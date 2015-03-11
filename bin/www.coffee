#!/usr/bin/env coffee

http = require("http")
app = require("../server/app")
sockets = require("../server/sockets")

# Create HTTP server
server = http.createServer(app)

# Listen on provided port, on all network interfaces
port = app.get("port")
server.listen(port)
sockets.listen(server)

# Event listener for HTTP server "listening" event
server.on "listening", ->
  console.log("Server listening on #{port} in #{app.get('env')}")

# Event listener for HTTP server "listening" event
server.on "error", (err) ->
  if err.syscall != 'listen'
    throw err

  switch err.code
    when 'EACCES'
      console.error("Port #{port} requires elevated privileges")
      process.exit(1)
    when 'EADDRINUSE'
      console.error("Port #{port} is already in use")
      process.exit(1)
    else
      throw err

