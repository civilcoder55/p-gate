import { AnySchema, ValidationError } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../Logger";

export default (schema: AnySchema) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  } catch (e: any) {
    return res.status(400).send(e.errors);
  }
};

