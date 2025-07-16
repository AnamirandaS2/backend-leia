import replaceSpecialCharacters from "replace-special-characters";
import path from "path";

export default function parseFilename(
  originalFilename: string,
  ...params: string[]
) {
  const extension = path.extname(originalFilename);
  const filename = params.join("-").replaceAll(" ", "-").toLowerCase();
  return replaceSpecialCharacters(filename.concat(extension));
}
