import * as yup from 'yup';

const passwordSize = {
  min: 6,
  max: 50,
};

export const registerSchema = yup.object().shape({
  name: yup.string().required().min(3).max(50),
  email: yup.string().required().email(),
  password: yup.string().required().min(passwordSize.min).max(passwordSize.max),
});

export const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(passwordSize.min).max(passwordSize.max),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().required().email()
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup.string().required().min(passwordSize.min).max(passwordSize.max),
});

export const updateSchema = yup.object().shape({
  name: yup.string().min(3).max(50),
  password: yup.string().min(passwordSize.min).max(passwordSize.max),
  avatar: yup.string().url(),
}).test('at-least-one-property', 'Você deve informar qual campo deseja alterar: nome, senha ou avatar', value =>
  !!(value.name || value.password || value.avatar)
);