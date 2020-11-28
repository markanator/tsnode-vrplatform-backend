import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export interface EpxressParams {
  req: Request;
  res: Response;
  next?: NextFunction;
  err?: ErrorRequestHandler;
}
