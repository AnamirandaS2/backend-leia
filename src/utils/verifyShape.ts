import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'yup';

const verifyShape =
    (serialize: ObjectSchema<object>) =>
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const validated = await serialize.validate(req.body, {
            stripUnknown: true,
            abortEarly: false,
          });
          req.body = validated;
          return next();
        } catch (error) {
          return res.status(400).json({ message: error.errors });
        }
      };

export default verifyShape;