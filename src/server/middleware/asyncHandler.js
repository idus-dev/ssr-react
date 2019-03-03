// factory function
// calls it and returns new function
const asyncHandler = handler => async (req, res, next) => {
    try {
        await handler(req, res);
    }
    catch (exception) {
        next(exception);
    }
};

export default asyncHandler;