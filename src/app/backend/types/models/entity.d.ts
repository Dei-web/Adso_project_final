import { Decimal } from "decimal.js";
import type { PieceState } from '@prisma/client';

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

export enum TypeAccount {
  MECANICO = "MECANICO",
  ADMINISTRADOR = "ADMINISTRADOR",
}

export enum AppointmentState {
  ASIGNADA = "ASIGNADA",
  COMPLETADA = "COMPLETADA",
  PENDIENTE = "PENDIENTE",
  CANCELADA = "CANCELADA",
}

/* ========================= MODELS ========================= */

export interface Session {
  id: number;
  name: string;
  identificacion: string;
  role: TypeAccount;
  createdAt: Date;
  credentials?: Credentials;
}

export interface Credentials {
  id: number;
  password: string;
  updatedAt: Date;
  sessionId: number;
  author: Session;
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
  clientId: number;
  author: Client;
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

export interface Invoice {
  id: number;
  createAt: Date;
  total: Decimal; // Decimal
  clientId: number;
  author: Client;
  invoiceDetail?: InvoiceDetail;
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
  ubicationId: number;
  createAt: Date;
  updatedAt: Date;
  availablePieces_vehicle?: AvailablePieces_vehicle[];
  informationPieces?: InformationPieces[];
  invoiceDetail?: InvoiceDetail[];
  pieceCategory?: PieceCategory;
  ubicationPiece?: UbicationPiece;
}

export interface ModifyPieces {
  name: string;
  description: string;
  price: Decimal;
  estado: PieceState;
  stock: number;
  categoryId: number;
  ubicationId: number;
}

export interface InformationPieces {
  id: number;
  dateOf_entry: Date;
  moreInformation_id: number;
  author: Pieces;
}

export interface PieceCategory {
  id: number;
  name: string;
  description: string;
  createAt: Date;
  pieces?: Pieces[];
}

export interface UbicationPiece {
  id: number;
  ubication: string;
  createAt: Date;
  piece?: Pieces[];
}

export interface AvailablePieces_vehicle {
  id: number;
  brand: string;
  model: string;
  pieceVehiculo_id: number;
  author: Pieces;
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
