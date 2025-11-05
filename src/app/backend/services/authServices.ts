import { authRepository } from "../repository/authRepository";
import { CreateSession, ReturnSession } from "../types/models/entity";
import { hashed, verifyHash } from "./argonService";

export async function getSessionById(email: string, password: string): Promise<ReturnSession> {
    const data = await authRepository.findById(email);

    if (!data) {
        throw new Error("No hay usuarios disponibles");
    }

    if (!data.credentials) {
        throw new Error("El usuario no tiene credenciales asociadas");
    }

    const parsePass = await verifyHash(data.credentials.password, password);

    if (!parsePass) {
        throw new Error("Contraseña incorrecta");
    }

    return data;
}

export async function sessionExist(emailSession: string): Promise<boolean> {
    const success = await authRepository.getSession(emailSession);

    if (!success) {
        throw new Error("No se encontro el usuario consultado");
    }

    return success;
}

export async function createSession(newSession: CreateSession) {
    const dataSession = await newSession;
    const passHashed = await hashed(dataSession.password);
    dataSession.password = passHashed;
    return await authRepository.createSession(dataSession);
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