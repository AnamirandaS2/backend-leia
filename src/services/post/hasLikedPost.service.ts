import prisma from '../../database/db';

export default async function hasLikedPostService(postId: string, userId: string) {
  const like = await prisma.postLikes.findFirst({
    where: {
      postId: postId,
      userId: userId,
    },
    select: {
      liked: true,
    }
  });

  return !!like?.liked;
}