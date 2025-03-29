/**
 * Sends an error response with the provided details.
 * @param {Object} params - The parameters for the error response.
 * @param {Object} params.res - The response object.
 * @param {string} params.error - The main error message.
 * @param {Array} [params.errors] - Additional error messages.
 * @param {number} [params.statusCode=400] - The HTTP status code.
 * @return {Object} The response object with the error details.
 */
function ErrRes({res, error, errors, statusCode = 400}) {
  const errorsCur = errors ? errors : [error];
  return res
      .json({
        error: error,
        errors: errorsCur,
      })
      .status(statusCode);
}

module.exports = ErrRes;
