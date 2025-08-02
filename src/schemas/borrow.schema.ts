import * as yup from "yup";

export const requestLendingSchema = yup.object().shape({
  bookId: yup.string().required(),
  lendingDuration: yup.number().required(),
});

export const lendBookSchema = yup.object().shape({
  requestId: yup.string().required(),
});

export const lendingExtensionSchema = yup.object().shape({
  lendingId: yup.string().required(),
  extraTime: yup.number().required(),
});
