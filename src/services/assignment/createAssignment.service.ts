import prisma from '../../database/db';

export default async function createAssignmentService(content: string, professorId: string) {
  await prisma.assignment.create({ data: { content, professorId }, select: { id: true } });
}