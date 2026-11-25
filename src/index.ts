import * as readline from "node:readline";

import { gestorDeTareas } from "./gestor-de-tareas";
import { prioridadDeTareas, estadoTarea } from "./tarea";
const rl = readline.createInterface({input: process.stdin, output: process.stdout,});
function preguntar(texto: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(texto, (respuesta) => resolve(respuesta.trim()));
    });
}

const gestor = new gestorDeTareas();

async function iniciarMenu(): Promise<void> {
    let salir = false;

    while (!salir) {
        console.log("\n=================================");
        console.log("       GESTOR DE TAREAS          ");
        console.log("=================================");
        console.log("1. Ver todas las tareas");
        console.log("2. Agregar nueva tarea");
        console.log("3. Modificar título de una tarea");
        console.log("4. Modificar descripción");
        console.log("5. Modificar estado");
        console.log("6. Modificar prioridad");
        console.log("7. Salir");
        console.log("=================================");

        const opcion = await preguntar("Elige una opción (1-7): ");

        switch (opcion) {
            case "1":
                console.log("\n--- TUS TAREAS ---");
                gestor.mostrarTareas();
                break;

            case "2": {
                const titulo = await preguntar("Título: ");
                const descripcion = await preguntar("Descripción: ");
                console.log("\nPrioridad: [1] Alta  [2] Media  [3] Baja");
                const opPrioridad = await preguntar("Selecciona prioridad (1-3): ");

                let prioridad = prioridadDeTareas.media;
                if (opPrioridad === "1") prioridad = prioridadDeTareas.alta;
                else if (opPrioridad === "3") prioridad = prioridadDeTareas.baja;

                gestor.agregarTarea(titulo, descripcion, prioridad);
                console.log("Tarea agregada exitosamente.");
                break;
            }

            case "3": {
                const tituloOriginal = await preguntar("Título actual de la tarea: ");
                const nuevoTitulo = await preguntar("Nuevo título: ");
                gestor.modificarTitulo(tituloOriginal, nuevoTitulo);
                break;
            }

            case "4": {
                const descripcionOriginal = await preguntar("Descripción actual de la tarea: ");
                const nuevaDescripcion = await preguntar("Nueva descripción: ");
                gestor.modificarDescripcion(descripcionOriginal, nuevaDescripcion);
                break;
            }

            case "5": {
                console.log("\nEstados disponibles:");
                console.log("[1] Pendiente  [2] En progreso  [3] Completada");
                const estadoActualOp = await preguntar("Estado actual a buscar (1-3): ");
                const nuevoEstadoOp = await preguntar("Nuevo estado a asignar (1-3): ");

                const mapaEstados: Record<string, estadoTarea> = {
                    "1": estadoTarea.pendiente,
                    "2": estadoTarea.enProgreso,
                    "3": estadoTarea.completado,
                };

                const estadoOriginal = mapaEstados[estadoActualOp];
                const nuevoEstado = mapaEstados[nuevoEstadoOp];

                if (estadoOriginal && nuevoEstado) {
                    gestor.modificarEstado(estadoOriginal, nuevoEstado);
                } else {
                    console.log("Opción de estado inválida.");
                }
                break;
            }

            case "6": {
                console.log("\nPrioridades disponibles:");
                console.log("[1] Alta  [2] Media  [3] Baja");
                const prioridadActualOp = await preguntar("Prioridad actual a buscar (1-3): ");
                const nuevaPrioridadOp = await preguntar("Nueva prioridad a asignar (1-3): ");

                const mapaPrioridades: Record<string, prioridadDeTareas> = {
                    "1": prioridadDeTareas.alta,
                    "2": prioridadDeTareas.media,
                    "3": prioridadDeTareas.baja,
                };

                const prioridadOriginal = mapaPrioridades[prioridadActualOp];
                const nuevaPrioridad = mapaPrioridades[nuevaPrioridadOp];

                if (prioridadOriginal && nuevaPrioridad) {
                    gestor.modificarPrioridad(prioridadOriginal, nuevaPrioridad);
                } else {
                    console.log("Opción de prioridad inválida.");
                }
                break;
            }

            case "7":
                console.log("\n¡Hasta luego!");
                salir = true;
                break;

            default:
                console.log("Opción no válida. Escribe un número del 1 al 7.");
                break;
        }
    }

    rl.close();
}

iniciarMenu();
