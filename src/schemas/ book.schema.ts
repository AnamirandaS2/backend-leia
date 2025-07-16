import * as yup from "yup";

export const updateBookSchema = yup
  .object()
  .shape({
    cover: yup.string(),
    title: yup.string(),
    description: yup.string(),
    author: yup.string(),
    genre: yup.string(),
    pages: yup.number(),
    publishedAt: yup.date(),
  })
  .test(
    "at-least-one-property",
    "you must provide at least one",
    (value) =>
      !!(
        value.author ||
        value.title ||
        value.description ||
        value.genre ||
        value.pages ||
        value.publishedAt ||
        value.cover
      )
  );

export const addBookSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  author: yup.string().required(),
  pages: yup.number().required(),
  genre: yup.string().required(),
  volume: yup.number(),
  edition: yup.number(),
});
