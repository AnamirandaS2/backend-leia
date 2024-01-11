import * as yup from 'yup';

export const createReviewSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  nameBook: yup.string().required(),
});

export const updateReviewSchema = yup.object().shape({
  newTitle: yup.string(),
  newContent: yup.string(),
});