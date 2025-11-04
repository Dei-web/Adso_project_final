import { prisma, Prisma } from "@/lib/prisma";
import { CustomPieces, ModifyPieces } from "../types/models/entity";

export const piecesRepository = {
    async findMany(): Promise<CustomPieces[]> {
        try {
            return await prisma.pieces.findMany();
        } catch {
            throw new Error("Error en la busqueda de campos");
        }
    },

    async findById(id: number) {
        try {
            return await prisma.pieces.findUnique({
                where: { id }
            });
        } catch {
            throw new Error("Error en la busqueda del campo solicitado");
        }
    },

    async create(pieces: ModifyPieces) {
        try {
            return await prisma.pieces.create({
                data: {
                    ...pieces
                }
            });
        } catch {
            throw new Error("Error en la creacion de nuevos campos");
        }
    },

    async update(id: number, data: Prisma.PiecesUpdateInput) {
        try {
            return await prisma.pieces.update({
                where: { id },
                data
            });
        } catch (error) {
            throw new Error("Error en la actualizacion de campos"+ error);
        }
    },

    async delete(id: number) {
        try {
            return await prisma.pieces.delete({
                where: { id }
            })
        } catch {
            throw new Error("Error en la eliminacion de campos");
        }
    }
}