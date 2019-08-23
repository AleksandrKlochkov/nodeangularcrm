module.exports = (res, error) => {
    res.error(500).json({
        success: false,
        message: error.message ? error.message : error
    })
}