import * as yup from 'yup';

export const supportSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    message: yup.string().required(),
});
