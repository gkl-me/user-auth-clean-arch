import { NextFunction, Response, Request } from "express";
import { ZodError, ZodSchema } from "zod";

export const validator =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next()
    } catch (err) {
        if(err instanceof ZodError) {
            res.status(400).json({
              message: err.errors[0].message
            });
        }
    }
    }
