export default class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static Unauthorized(message = "User is not authorized", errors = []) {
    return new ApiError(401, message, errors);
  }

  static Forbidden(message, errors = []) {
    return new ApiError(403, message, errors);
  }

  static NotFound(message, errors = []) {
    return new ApiError(404, message, errors);
  }

  static InternalServerError(message = "Internal server error", errors = []) {
    return new ApiError(500, message, errors);
  }
}
