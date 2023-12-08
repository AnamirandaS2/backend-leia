import replaceSpecialCharacters from 'replace-special-characters';

export default function parseFilename (extension: string, ...params: string[]) {
  const filename = params.join('-').replaceAll(' ', '-').toLowerCase();
  return replaceSpecialCharacters(extension ? filename.concat(`.${extension}`) : filename);
}