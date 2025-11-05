import { prisma, Prisma } from "@/lib/prisma";
import { CreateSession, ReturnCredentials, ReturnSession } from "../types/models/entity";

export const authRepository = {
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

    async update(email: string, data: Record<string, unknown>) {
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

            return await prisma.session.update({
                where: { email },
                data: prismaData,
                include: { credentials: true }
            });
        } catch {
            throw new Error("Error en la actualizacion de campos");
        }
    }
}