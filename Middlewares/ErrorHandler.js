function errorHandler(err, req, res, next) {
  let message = err.message
  let status = err.status
  res.status(status).json({
    error: true,
    message,
    status
  })
}
module.exports = errorHandler