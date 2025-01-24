import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup'

const passwordSize = {
  min: 6,
  max: 50,
};

export default async function checkAtLeastOneFieldUpdate(req: Request, res: Response, next: NextFunction) {
  const updateSchema = yup.object().shape({
    name: yup.string().min(3).max(50),
    password: yup.string().min(passwordSize.min).max(passwordSize.max),
    avatar: yup.mixed()
  }).test('at-least-one-property', 'Você deve informar qual campo deseja alterar: nome, senha ou avatar', value => {
    return !!(value.name || value.password || value.avatar)
  }
  );

  try {
    await updateSchema.validate({ ...req.body, avatar: (req.files as any)?.avatar }, { abortEarly: false });
  } catch(err) {
    return res.status(400).json({ message: err.errors });
  }

  next();
}