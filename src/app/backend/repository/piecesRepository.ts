import { prisma, Prisma } from "@/lib/prisma";
import { CreatePieces, CustomPieces } from "../types/models/entity";
import { selectFields } from "../utils/filtersRepository";

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

    async create(pieces: CreatePieces) {
        try {
            return await prisma.pieces.create({
                data: {
                    name: pieces.name,
                    description: pieces.description,
                    price: pieces.price,
                    stock: pieces.stock,
                    categoryId: pieces.categoryId,
                    availablePieces_vehicle: {
                        create: {
                            brand: pieces.availableVehicle.brand,
                            model: pieces.availableVehicle.model
                        }
                    },
                    informationPieces: {
                        create: {
                            pieceName: pieces.name,
                            stockEntry: pieces.stock
                        }
                    }
                }
            });
        } catch (error) {
            console.log(error)
            throw new Error("Error en la creacion de nuevos campos");
        }
    },

    async update(id: number, data: Record<string, unknown>) {
        const currentPiece = await prisma.pieces.findUnique({
            where: { id },
            select: { stock: true, name: true }
        });

        const stockEntry =
            typeof data.stock === "object" && data.stock !== null && "set" in data.stock
                ? data.stock.set
                : data.stock;

        let stockDifference = 0;

        const oldStock = Number(currentPiece?.stock ?? 0);
        const parsedNewStock = typeof stockEntry === "number" ? stockEntry : Number(stockEntry ?? oldStock);

        if (!isNaN(parsedNewStock)) {
            stockDifference = parsedNewStock - oldStock;
        }

        const prismaData: Prisma.PiecesUpdateInput = {
            ...data,
            ...('stock' in data
                ? {
                    informationPieces: {
                        create: {
                            pieceName: currentPiece?.name as string,
                            stockEntry: stockDifference as number
                        }
                    }
                }
                : {}),
        };

        const dataReturn = selectFields(data);

        try {
            return await prisma.pieces.update({
                where: { id },
                data: prismaData,
                select: dataReturn
            });
        } catch (error) {
            throw new Error("Error en la actualizacion de campos" + error);
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