import { prisma, Prisma } from '@/lib/prisma';
import { CreateVehicle, GetVehicleClient, UpdateVehicle } from "../types/models/entity";
import { toClientVehicle_CreateInput } from '../mappers/clientVehicleMapper';
import { selectFields } from '../utils/filtersRepository';

export const clientVehicleRepository = {
    async findMany(): Promise<GetVehicleClient[] | []> {
        try {
            return await prisma.clientVehicle.findMany({
                orderBy: {
                    id: 'asc'
                },
                select: {
                    brand: true,
                    model: true,
                    year: true,
                    engineDisplacement: true,
                    description: true
                }
            });
        } catch {
            throw new Error("Ha ocurrido un error inesperado en la consulta de campos");
        }
    },

    async findById(id: number): Promise<GetVehicleClient | null> {
        try {
            return await prisma.clientVehicle.findUnique({
                where: { id },
                select: {
                    brand: true,
                    model: true,
                    year: true,
                    engineDisplacement: true,
                    description: true
                }
            });
        } catch {
            throw new Error("Ha ocurrido un error inesperado en la consulta");
        }
    },

    async create(data: CreateVehicle): Promise<boolean> {
        const prismaData = toClientVehicle_CreateInput(data);

        try {
            const vehicleCreate = await prisma.clientVehicle.create({
                data: prismaData,
            });

            return vehicleCreate ? true : false;
        } catch (error) {
            console.log(error)
            throw new Error("Ha ocurrido un error inesperado en la insercion de datos");
        }
    },

    async update(id: number, data: UpdateVehicle) {
        const vehicleData: Record<string, unknown> = {};

        const allowedVehicleFields = ['description', 'engineDisplacement'];

        for (const key in data) {
            if (key === 'id') continue;

            if (allowedVehicleFields.includes(key)) {
                vehicleData[key] = data[key]
            }
        }

        const prismaData: Prisma.ClientVehicleUpdateInput = {
            ...vehicleData
        }

        const select = selectFields(vehicleData);

        try {
            return await prisma.clientVehicle.update({
                where: { id },
                data: prismaData,
                select
            });
        } catch {
            throw new Error("Ha ocurrido un error inesperado en la actualizacion de campos");
        }
    },

    async delete(id: number): Promise<boolean> {
        try {
            const dropVehicle = await prisma.clientVehicle.delete({
                where: { id }
            });

            return dropVehicle ? true : false;
        } catch {
            throw new Error("Ha ocurrido un error inesperado en la eliminacion de campos");
        }
    }
}