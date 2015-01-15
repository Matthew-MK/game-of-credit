express = require("express")

app = express()

### Setup ###

# View engine setup
app.set("views", __dirname + "/views")
app.set("view engine", "jade")

### Routes ###
if app.get('env') is "development"
  app.use "/", (req, res) ->
    res.render "index",
      title: "Play"

### Middleware ###
# catch 404 and forward to error handler
app.use (req, res, next) ->
  err = new Error("Not Found")
  err.status = 404
  next(err)

# error handler
app.use (err, req, res) ->
  res.status err.status or 500
  res.render 'error',
    message: err.message
    error: if app.get('env') is "development" then err else {}

module.exports = app