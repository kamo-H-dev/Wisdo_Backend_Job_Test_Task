module.exports = (err, req, res, next) => {
  res.status(err.status || 400).send({ status: false, message: err.message });
};
