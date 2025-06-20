export class AuthError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = statusCode;
  }
}

export class ValidationError extends AuthError {
  constructor(message: string) {
    super(message, 400); // 400 Bad Request
    this.name = 'ValidationError';
  }
}

export class ConflictError extends AuthError {
  constructor(message: string) {
    super(message, 409); // 409 Conflict
    this.name = 'ConflictError';
  }
}

export class NotFoundError extends AuthError {
  constructor(message: string) {
    super(message, 404); // 404 Not Found
    this.name = 'NotFoundError';
  }
}