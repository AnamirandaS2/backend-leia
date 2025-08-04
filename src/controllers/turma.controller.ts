import { Request, Response } from "express";
import prisma from "../database/db";
import createTurmaService from "../services/turma/createTurma.service";
import getTurmasService from "../services/turma/getTurmas.service";
import addStudentToTurmaService from "../services/turma/addStudentToTurma.service";
import updateTurmaService from "../services/turma/updateTurma.service";
import removeStudentFromTurmaService from "../services/turma/removeStudentFromTurma.service";

export async function createTurmaController(req: Request, res: Response) {
  try {
    const { name, description } = req.body;
    const { id: professorId } = req.user as { id: string };

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Nome da turma é obrigatório" });
    }

    const turma = await createTurmaService({
      name: name.trim(),
      description: description?.trim(),
      professorId,
    });

    return res.status(201).json(turma);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function getTurmasController(req: Request, res: Response) {
  try {
    const { id: professorId } = req.user as { id: string };

    const turmas = await getTurmasService(professorId);

    return res.status(200).json(turmas);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function updateTurmaController(req: Request, res: Response) {
  try {
    const { turmaId } = req.params;
    const { name, description } = req.body;
    const { id: professorId } = req.user as { id: string };

    const turma = await updateTurmaService({
      turmaId,
      professorId,
      name,
      description,
    });

    return res.status(200).json(turma);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function removeStudentFromTurmaController(
  req: Request,
  res: Response
) {
  try {
    const { turmaId, studentId } = req.params;
    const { id: professorId } = req.user as { id: string };

    if (!studentId) {
      return res.status(400).json({ message: "ID do aluno é obrigatório" });
    }

    const result = await removeStudentFromTurmaService({
      turmaId,
      studentId,
      professorId,
    });

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function addStudentToTurmaController(req: Request, res: Response) {
  try {
    const { turmaId } = req.params;
    const { userId } = req.body;
    const { id: professorId } = req.user as { id: string };

    if (!userId) {
      return res.status(400).json({ message: "ID do usuário é obrigatório" });
    }

    // Verificar se a turma pertence ao professor
    const turma = await prisma.turma.findFirst({
      where: {
        id: turmaId,
        professorId,
      },
    });

    if (!turma) {
      return res.status(404).json({ message: "Turma não encontrada" });
    }

    const result = await addStudentToTurmaService({
      turmaId,
      userId,
    });

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}
