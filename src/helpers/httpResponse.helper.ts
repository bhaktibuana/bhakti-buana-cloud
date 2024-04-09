import { Response } from "express";

interface I_HttpResponse<T> {
  message: string;
  status: boolean;
  statusCode: number;
  data: T | null;
}

interface I_HttpErrorResponse {
  message: string;
  status: boolean;
  statusCode: number;
  data: {
    error: Error;
  };
}

export const httpResponse = <T>(
  message: string,
  statusCode: number,
  res: Response,
  data: T | null = null
): void => {
  const httpResponse: I_HttpResponse<T> = {
    message,
    status: statusCode >= 200 && statusCode < 300,
    statusCode,
    data,
  };
  res.status(statusCode).json(httpResponse);
};

export class AppError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const httpErrorResponse = (error: any, res: Response): void => {
  if (error instanceof AppError) {
    httpResponse(error.message, error.statusCode, res);
  } else {
    console.error("Internal Server Error:", error);

    const errorResponse: I_HttpErrorResponse = {
      message: "Internal Server Error",
      status: false,
      statusCode: 500,
      data: {
        error,
      },
    };

    res.status(500).json(errorResponse);
  }
};
