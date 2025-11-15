import { documentRepository } from "../repository/documentRepository";

export async function createDocument(file: File) {
    if (!file) throw new Error("No se encontraron campos para insercion");

    const buffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(buffer.slice(0));

    const createSuccess = await documentRepository.create(file, uint8);

    if (!createSuccess) throw new Error("Erro al crear nuevos campos");
    
    return createSuccess;
}

export async function getAllDocument() {
    const getAll = await documentRepository.findAll();

    if (!getAll) throw new Error("No se encontraron documentos almacenados");

    return getAll;
}

export async function getOneDocument(id: string) {
    if (!id) throw new Error("ID no especificado");

    const getOne = await documentRepository.findOne(id);

    if (!getOne) throw new Error("No se encontro el campo especificado");
    
    return getOne;
}

export async function deleteDocument(id: string) {
    if (!id) throw new Error("ID no especificado");
    
    const deleteSuccess = await documentRepository.delete(id);

    return deleteSuccess;
}