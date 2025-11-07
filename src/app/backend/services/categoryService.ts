import { categoryRepository } from "../repository/categoryRepository";
import { piecesRepository } from "../repository/piecesRepository";
import { ModifyCategory, PieceCategory } from "../types/models/entity";

export async function getCategory(): Promise<PieceCategory[]> {
    const data = await categoryRepository.findMany();

    if (!data.length) {
        throw new Error("No se encontraron categorias");
    }

    return data;
}

export async function getCategoryById(id: string): Promise<PieceCategory> {
    if (!id) {
        throw new Error("No se ha suministrado un parametro valido");
    }

    const pieceId = parseInt(id, 10);

    const data = await categoryRepository.findById(pieceId);

    if (!data) {
        throw new Error("No se econtro la pieza especificada");
    }

    return data;
}

export async function createCategory(newCategory: ModifyCategory) {
    return await categoryRepository.create(newCategory);
}

function cleanData<T extends Record<string, unknown>>(data: T): Partial<T> {
    const cleaned = Object.fromEntries(
        Object.entries(data).filter(([__, v]) => v !== undefined)
    );
    return cleaned as Partial<T>;
}

export async function updateById<T extends Record<string, unknown>>(id: string, input: T) {
    if (!id) {
        throw new Error("No se ha suministrado un parametro valido");
    }

    const pieceId = parseInt(id, 10);
    const data = cleanData(input);

    if (Object.keys(data).length === 0) {
        throw new Error("No se proporcionaron campos para actualizar");
    }

    return await piecesRepository.update(pieceId, input);
}

export async function deleteById(id: string) {
    if (!id) {
        throw new Error("No se ha suministrado un parametro valido");
    }

    const categoryId = parseInt(id, 10);
    const data = categoryRepository.findById(categoryId);

    if (!data) {
        throw new Error("Categoria inexistente");
    }

    return categoryRepository.delete(categoryId);
}