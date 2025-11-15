import { appointmentRepository } from "../repository/appointmentsRepository";
import { GetAppointment, CreateAppointment, UpdateAppointment } from "../types/models/entity";

export async function getAppointmentById(id: string): Promise<GetAppointment | null> {
    const appointmentId = parseInt(id, 10);

    const data = await appointmentRepository.findById(appointmentId);

    return data;
}

export async function getAllAppointment(): Promise<GetAppointment[] | []> {
    const data = await appointmentRepository.findMany();

    return data;
}

export async function createAppointment(data: CreateAppointment) {
    const appointmentCreate = await appointmentRepository.create(data);

    return appointmentCreate;
}

export async function deleteAppointment(id: string): Promise<boolean> {
    const appointmentId = parseInt(id, 10);

    const appointmentDelete = await appointmentRepository.delete(appointmentId);

    return appointmentDelete;
}

export async function updateAppointment(id: string, input: UpdateAppointment) {
    const appointmentId = parseInt(id, 10);
    
    return await appointmentRepository.update(appointmentId, input);
}