import * as yup from 'yup';

export const postsSchema = yup.object().shape({
  content: yup.string().required().min(1, "Tamanho mínimo: 1 caractere").max(5000, "Tamanho máximo: 5000 caracteres"),
  bookId: yup.string().required(),
  rating: yup.number().positive().min(1, "Avaliação mínima: 1 estrela").max(5, "Avaliação máxima: 5 estrelas"),
});

export const postCommentSchema = yup.object().shape({
  content: yup.string().required().min(1, "Tamanho mínimo: 1 caractere").max(5000, "Tamanho máximo: 5000 caracteres")
})