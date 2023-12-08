import * as yup from 'yup';

export const activitySchema = yup.object().shape({
  page: yup.number().required(),
});