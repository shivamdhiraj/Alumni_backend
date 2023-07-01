const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if (err.code === 11000) {
        err.message = "Duplicate key error";
        err.statusCode = 500;
    }

    res.status(err.statusCode).json({
        message : err.message,
        success : false
    })
}

module.exports = errorMiddleware