import { habitaciones, hoteles } from "../db/db.js"
import { v4 as uuidv4 } from 'uuid';

class HotelesControllers {
    mostrarTodos(){
        return({
            data: hoteles.length === 0 ? null : hoteles,
            menssage: hoteles.length === 0 ? "No hay hoteles" : "Hoteles listados exitosamente"
        })
    }

    motrarUno(idHotel){
        for (let i = 0; i < hoteles.length; i++) {
            if (hoteles[i].id === idHotel) {
                return({
                    data: {
                        hotel: hoteles[i]
                    },
                    message: "Hotel encontrado con exito"
                })
            }
        }

        return({
            data: null,
            message: "Hotel no encontrado"
        })
    }

    agregarHotel(newHotel){
        if (!newHotel.nombre || !newHotel.ubicacion || !newHotel.rif || !newHotel.estrellas || !newHotel.dueño) {
            return({
                data: null,
                message: "Faltan datos indispensables"
            })
        }

        const nuevoHotel = {
            id: uuidv4(),
            nombre: newHotel.nombre,
            ubicacion: newHotel.ubicacion,
            rif: newHotel.rif,
            dueño: newHotel.dueño,
            estrellas: newHotel.estrellas,
        }
        hoteles.push(nuevoHotel)
        return({
            data: {
                nuevoHotel,
                hoteles
            },
            message: "Hotel agregado con exito"
        })
    }

    actualizarHotel(updateHotel, idHotel){
        for (let i = 0; i < hoteles.length; i++) {
            if (hoteles[i].id === idHotel) {
                hoteles[i].nombre = !updateHotel.nombre ? hoteles[i].nombre : updateHotel.nombre
                hoteles[i].rif = !updateHotel.rif ? hoteles[i].rif : updateHotel.rif
                hoteles[i].ubicacion = !updateHotel.ubicacion ? hoteles[i].ubicacion : updateHotel.ubicacion
                hoteles[i].estrellas = !updateHotel.estrellas ? hoteles[i].estrellas : updateHotel.estrellas
                hoteles[i].dueño = !updateHotel.dueño ? hoteles[i].dueño : updateHotel.dueño

                return({
                    data: {
                        updateHotel: hoteles[i],
                        hoteles
                    },
                    message: "Hotel actualizado exitosamente"
                })
            }
        }

        return({
            data: null,
            message: "Hotel no encontrado"
        })
    }

    eliminarHotel(idHotel){
        for (let i = 0; i < hoteles.length; i++) {
            if (hoteles[i].id === idHotel) {
                habitaciones.filter(habitacion => habitacion.idHotel != idHotel)
                
                hoteles.splice(i, 1)
                return({
                    data: {
                        hoteles
                    },
                    message: "Hotel eliminado exitosamente"
                })
            }
        }

        return({
            data: null,
            message: "Hotel no encontrado"
        })
    }
}

const hotelesControllers = new HotelesControllers
export default hotelesControllers