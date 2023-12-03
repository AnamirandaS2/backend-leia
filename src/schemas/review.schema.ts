import * as yup from 'yup';

export const createReviewSchema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required(),
    bookId: yup.string().required(),
});
