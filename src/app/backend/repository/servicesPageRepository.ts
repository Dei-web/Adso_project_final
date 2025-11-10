import { prisma, Prisma } from "@/lib/prisma";
import { GetServices } from "../types/models/entity";
import { selectFields } from "../utils/filtersRepository";
import { toServiceCreateInput } from "../mappers/serviceMapper";

export const servicesPageRepository = {
    async findMany(): Promise<GetServices[] | null> {
        try {
            return await prisma.services.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    guarantee: true
                }
            });
        } catch {
            throw new Error("Error en la busqueda de campos");
        }
    },

    async findById(id: number): Promise<GetServices | null> {
        try {
            return await prisma.services.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    guarantee: true
                }
            });
        } catch {
            throw new Error("Error en la busqueda del campo solicitado");
        }
    },

    async create(service: Record<string, unknown>) {
        const prismaData = toServiceCreateInput(service);

        try {
            return await prisma.services.create({
                data: prismaData
            });
        } catch (error) {
            console.log(error)
            throw new Error("Error en la creacion de nuevos campos");
        }
    },

    async update(id: number, data: Record<string, unknown>) {
        const allowedServicesFields = ["name", "description", "price", "guarantee"];
        const dataServices: Record<string, unknown> = {};

        for (const key in data) {
            if (allowedServicesFields.includes(key)) {
                dataServices[key] = data[key];
            }
        }

        const prismaData: Prisma.ServicesUpdateInput = { ...dataServices };

        const dataReturn = selectFields(data);

        try {
            return await prisma.services.update({
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
            return await prisma.services.delete({
                where: { id }
            })
        } catch {
            throw new Error("Error en la eliminacion de campos");
        }
    }
}