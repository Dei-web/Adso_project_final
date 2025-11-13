import { Prisma } from "@/lib/prisma";

type GetSession = Prisma.SessionGetPayload<{
  select: {
    id: number,
    name: string,
    identificacion: string,
    email: string
  }
}>

type ReturnSession = Prisma.SessionGetPayload<{
  select: {
    id: number;
    name: string;
    identificacion: string;
    email: string;
    role: string;
    credentials: {
      select: {
        password: string;
      }
    }
  }
}>

type GetCredentials = Prisma.SessionGetPayload<{
  select: {
    id: number;
    credentials: {
      select: {
        password: string;
      }
    }
  }
}>

type GetClient = Prisma.ClientGetPayload<{
  select: {
    fullName: true,
    fullSurname: true,
    identified: true,
    clientState: true,
    clientContact: {
      select: {
        phoneNumber: true,
        email: true,
        address: true
      }
    },
    clientVehicle: {
      select: {
        brand: true,
        model: true,
        year: true,
        engineDisplacement: true,
        description: true
      }
    }
  }
}>

type UpdateClient = Record<{
  clientState: boolean;
  phoneNumber: string;
  email: string;
  address: string;
  description?: string;
}>

type CreateClient = {
  fullName: string;
  fullSurname: string;
  identified: string;
  clientContact: {
    phoneNumber: string;
    email: string;
    address?: string;
  }
  clientVehicle?: {
    brand: string;
    model: string;
    year: Date;
    engineDisplacement: number;
    description?: string;
  }
}

export interface AppointmentScheduling {
  id: number;
  appointmentDate: Date;
  ubicacion: string;
  appointmentState: AppointmentState;
  details: string;
  employedId: number;
  clientId: number;
  authorEmployed: Session;
  author: Client;
}

export interface CreateAppointment {
  appointmentDate: Date;
  ubicacion: string;
  appointmentState: AppointmentState;
  details?: string;
  employedId: number;
  clientId: number;
}

export interface ModifyAppointMent {
  appointmentDate?: Date;
  ubicacion?: string;
  appointmentState?: AppointmentState;
  details?: string;
  employedId?: number;
}

export interface CreateVehicle {
  brand: string;
  model: string;
  year: Date;
  engineDisplacement: number;
  description?: string;
  clientId: number;
}

type InvoiceCreate = {
  clientId: number,
  service: {
    id: number
  }[] | null,
  pieces: {
    id: number,
    amount: number
  }[] | null
}

type GetInvoice = Prisma.InvoiceGetPayload<{
  include: {
    author: {
      select: {
        fullName: true,
        fullSurname: true,
      }
    },
    invoiceDetail: {
      select: {
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
}>

type GetInvoiceById = Prisma.ClientGetPayload<{
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
    }
  }
}>

type UpdateInvoiceDetails = {
  id: number;
  detailId;
  amount?: number;
  description?: string;
  services?: { id: number };
  pieces?: { id: number };
};

type InvoiceDetailInput = {
  amount?: number;
  subtotal: Prisma.Decimal;
  description?: string;
  piece?: { connect: { id: number } };
  service?: { connect: { id: number } };
}

type GetServices = Prisma.ServicesGetPayload<{
  select: {
    id: true,
    name: true,
    description: true,
    price: true,
    guarantee: true,
    author: {
      select: {
        name: true
      }
    }
  }
}>

type GetServiceCategory = Prisma.ServiceCategoryGetPayload<{
  select: {
    id: true,
    name: true,
    description: true
  }
}>

export interface ServiceCategory {
  id: number;
  name: string;
  description: string;
  createAt: Date;
  services?: Services[];
}

type GetPieces = Prisma.PiecesGetPayload<{
  select: {
    id: true,
    name: true,
    description: true,
    price: true,
    estado: true,
    stock: true,
    pieceCategory: {
      select: {
        name: true
      }
    }
  }
}>

export interface ModifyCategory {
  name: string;
  description: string;
}

export interface PieceCategory {
  id: number;
  name: string;
  description: string;
  createAt: Date;
  pieces?: Pieces[];
}

export interface Suppliers {
  id: number;
  name: string;
  state: StateSuppliers;
  payCondition: string;
  createAt: Date;
  updatedAt: Date;
  suppliersContact?: SuppliersContact;
  suppliersType?: SuppliersType[];
  suppliersUbication?: SuppliersUbication[];
}

export interface SuppliersUbication {
  id: number;
  country: string;
  city: string;
  region: string;
  proveedorId: number;
  author: Suppliers;
}

export interface SuppliersContact {
  id: number;
  direction: string;
  phoneNumber: string;
  email: string;
  proveedorId: number;
  author: Suppliers;
}

export interface SuppliersType {
  id: number;
  type: TypeSuppliers;
  proveedorId: number;
  author: Suppliers;
}

export interface LogApp {
  id: number;
  typeChange: TypeChange;
  origin: string;
  title: string;
  message?: string;
  data: unknown;
}
