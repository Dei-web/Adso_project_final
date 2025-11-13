import { Prisma } from '@prisma/client';
import { CreateClient } from "../types/models/entity";

export function toClientCreateInput(data: CreateClient) {
    const { clientContact, clientVehicle } = data;
    const prismaData: Prisma.ClientCreateInput = {
        fullName: data.fullName as string,
        fullSurname: data.fullSurname as string,
        identified: data.identified as string,
        clientContact: {
            create: {
                phoneNumber: clientContact.phoneNumber as string,
                email: clientContact.email as string,
                ...('address' in clientContact ? {
                    address: clientContact.address as string
                } : {})
            }
        },
        ...(clientVehicle && typeof clientVehicle === 'object' ? {
            clientVehicle: {
                create: {
                    brand: clientVehicle.brand as string,
                    model: clientVehicle.model as string,
                    year: clientVehicle.year as Date,
                    engineDisplacement: clientVehicle.engineDisplacement as number,
                    ...('description' in data ? {
                        description: clientVehicle.description as string
                    } : {}),
                }
            }
        } : {})
    }

    return prismaData ?? {};
}