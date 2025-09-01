import prisma from "../../database/db";

interface ICreateCommentData {
  userId: string;
  assignmentId: string;
  content: string;
}

export default async function createCommentService({
  userId,
  assignmentId,
  content,
}: ICreateCommentData) {
  const comment = await prisma.assignmentComment.create({
    data: {
      userId,
      assignmentId,
      content,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  return comment;
}





