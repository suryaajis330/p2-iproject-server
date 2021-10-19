const errors = (err, req, res, next ) => {
  let code = 500
  let msg = 'Internal server error'

  console.log(err)
  if(err.name === 'SequelizeValidationError') {
    code = 400
    msg = err.errors[0].message
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    code = 400
    msg = err.errors[0].message
  } else if (err.name === "InvalidInput") {
    code = 401
    msg = "Invalid email/password"
  } else if (err.name === "JsonWebTokenError") {
    code = 400
    msg = "You must login first"
  } else if (err.name === "InvalidToken") {
    code = 400
    msg = "Invalid token"
  }


  res.status(code).json({message: msg})
}

module.exports = errors