import { prisma, Prisma } from "@/lib/prisma";
import { CreateSession, CustomSession, ReturnCredentials, ReturnSession } from "../types/models/entity";
import { selectFields } from "../utils/filtersRepository";

export const authRepository = {
    async findMany(): Promise<CustomSession[] | null> {
        try {
            return await prisma.session.findMany({
                select: {
                  id: true,
                  name: true,
                  identificacion: true,
                  email: true 
                }
            });
        } catch {
            throw new Error("Ha ocurrido un error inesperado en la consulta de campos");
        }
    },

    async findById(email: string): Promise<ReturnSession | null> {
        try {
            return await prisma.session.findFirst({
                where: { email },
                select: {
                    id: true,
                    name: true,
                    identificacion: true,
                    email: true,
                    role: true,
                    credentials: {
                        select: {
                            password: true
                        }
                    }
                }
            });
        } catch {
            throw new Error("Error al consultar usuario");
        }
    },

    async getPass(email: string): Promise<ReturnCredentials | null> {
        try {
            return await prisma.session.findUnique({
                where: { email },
                select: {
                    id: true,
                    credentials: {
                        select: {
                            password: true
                        }
                    }
                }
            });
        } catch {
            throw new Error("Error al consultar usuario");
        }
    },

    async getSession(emailSession: string): Promise<boolean> {
        try {
            const count = await prisma.session.count({
                where: { email: emailSession }
            });

            return count > 0;
        } catch {
            throw new Error("Error al consultar usuario");
        }
    },

    async createSession(data: CreateSession) {
        try {
            return await prisma.session.create({
                data: {
                    name: data.name,
                    identificacion: data.identificacion,
                    email: data.email,
                    credentials: {
                        create: {
                            password: data.password
                        }
                    }
                }
            });
        } catch {
            throw new Error("Error en la creacion de nuevos campos");
        }
    },

    async update(email: string, data: Record<string, unknown>): Promise<boolean> {
        try {
            const sessionData: Record<string, unknown> = {};
            const credentialsData: Record<string, unknown> = {};

            const allowedSessionFields = ['name', 'role'];
            const allowedCredentialsFields = ['password'];

            for (const key in data) {
                if (key === 'email') continue;

                if (allowedCredentialsFields.includes(key)) {
                    credentialsData[key] = data[key];
                } else if (allowedSessionFields.includes(key)) {
                    sessionData[key] = data[key];
                }
            }

            const prismaData: Prisma.SessionUpdateInput = {
                ...sessionData,
                ...(Object.keys(credentialsData).length > 0
                    ? { credentials: { update: credentialsData } }
                    : {}),
            };

            const result = await prisma.session.update({
                where: { email },
                data: prismaData
            });

            return typeof result === "object";
        } catch {
            throw new Error("Error en la actualizacion de campos");
        }
    }
}