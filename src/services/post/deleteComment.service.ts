import prisma from "../../database/db";

export default async function deleteCommentService(commentId: string) {
  await prisma.postComment.update({
    where: {
      id: commentId,
    },
    data: {
      deletedAt: new Date(),
    }
  })
}