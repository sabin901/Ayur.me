/**
 * Wraps an async route handler so unhandled rejections are forwarded to
 * Express's central error handler instead of crashing the process or
 * leaving requests hanging. Lets us drop the boilerplate try/catch in
 * every route.
 *
 *   router.get('/x', asyncHandler(async (req, res) => { ... }))
 */
function asyncHandler(fn) {
  return function asyncHandlerWrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
