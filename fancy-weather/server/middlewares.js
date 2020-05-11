const catchErrorsDecorator = (fnc) => async (req, res, next) => {
  try {
    return await fnc(req, res, next);
  } catch (error) {
    return next(error);
  }
};

module.exports = catchErrorsDecorator;
