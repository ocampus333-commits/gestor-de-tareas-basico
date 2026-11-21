export enum estadoTarea {
    pendiente = "pendiente",
    enProgreso = "en progreso",
    completado = "tarea completada",
}

export interface tarea{
    titulo : string
    descripcion : string
    estado : estadoTarea
    prioridad: prioridadDeTareas
    fechaDeCreacion : Date
}

export enum prioridadDeTareas {
    alta = "alta",
    media =  "media",
    baja = "baja",  
}

