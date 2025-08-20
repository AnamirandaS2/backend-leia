import * as yup from 'yup';

export const createReviewSchema = yup.object().shape({
  userCompleteName: yup.string().required(),
  bookId: yup.string().required(),
  borrowDate: yup.string().required(),
  returnDate: yup.string().required(),
  visibility: yup.mixed<'PUBLIC' | 'PROFESSOR_ONLY'>()
    .oneOf(['PUBLIC', 'PROFESSOR_ONLY'])
    .default('PUBLIC')
});

export const updateReviewSchema = yup.object().shape({
  newTitle: yup.string(),
  newContent: yup.string(),
});