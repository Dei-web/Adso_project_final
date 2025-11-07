import { prisma, Prisma } from '@/lib/prisma';
import { ModifyCategory, PieceCategory } from '../types/models/entity';

export const categoryRepository = {
    async findMany(): Promise<PieceCategory[]> {
        try {
            return await prisma.pieceCategory.findMany();
        } catch {
            throw new Error("Error en la busqueda de campos");
        }
    },

    async findById(id: number) {
        try {
            return await prisma.pieceCategory.findUnique({
                where: { id }
            });
        } catch {
            throw new Error("Error en la busqueda del campo solicitado");
        }
    },

    async create(pieces: ModifyCategory) {
        try {
            return await prisma.pieceCategory.create({
                data: {
                    ...pieces
                }
            });
        } catch {
            throw new Error("Error en la creacion de nuevos campos");
        }
    },

    async update(id: number, data: Prisma.PieceCategoryUpdateInput) {
        try {
            return await prisma.pieceCategory.update({
                where: { id },
                data
            });
        } catch {
            throw new Error("Error en la actualizacion de campos");
        }
    },

    async delete(id: number) {
        try {
            return await prisma.pieceCategory.delete({
                where: { id }
            })
        } catch {
            throw new Error("Error en la eliminacion de campos");
        }
    }
}