import { Prisma } from '@prisma/client';
import { InvoiceDetailInput } from '../types/models/entity';

export function toInvoiceCreateInput(data: Record<string, unknown>, allDetails: InvoiceDetailInput[]): Prisma.InvoiceCreateInput {
    const total = allDetails.reduce(
        (sum, d) => sum.add(d.subtotal),
        new Prisma.Decimal(0)
    );

    const prismaData: Prisma.InvoiceCreateInput = {
        author: {
            connect: { id: data.clientId as number }
        },
        total,
        invoiceDetail: {
            create: allDetails,
        },
    }

    return prismaData;
}