import * as yup from 'yup';

export const updatereadingSchema = yup.object().shape({
  page: yup.number().positive().min(1).required(),
});

export const createDeadlineSchema = yup.object().shape({
  deadline: yup.date().required(),
  page: yup.number().positive().min(1),
})