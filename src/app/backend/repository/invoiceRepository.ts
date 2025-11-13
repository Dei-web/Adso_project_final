import { prisma } from "@/lib/prisma";
import { toInvoiceCreateInput } from "../mappers/invoiceMapper";
import { GetInvoice, GetInvoiceById, InvoiceCreate, UpdateInvoiceDetails, InvoiceDetailInput } from "../types/models/entity";
import { Decimal } from "@prisma/client/runtime/library";

export const invoiceRepository = {
    async findMany(): Promise<GetInvoice[] | []> {
        try {
            return await prisma.invoice.findMany({
                orderBy: {
                  id: 'asc'
                },
                include: {
                    author: {
                        select: {
                            fullName: true,
                            fullSurname: true,
                        }
                    },
                    invoiceDetail: {
                        select: {
                            id: true,
                            amount: true,
                            subtotal: true,
                            extra: true,
                            description: true,
                            pieces: {
                                select: {
                                    name: true,
                                    price: true
                                }
                            },
                            purchasedService: {
                                select: {
                                    name: true,
                                    price: true
                                }
                            }
                        }
                    }
                }
            });
        } catch {
            throw new Error("Ha ocurrido un error inesperado en la consulta de datos");
        }
    },

    async findById(id: number): Promise<GetInvoiceById | null> {
        try {
            return await prisma.client.findUnique({
                where: { id },
                select: {
                    id: true,
                    fullName: true,
                    fullSurname: true,
                    clientContact: {
                        select: {
                            phoneNumber: true,
                            email: true
                        }
                    },
                    clientInvoice: {
                        select: {
                            total: true,
                            createAt: true,
                            invoiceDetail: {
                                select: {
                                    id: true,
                                    amount: true,
                                    subtotal: true,
                                    extra: true,
                                    description: true,
                                    pieces: {
                                        select: {
                                            id: true,
                                            name: true,
                                            price: true
                                        }
                                    },
                                    purchasedService: {
                                        select: {
                                            id: true,
                                            name: true,
                                            price: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        } catch {
            throw new Error("Ha ocurrido un error inesperado en la consulta de datos unicos");
        }
    },

    async updateInvoice(id: number, data: UpdateInvoiceDetails): Promise<GetInvoice | null> {
        return await prisma.$transaction(async (tx) => {
            const { detailId, amount = 1, description, services, pieces } = data;

            const invoice = await tx.invoice.findUnique({
                where: { id },
                include: { invoiceDetail: true },
            });

            if (!invoice) throw new Error("Factura no encontrada");

            const oldDetail = await tx.invoiceDetail.findUnique({
                where: { id: detailId },
                select: {
                    id: true,
                    amount: true,
                    pieceId: true,
                    purchasedService: true,
                },
            });

            if (!oldDetail) throw new Error("Detalle de factura no encontrado");

            let price = new Decimal(0);

            if (pieces) {
                const piece = await tx.pieces.findUnique({
                    where: { id: pieces.id },
                    select: { price: true, stock: true },
                });
                if (!piece) throw new Error('Pieza no encontrada');
                price = piece.price;

                const diff = amount - (oldDetail.amount ?? 0);

                if (diff !== 0) {
                    const newStock = piece.stock - diff;
                    if (newStock < 0) throw new Error("Stock insuficiente para esta pieza");

                    await tx.pieces.update({
                        where: { id: pieces.id },
                        data: { stock: newStock },
                    });
                }
            }

            if (services) {
                const service = await tx.services.findUnique({
                    where: { id: services.id },
                    select: { price: true },
                });
                if (!service) throw new Error('Servicio no encontrado');
                price = service.price;
            }

            const subtotal = price.mul(amount);

            await tx.invoiceDetail.updateMany({
                where: { id: id },
                data: {
                    amount,
                    subtotal,
                    description,
                }
            });

            const details = await tx.invoiceDetail.findMany({
                where: { id: id },
                select: { subtotal: true, amount: true },
            });

            const total = details.reduce(
                (acc, d) => acc.plus(d.subtotal),
                new Decimal(0)
            );

            const updatedInvoice = await tx.invoice.update({
                where: { id },
                data: { total },
                include: {
                    author: { select: { fullName: true, fullSurname: true } },
                    invoiceDetail: {
                        select: {
                            amount: true,
                            subtotal: true,
                            extra: true,
                            description: true,
                            purchasedService: { select: { name: true, price: true } },
                            pieces: { select: { name: true, price: true } },
                        },
                    },
                },
            });

            return updatedInvoice;
        });
    },


    async create(data: InvoiceCreate) {
        try {
            return await prisma.$transaction(async tx => {
                const pieceDetails: InvoiceDetailInput[] = data.pieces ? await Promise.all(
                    data.pieces.map(async (item) => {
                        const piece = await tx.pieces.findUnique({
                            where: { id: item.id }
                        });

                        if (!piece) throw new Error(`El ID ${item.id} de la pieza solicitada no se encuentra disponible`);

                        if (piece.stock < item.amount) throw new Error("No hay stock disponible para esta pieza");

                        if (item.amount > piece.stock) throw new Error("La cantidad digitada supera a la esperada");

                        const subtotal = piece.price.mul(item.amount);

                        const pieceUpdate = await tx.pieces.update({
                            where: { id: item.id },
                            data: {
                                stock: {
                                    decrement: item.amount
                                }
                            }
                        });

                        if (pieceUpdate.stock === 0) {
                            await tx.pieces.update({
                                where: { id: item.id },
                                data: {
                                    estado: 'AGOTADO'
                                }
                            })
                        }

                        return {
                            pieces: { connect: { id: piece.id } },
                            amount: item.amount,
                            subtotal,
                            ...('description' in item ? {
                                description: item.description as string
                            } : {})
                        }
                    })
                ) : [];

                const serviceDetails: InvoiceDetailInput[] = data.service ? await Promise.all(
                    data.service.map(async (item) => {
                        const service = await tx.services.findUnique({
                            where: { id: item.id }
                        })

                        if (!service) throw new Error(`El ID ${item.id} del servicio solicitado no se encuentra disponible`);

                        const subtotal = service.price;

                        return {
                            purchasedService: { connect: { id: item.id } },
                            subtotal,
                            ...('description' in item ? {
                                description: item.description as string
                            } : {})
                        }
                    })
                ) : [];

                const allDetails = [...pieceDetails, ...serviceDetails];

                const invoiceData = toInvoiceCreateInput(data, allDetails);

                const invoiceCreate = await tx.invoice.create({
                    data: invoiceData
                });

                return invoiceCreate ? true : false;
            });
        } catch (error) {
            console.log(error);
            throw new Error("Ha ocurrido un error inesperado en la consulta de datos");
        }
    },

    async delete(id: number): Promise<boolean> {
        try {
            const invoiceDelete = await prisma.invoice.delete({
                where: { id }
            });

            return invoiceDelete ? true : false;
        } catch {
            throw new Error("Ha ocurrido un error inesperado en la eliminacion de campos");
        }
    }
}