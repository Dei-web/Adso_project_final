import { prisma } from "@/lib/prisma";

export const documentRepository = {
    async create(file: File, uint8: Uint8Array<ArrayBuffer>) {
        try {
            const doc = await prisma.document.create({
                data: {
                    name: file.name,
                    mimeType: file.type,
                    extension: file.name.split(".").pop()!,
                    data: uint8
                }
            });

            return doc;
        } catch (error) {
            console.error(error)
            throw new Error("Ha ocurrido un error inesperado en la insercion de campos");
        }
    },

    async findAll() {
        try {
            return await prisma.document.findMany({
                select: {
                    id: true,
                    name: true,
                    mimeType: true,
                    createdAt: true
                }
            });
        } catch {
            throw new Error("Ha ocurrido un error inesperado en la consulta de campos");
        }
    },

    async findOne(id: string) {
        try {
            return await prisma.document.findUnique({
                where: { id }
            });
        } catch {
            throw new Error("Ha ocurrido un error inesperado en la consulta del campo solicitado");
        }
    },

    async delete(id: string) {
        try {
            const success = await prisma.document.delete({
                where: { id }
            });

            return success ? true : false;
        } catch {
            throw new Error("Ha ocurrido un error inesperado en la eliminacion de campos");
        }
    }
};
