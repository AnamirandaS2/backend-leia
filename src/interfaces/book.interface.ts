export interface paramsBook {
    title : string,
    description : string,
    author : string,
    genre : string,
    pages : number,
    publishedAt : string
    file_book : Express.Multer.File,
    cover_file : Express.Multer.File
}