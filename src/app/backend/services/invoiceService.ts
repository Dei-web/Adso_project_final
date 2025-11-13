import { invoiceRepository } from "../repository/invoiceRepository";
import { GetInvoice, GetInvoiceById, InvoiceCreate, UpdateInvoiceDetails } from "../types/models/entity";

export async function getInvoiceById(id: string): Promise<GetInvoiceById | null> {
    const clientId = parseInt(id, 10);

    const data = await invoiceRepository.findById(clientId);

    return data;
}

export async function getAllInvoices(): Promise<GetInvoice[] | []> {
    const data = await invoiceRepository.findMany();

    return data;
}

export async function createInvoice(data: InvoiceCreate) {
    const invoiceCreate = await invoiceRepository.create(data);

    return invoiceCreate;
}

export async function delelteInvoice(id: string): Promise<boolean> {
    const invoiceId = parseInt(id, 10);

    const invoiceDelete = await invoiceRepository.delete(invoiceId);

    return invoiceDelete;
}

export async function updateInvoiceDetail(id: string, input: UpdateInvoiceDetails): Promise<GetInvoice | null> {
    const invoiceId = parseInt(id, 10);
    
    return await invoiceRepository.updateInvoice(invoiceId, input);
}