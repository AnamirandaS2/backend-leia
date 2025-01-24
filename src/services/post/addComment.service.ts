import prisma from "../../database/db";

export default async function addCommentService(postId: string, userId: string, content: string) {
  await prisma.postComment.create({
    data: {
      content,
      postId,
      userId,
    }
  })
}