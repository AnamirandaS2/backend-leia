import * as yup from 'yup';

export const createReviewSchema = yup.object().shape({
  userCompleteName: yup.string().required(),
  prisionName: yup.string().required(),
  location: yup.string().required(),
  responsibleDirector: yup.string().required(),
  bookId: yup.string().required(),
  borrowDate: yup.string().required(),
  returnDate: yup.string().required(),
});

export const updateReviewSchema = yup.object().shape({
  newTitle: yup.string(),
  newContent: yup.string(),
});