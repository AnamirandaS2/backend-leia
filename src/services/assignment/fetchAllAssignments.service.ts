import prisma from "../../database/db";

export default async function fetchAllAssignmentsService() {
  return await prisma.assignment.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      likes: true,
      professor: {
        select: {
          id: true,
          name: true,
          avatar: true,
        }
      }
    },
  });
}
