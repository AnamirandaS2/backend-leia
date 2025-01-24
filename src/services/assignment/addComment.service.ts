import prisma from "../../database/db";

export default async function addCommentService(assignmentId: string, userId: string, content: string) {
  await prisma.assignmentComment.create({
    data: {
      content,
      assignmentId,
      userId,
    }
  })
}