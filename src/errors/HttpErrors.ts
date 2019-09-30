import * as mongoose from "mongoose";

export abstract class HttpError extends Error {
  public attributes: object;

  constructor(public readonly statusCode: number, msg: string) {
    super(msg);
  }
}
export class NotFoundHttpError extends HttpError {
  constructor(msg: string) {
    super(404, msg);
  }
}

export class ValidationHttpError extends HttpError {
  public errors: any;
  constructor(private readonly e: mongoose.Error.ValidationError) {
    super(422, "Validation error ");
    this.attributes = e.errors;
  }
}
