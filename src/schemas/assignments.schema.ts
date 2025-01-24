import * as yup from 'yup';

export const assignmentsSchema = yup.object().shape({
  content: yup.string().required().min(1, "Tamanho mínimo: 1 caractere").max(5000, "Tamanho máximo: 5000 caracteres")
});

export const assignmentCommentSchema = yup.object().shape({
  content: yup.string().required().min(1, "Tamanho mínimo: 1 caractere").max(5000, "Tamanho máximo: 5000 caracteres"),
})