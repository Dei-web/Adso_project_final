import { Decimal } from "decimal.js";
import type { PieceState, TypeAccount } from '@prisma/client';

export enum TypeSuppliers {
  REPUESTOS = "REPUESTOS",
  HERRAMIENTAS = "HERRAMIENTAS",
  LUBRICANTES = "LUBRICANTES",
  SERVICIOS = "SERVICIOS",
  VEHICULOS = "VEHICULOS",
  CONSUMIBLES = "CONSUMIBLES",
  SOFTWARE = "SOFTWARE",
}

export enum StateSuppliers {
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO",
  PENDIENTE = "PENDIENTE",
  BLOQUEADO = "BLOQUEADO",
  SUSPENDIDO = "SUSPENDIDO",
  ELIMINADO = "ELIMINADO",
}

export enum TypeChange {
  UPDATE = "UPDATE",
  CREATE = "CREATE",
  DELETE = "DELETE",
  READ = "READ",
}

export enum AppointmentState {
  ASIGNADA = "ASIGNADA",
  COMPLETADA = "COMPLETADA",
  PENDIENTE = "PENDIENTE",
  CANCELADA = "CANCELADA",
}

/* ========================= MODELS ========================= */

export interface CreateSession {
  name: string;
  identificacion: string;
  email: string;
  password: string;
}

export interface ReturnSession {
  id: number;
  name: string;
  identificacion: string;
  email: string;
  role: string;
  credentials: { password: string } | null;
}

export interface ReturnCredentials {
  id: number;
  credentials: { password: string } | null;
}

export interface CustomSession {
  id: number;
  name: string;
  identificacion: string;
  email: string;
  role: TypeAccount;
}

export interface Client {
  id: number;
  fullName: string;
  fullSurname: string;
  identified: string;
  clientState: boolean;
  createdAt: Date;
  updatedAt: Date;
  clientAppointment?: AppointmentScheduling[];
  clientContact?: ClientContact[];
  clientVehicle?: ClientVehicle[];
  clientInvoice?: Invoice[];
}

export interface CreateClient {
  fullName: string;
  fullSurname: string;
  identified: string;
  clientState?: boolean;
  phoneNumber: string;
  email: string;
  address: string;
}

export interface ModifyClient {
  clientState?: boolean;
  clientcontact: {
    phoneNumber: string;
    email: string;
    address: string;
  } | null;
}

export interface ClientContact {
  id: number;
  phoneNumber: string;
  email: string;
  address: string;
  createAt: Date;
  updatedAt: Date;
  clientId: number;
  author: Client;
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

export interface ClientVehicle {
  id: number;
  brand: string;
  model: string;
  year: Date;
  engineDisplacement: number;
  createAt: Date;
  description: string;
  updatedAt: Date;
  clientId: number;
  author: Client;
}

export interface CreateVehicle {
  brand: string;
  model: string;
  year: Date;
  engineDisplacement: number;
  description?: string;
  clientId: number;
}

export interface ModifyVehicle {
  brand?: string;
  model?: string;
  year?: Date;
  engineDisplacement?: number;
  description?: string;
  clientId?: number;
}

export interface Invoice {
  id: number;
  createAt: Date;
  total: Decimal; // Decimal
  clientId: number;
  author: Client;
  invoiceDetail?: InvoiceDetail;
}

export interface CreateInvoice {
  total: Decimal;
  clientId: number;
  invoicedetail: {
    amount: number;
    subtotal: Decimal;
    extra: Decimal;
    description?: string;
    pieceId?: number;
    invoiceDetail_id?: number;
    serviceId?: number;
  } | null
}

export interface InvoiceDetail {
  id: number;
  amount: number;
  subtotal: Decimal; // Decimal
  extra: Decimal; // Decimal
  description: string;
  pieceId: number;
  invoiceDetail_id: number;
  serviceId: number;
  author: Invoice;
  pieces: Pieces;
  purchasedService: Services;
}

export interface Services {
  id: number;
  name: string;
  description: string;
  price: Decimal; // Decimal
  createAt: Date;
  updatedAt: Date;
  serviceCategory_id: number;
  guarantee: string;
  invoiceDetail?: InvoiceDetail[];
  author: ServiceCategory;
}

export interface CreateService {
  name: string;
  description?: string;
  price: Decimal; // Decimal
  serviceCategory_id: number;
  guarantee?: string;
}

export interface ModifyService {
  name?: string;
  description?: string;
  price?: Decimal; // Decimal
  guarantee?: string;
}

export interface ServiceCategory {
  id: number;
  name: string;
  description: string;
  createAt: Date;
  services?: Services[];
}

export interface CustomPieces {
  id: number;
  name: string;
  description: string;
  price: Decimal; // Decimal
  estado: PieceState;
  stock: number;
  categoryId: number;
  createAt: Date;
  updatedAt: Date;
  availablePieces_vehicle?: AvailablePieces_vehicle[];
  informationPieces?: InformationPieces[];
  invoiceDetail?: InvoiceDetail[];
  pieceCategory?: PieceCategory;
  ubicationPiece?: UbicationPiece;
}

export interface CreatePieces {
  name: string;
  description: string;
  price: Decimal;
  stock: number;
  categoryId: number;
  availableVehicle: {
    brand: string,
    model: string
  }
}

export interface ModifyPieces {
  name?: string;
  description?: string;
  price?: Decimal;
  estado?: PieceState;
  stock?: number;
  categoryId?: number;
}

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

export interface InformationPieces {
  id: number;
  dateOf_entry: Date;
  moreInformation_id: number;
  author: Pieces;
}

export interface AvailablePieces_vehicle {
  id: number;
  brand: string;
  model: string;
  pieceVehiculo_id: number;
  createAt: Date;
  createUpdate: Date;
  author?: Pieces;
}

export interface Create_AvailablePieces {
  brand: string;
  model: string;
  pieceVehiculo_id: number;
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
