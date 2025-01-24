import * as yup from 'yup';

export const newCollectionSchema = yup.object().shape({
  name: yup.string().required().min(1).max(100),
});

export const addBookToCollectionSchema = yup.object().shape({
  bookId: yup.string().required(),
})

export const deleteBookFromCollectionSchema = yup.object().shape({
  bookId: yup.string().required(),
})