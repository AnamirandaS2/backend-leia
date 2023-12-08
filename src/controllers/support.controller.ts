import { Request, Response } from 'express';

import sendSupportEmailService from '../services/support/sendSupportEmail';

export async function supportController(req: Request, res: Response) {
  const { email, name, message } = req.body;

  const response = await sendSupportEmailService({ email, name, message });
  res.status(200).json(response);
}
