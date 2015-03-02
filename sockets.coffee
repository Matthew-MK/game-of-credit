###
Copyright 2015 Jan Svager

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
###
socketIO = require('socket.io')

exports.register = (server) ->
  io = socketIO(server)

  io.on 'connection', (socket) ->

    socket.on "data", (data) ->
      socket.broadcast.emit('data', data)

    socket.on "kill", (id) ->
      io.sockets.emit('death', id)

    socket.on "disconnect", ->
      socket.broadcast.emit('leave', socket.id)