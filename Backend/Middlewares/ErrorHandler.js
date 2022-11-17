function errorHandler(err, req, res, next) {
  let message = err.message
  let status = err.status
  let token = err.token
  let cookie = err.cookie
  res.status(status).json({
    error: true,
    message,
    status
  })
}
module.exports = errorHandler