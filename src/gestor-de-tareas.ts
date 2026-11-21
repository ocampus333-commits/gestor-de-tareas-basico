import { prioridadDeTareas, tarea, estadoTarea } from "./tarea";
//creo clase de gestor de tarea
export class gestorDeTareas {

    //declaro array para almacenar tareas
    private tareas: tarea[] = []

    //metodo para crear nuevas tareas y almacenarlas
    public agregarTarea(titulo: string, descripcion: string, prioridad: prioridadDeTareas, estado: estadoTarea = estadoTarea.pendiente): tarea {
        const nuevaTarea: tarea = {
            titulo,
            descripcion,
            estado,
            prioridad,
            fechaDeCreacion: new Date()

        }
        this.tareas.push(nuevaTarea)
        return nuevaTarea
    }

    //metodo para mostrar las tareas
    public mostrarTareas(): void {
        for (const tarea of this.tareas) {
            console.log(tarea);
        }

    }

    //metodo modificar titulo
    public modificarTitulo(tituloOriginal: string, nuevoTitulo: string): void {
        for (const tarea of this.tareas) {
            if (tarea.titulo === tituloOriginal) {
                tarea.titulo = nuevoTitulo;
                console.log(`Título modificado con éxito a: "${nuevoTitulo}"`);
                return;
            }
        }
        console.log(`No se encontró ninguna tarea con el título: "${tituloOriginal}"`);
    }

    //metodo modificar la desripcion
    public modificarDescripcion(descripcionOriginal: string, nuevaDescripcion: string): void {
        for (const tarea of this.tareas) {
            if (tarea.descripcion === descripcionOriginal) {
                tarea.descripcion = nuevaDescripcion;
                console.log(`Descripción modificada con éxito a: "${nuevaDescripcion}"`);
                return;
            }
        }
        console.log(`No se encontró ninguna tarea con la descripción: "${descripcionOriginal}"`);
    }

    //metodo modificar estado
    public modificarEstado(estadoOriginal: estadoTarea, nuevoEstado: estadoTarea): void {
        for (const tarea of this.tareas) {
            if (tarea.estado === estadoOriginal) {
                tarea.estado = nuevoEstado;
                console.log(`Estado modificado con éxito a: "${nuevoEstado}"`);
                return;
            }
        }
        console.log(`No se encontró ninguna tarea con el estado: "${estadoOriginal}"`);
    }

    //metodo modificar prioridad
    public modificarPrioridad(prioridadOriginal: prioridadDeTareas, nuevaPriorida: prioridadDeTareas): void {
        for (const tarea of this.tareas) {
            if (tarea.prioridad === prioridadOriginal) {
                tarea.prioridad = nuevaPriorida;
                console.log(`Prioridad modificada con éxito a: "${nuevaPriorida}"`);
                return;
            }
        }
        console.log(`No se encontró ninguna tarea con la prioridad: "${prioridadOriginal}"`);
    }

}