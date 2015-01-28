#!/usr/bin/env coffee

http = require("http")
app = require("../app")
{config} = require('../package.json')

# Get port from environment and store it in Express
port = parseInt(process.env.PORT, 100) or config.port or 3000
app.set('port', port)

# Create HTTP server
server = http.createServer(app)

# Listen on provided port, on all network interfaces
server.listen(port)

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

