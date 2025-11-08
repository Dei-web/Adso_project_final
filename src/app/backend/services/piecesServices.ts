import { piecesRepository } from "../repository/piecesRepository";
import { CustomPieces, CreatePieces } from "../types/models/entity";
import { cleanData } from "../utils/cleanData";

export async function getPieces(): Promise<CustomPieces[]> {
    const data = await piecesRepository.findMany();

    if (!data.length) {
        throw new Error("No se encontraron piezas disponibles");
    }

    return data;
}

export async function getPieceById(id: string): Promise<CustomPieces> {
    if (!id) {
        throw new Error("No se ha suministrado un parametron valido");
    }


    const pieceId = parseInt(id, 10);

    const data = await piecesRepository.findById(pieceId);

    if (!data) {
        throw new Error("No se econtro la pieza especificada");
    }

    return data;
}

export async function createPiece(newPiece: CreatePieces) {
    return await piecesRepository.create(newPiece);
}

export async function deletePiece(id: string) {
    const pieceId = parseInt(id, 10);

    if (!piecesRepository.findById(pieceId)) {
        throw new Error('Pieza inexistente');
    }

    return piecesRepository.delete(pieceId);
}

export async function updateById<T extends Record<string, unknown>>(id: string, input: T) {
    if (!id) {
        throw new Error("No se ha suministrado un parametro valido");
    }

    const pieceId = parseInt(id, 10);
    const data = cleanData.arrays(input);

    if (Object.keys(data).length === 0) {
        throw new Error("No se proporcionaron campos para actualizar");
    }

    return await piecesRepository.update(pieceId, data);
}