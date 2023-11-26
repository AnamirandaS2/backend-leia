import * as yup from 'yup'

export const suportSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    message: yup.string().required(),
})
