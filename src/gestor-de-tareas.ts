import { prioridadDeTareas, tarea, estadoTarea } from "./tarea";
import * as fs from "node:fs"; 
import * as path from "node:path";
//creo clase de gestor de tarea
export class gestorDeTareas {
    
    constructor() {
        this.cargarTareas();
    }

    //declaro array para almacenar tareas
    private tareas: tarea[] = []

    //ruta hacias el json
    private rutaArchivos: string = path.join(process.cwd(), "tareas.json")

    //metodo para guardar tareas en json
    private guardarTareas(): void{
        const contenidoDelTexto = JSON.stringify(this.tareas, null, 2);
        fs.writeFileSync(this.rutaArchivos, contenidoDelTexto, "utf-8");
    }

    //Metodo para cargar las tareas en json
    private cargarTareas(): void{
        if (!fs.existsSync(this.rutaArchivos)){
            return;
        }

        try{
            const datosTexto = fs.readFileSync(this.rutaArchivos, "utf-8");
            const datosParseados = JSON.parse(datosTexto) as tarea[];
            this.tareas = datosParseados.map((t) => ({
                ...t,
                fechaDeCreacion: new Date(t.fechaDeCreacion),
            }));

        } catch (error) {
            console.error("Error al cargar las tareas del archivoN:",         error);
            this.tareas = [];
        } 
    }

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
        this.guardarTareas()
        return nuevaTarea
    }

    //metodo para mostrar las tareas
    public mostrarTareas(): void {
        if (this.tareas.length === 0){
            console.log("en este momento no hay tareas registradas")
            return
        }
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
                this.guardarTareas()
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
                this.guardarTareas()
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
                this.guardarTareas()
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
                this.guardarTareas()
                return;
            }
        }
        console.log(`No se encontró ninguna tarea con la prioridad: "${prioridadOriginal}"`);
    }

}

