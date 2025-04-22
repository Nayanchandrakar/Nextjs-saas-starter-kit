export enum ErrorCode {
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export class ApiError extends Error {
  constructor(
    public readonly code: ErrorCode | string,
    message: string,
    public readonly details?: unknown,
    public readonly status: number = 400,
  ) {
    super(message)
    this.name = "ApiError"
  }

  static badRequest(message: string, details?: unknown): ApiError {
    return new ApiError(ErrorCode.BAD_REQUEST, message, details, 400)
  }

  static unauthorized(message: string, details?: unknown): ApiError {
    return new ApiError(ErrorCode.UNAUTHORIZED, message, details, 401)
  }

  static forbidden(message: string, details?: unknown): ApiError {
    return new ApiError(ErrorCode.FORBIDDEN, message, details, 403)
  }

  static notFound(message: string, details?: unknown): ApiError {
    return new ApiError(ErrorCode.NOT_FOUND, message, details, 404)
  }

  static validationError(message: string, details?: unknown): ApiError {
    return new ApiError(ErrorCode.VALIDATION_ERROR, message, details, 400)
  }

  static internalServerError(message: string, details?: unknown): ApiError {
    return new ApiError(ErrorCode.INTERNAL_SERVER_ERROR, message, details, 500)
  }

  static fromError(error: unknown): ApiError {
    if (error instanceof ApiError) {
      return error
    }

    const message = error instanceof Error ? error.message : String(error)
    return ApiError.internalServerError("An unexpected error occurred", message)
  }
}
