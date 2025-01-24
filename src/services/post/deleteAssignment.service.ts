import prisma from "../../database/db";

export default async function deleteAssignmentService(assignmentId: string) {
  await prisma.assignment.update({
    where: {
      id: assignmentId,
    },
    data: {
      deletedAt: new Date(),
    }
  })
}