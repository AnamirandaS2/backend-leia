import prisma from "../../database/db";

export default async function deletePostService(postId: string) {
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      deletedAt: new Date(),
    }
  })
}