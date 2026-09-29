import { habitaciones } from "../db/db.js"
import hotelesControllers from "./hoteles.controller.js"
import { v4 as uuidv4 } from 'uuid';

class HabitacionesController {
    mostrarTodas(){
        return({
            data: habitaciones.length === 0 ? null : habitaciones,
            message: habitaciones.length === 0 ? "No hay habitaciones en ningun hotel" : "Habitaciones listadas exitosamente"
        })
    }

    mostrarUna(idHabitacion){
        for (let i = 0; i < habitaciones.length; i++) {
            if (habitaciones[i].id === idHabitacion) {
                return({
                    data: {
                        habitacion: habitaciones[i]
                    },
                    message: "Habitacion encontrada con exito"
                })
            }
        }

        return({
            data: null,
            message: "Habitacion no encontrada"
        })
    }

    mostrarHabitacionHotel(idHotel){
        const habitacionesHotel = habitaciones.filter(habitacion => habitacion.idHotel === idHotel);
        if (habitacionesHotel.length === 0) {
            return({
                data: null,
                message: "El hotel no tiene asignada ninguna habitacion"
            })
        }

        return({
            data: {
                habitaciones: habitacionesHotel
            },
            message: "Habitaciones del hotel listadas exitosamente"
        })
    }

    agregarUnaHabitacion(newHabitacion, idHotel){
        const validacionHotel = hotelesControllers.motrarUno(idHotel)
        if (validacionHotel.data === null) {
           return({
            data: null,
            message: "Hotel al que quieres agregar la habitacion no existe"
           }) 
        }

        if (!newHabitacion.capacidad || !newHabitacion.precioPorNoche || !newHabitacion.numero) {
            return({
                data: null,
                message: "Faltan datos indispensables"
            })
        }

        const nuevaHabitacion = {
            id: uuidv4(),
            idHotel: idHotel,
            capacidad: newHabitacion.capacidad,
            precioPorNoche: newHabitacion.precioPorNoche,
            numero: newHabitacion.numero
        }
        habitaciones.push(nuevaHabitacion)
        return({
            data: {
                newHabitacion,
                habitaciones
            },
            message: "Habitacion creada existosamente"
        })
    }

    actualizarHabitacion(updateHabitacion, idHabitacion){
        for (let i = 0; i < habitaciones.length; i++) {
            if (habitaciones[i].id === idHabitacion) {
                habitaciones[i].capacidad = !updateHabitacion.capacidad ? habitaciones[i].capacidad : updateHabitacion.capacidad
                habitaciones[i].precioPorNoche = !updateHabitacion.precioPorNoche ? habitaciones[i].precioPorNoche : updateHabitacion.precioPorNoche
                habitaciones[i].numero = !updateHabitacion.numero ? habitaciones[i].numero : updateHabitacion.numero

                return({
                    data: {
                        updateHabitacion: habitaciones[i],
                        habitaciones
                    }
                })
            }
        }

        return({
            data: null,
            message: "Habitacion no encontrada"
        })
    }

    eliminarHabitacion(idHabitacion){
        for (let i = 0; i < habitaciones.length; i++) {
            if (habitaciones[i].id === idHabitacion) {
                habitaciones.splice(i, 1)
                return({
                    data: {
                        habitaciones
                    }
                })
            }
        }

        return({
            data: null,
            message: "Habitacion no encontrada"
        })
    }
}

const habitacionesController = new HabitacionesController
export default habitacionesController