import prisma from "../../database/db";

export default async function fetchAllAssignmentsService() {
  return await prisma.assignment.findMany({
    where: {
      deletedAt: null,
    },
    include: {
      professor: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      likes: true,
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
}
