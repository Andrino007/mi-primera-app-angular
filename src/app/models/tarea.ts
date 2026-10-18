export interface Tarea {
    id: number;
    titulo: string;
    completada: boolean;
    prioridad: 'baja' | 'media' | 'alta'; 
}