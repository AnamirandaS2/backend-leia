import supabase from "../../database/bucket";
import prisma from "../../database/db";
import { paramsBook } from "../../interfaces/book.interface";
import parseFilename from "../../utils/parseFilename";
import { v4 } from "uuid";
import { AppError } from "./../../error";

export default async function AddBookService({
  title,
  description,
  author,
  genre,
  pages,
  file_book,
  cover_file,
  volume,
  edition,
  hasPhysicalCopy,
  physicalCopyQuantity,
}: paramsBook) {
  const bucket = await supabase.storage.getBucket("books");
  if (!bucket.data) {
    await supabase.storage.createBucket("books", {
      public: true,
      fileSizeLimit: 52428800, // 50 mb,
    });
  }
  const id = v4();
  // Envia o livro para a supbase
  const metadataBook = await supabase.storage
    .from("books")
    .upload(
      parseFilename((file_book as any).name, title, author, id),
      (file_book as any).data,
      {
        cacheControl: "3600",
        upsert: false,
        contentType: file_book.mimetype,
      }
    );
  if (metadataBook.error) {
    console.log(metadataBook.error);
    throw new AppError("Livro inválido", 400);
  }
  // Envia a capa do livro para a supbase
  const metadataCover = await supabase.storage
    .from("books")
    .upload(
      parseFilename((cover_file as any).name, title, author, id, "cover"),
      (cover_file as any).data,
      { cacheControl: "3600", upsert: false, contentType: cover_file.mimetype }
    );
  if (metadataCover.error) {
    throw new AppError("Capa inválida", 400);
  }
  const {
    data: { publicUrl: cover },
  } = supabase.storage
    .from("books")
    .getPublicUrl(
      parseFilename((cover_file as any).name, title, author, id, "cover")
    );
  const {
    data: { publicUrl: fileUrl },
  } = supabase.storage
    .from("books")
    .getPublicUrl(parseFilename((file_book as any).name, title, author, id));
  const book = await prisma.book.create({
    data: {
      title,
      description,
      author,
      genre,
      cover,
      fileUrl,
      pages: Number(pages),
      volume: volume ? Number(volume) : undefined,
      edition: edition ? Number(edition) : undefined,
      hasPhysicalCopy: hasPhysicalCopy ?? false,
      physicalCopyQuantity: physicalCopyQuantity
        ? Number(physicalCopyQuantity)
        : undefined,
      source: metadataBook.data.path,
    },
    select: {
      title: true,
      description: true,
      author: true,
      genre: true,
      pages: true,
      fileUrl: true,
      cover: true,
      createdAt: true,
    },
  });
  return { ...book, id: undefined };
}
