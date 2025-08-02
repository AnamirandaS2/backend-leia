import prisma from "../../database/db";

export default async function likePostService(
  postId: string,
  userId: string,
  liked: boolean
) {
  return await prisma.postLikes.upsert({
    where: {
      userId_postId: {
        postId: postId,
        userId: userId,
      },
    },
    update: { liked },
    create: {
      postId: postId,
      userId: userId,
      liked,
    },
    select: {
      liked: true,
      postId: true,
      userId: true,
    },
  });
}
