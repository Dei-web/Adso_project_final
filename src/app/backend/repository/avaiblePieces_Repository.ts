import { prisma, Prisma } from '@/lib/prisma';
import { AvailablePieces_vehicle, Create_AvailablePieces } from '../types/models/entity';

export const avaibleRepository = {
    async findMany(): Promise<AvailablePieces_vehicle[]> {
        try {
            return await prisma.availablePieces_vehicle.findMany();
        } catch {
            throw new Error("Error en la busqueda de campos");
        }
    },

    async findById(id: number): Promise<PieceCategory | null> {
        try {
            return await prisma.pieceCategory.findUnique({
                where: { id }
            });
        } catch {
            throw new Error("Error en la busqueda del campo solicitado");
        }
    },

    async create(category: ModifyCategory) {
        try {
            return await prisma.pieceCategory.create({
                data: {
                    ...category
                }
            });
        } catch (error) {
            console.log(error)
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