import { authRepository } from "../repository/authRepository";
import { CustomSession, CreateSession } from "../types/models/entity";

export async function getSessionById(identificacion: string): Promise<CustomSession> {
    const data = await authRepository.findById(identificacion);

    if (!data) {
        throw new Error("No hay usuarios disponibles");
    }

    return data;
}

export async function createSession(newSession: CreateSession) {
    return await authRepository.createSession(newSession);
}

function cleanData<T extends Record<string, unknown>>(data: T): Partial<T> {
    const cleaned = Object.fromEntries(
        Object.entries(data).filter(([__, v]) => v !== undefined)
    );
    return cleaned as Partial<T>;
}

export async function updateById<T extends Record<string, unknown>> (email: string, input: T) {
    const data = cleanData(input);

    if (Object.keys(data).length === 0) {
        throw new Error("No se proporcionaron campos para actualizar");
    }

    return await authRepository.update(email, input);
}