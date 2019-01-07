const isInteger = val => {
  const number = Number(val);
  return Number.isInteger(number) && number > 0;
};

exports.validateTotal = (req, res, next) => {
  if (isInteger(req.body.total)) {
    return next();
  }
  return res
    .status(400)
    .send({ error: { message: 'Total must be an integer' } });
};

exports.validateId = (req, res, next) => {
  if (isInteger(req.params.id)) {
    return next();
  }
  return res.status(400).send({ error: { message: 'Id must be an integer' } });
};

exports.validateMethod = method => {
  const allowedMethods = ['HEAD', 'OPTIONS', method];
  return function(req, res, next) {
    if (!allowedMethods.includes(req.method.toUpperCase())) {
      res.set('Allow', method);
      return res
        .status(405)
        .send({ error: { message: `Method not allowed. Try ${method}` } });
    }
    return next();
  };
};
