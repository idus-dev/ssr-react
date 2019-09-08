// can use this instead
// https://github.com/davidbanham/express-async-errors#readme

const asyncHandler = handler => async (req, res, next) => {
    try {
        await handler(req, res);
    } catch (exception) {
        next(exception);
    }
};

export default asyncHandler;
