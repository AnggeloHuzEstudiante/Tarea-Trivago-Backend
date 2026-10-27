import { habitaciones, hoteles } from "../db/db.js"
import { v4 as uuidv4 } from 'uuid';
import hotelesModel from "../models/hoteles.models.js";

class HotelesControllers {
    mostrarTodos(){
        return new Promise(async (resolve, reject) => {
            try {
            const response = await hotelesModel.allHotels()
            return resolve({
                data: response.rows,
                message: "hoteles listados de la base de datos"
            })
        } catch (error) {
            return reject({
                data: null,
                message: "Existe un error"
            })
        }
        })
    }

    motrarUno(idHotel){
        return new Promise(async (resolve, reject) => {
            try {
                const hotelSeleccionado = await hotelesModel.oneHotel(idHotel)

                if (hotelSeleccionado.rows.length === 0) {
                    return reject({
                        data: null,
                        message: "No se encontro el hotel"
                    })
                }

                return resolve({
                    data: hotelSeleccionado.rows,
                    message: "Hotel encontro con exito"
                })
            } catch (error) {
                return reject({
                data: null,
                message: "Existe un error"
            })
            }
        })
    }

    agregarHotel(newHotel){
        return new Promise(async (resolve, reject) => {
            try {
                if (!newHotel.nombre || !newHotel.ubicacion || !newHotel.rif || !newHotel.estrellas || !newHotel.dueño) {
                    return reject({
                        data: null,
                        message: "Faltan datos indispensables"
                    })
                }

                const nuevoHotel = {
                    nombre: newHotel.nombre,
                    ubicacion: newHotel.ubicacion,
                    rif: newHotel.rif,
                    dueño: newHotel.dueño,
                    estrellas: newHotel.estrellas,
                }

                const responseDB = await hotelesModel.addHotel(nuevoHotel)
                const hotelSeleccionado = await this.motrarUno(responseDB.data[0].insertId)

                return resolve({
                    data: {
                        hotelNuevo: hotelSeleccionado.data
                    },
                    message: "Se agrego el hotel"
                })
            } catch (error) {
                return reject({
                    data: null,
                    message: "Existe un error"
                })
            }
        })
    }

    actualizarHotel(updateHotel, idHotel){
        return new Promise( async (resolve, reject) => {
            try {
                const oldHotel = await this.motrarUno(idHotel)

                console.log(oldHotel)
                oldHotel.data[0].nombre = !updateHotel.nombre ? oldHotel.data[0].nombre : updateHotel.nombre
                oldHotel.data[0].rif = !updateHotel.rif ? oldHotel.data[0].rif : updateHotel.rif
                oldHotel.data[0].ubicacion = !updateHotel.ubicacion ? oldHotel.data[0].ubicacion : updateHotel.ubicacion
                oldHotel.data[0].estrellas = !updateHotel.estrellas ? oldHotel.data[0].estrellas : updateHotel.estrellas
                oldHotel.data[0].dueño = !updateHotel.dueño ? oldHotel.data[0].dueño : updateHotel.dueño

                const newHotel = await hotelesModel.updateHotel(oldHotel.data[0], idHotel)
                return resolve({
                    data: {
                        hotelActualizado: oldHotel.data[0],
                        message: "Hotel actualizado correctamente"
                    }
                })
            } catch (error) {
                return reject({
                    data: null,
                    message: error.message
                })
            }
        })
    }

    eliminarHotel(idHotel){
        return new Promise(async (resolve, reject) => {
            try {
                const hotelSeleccionado = await this.motrarUno(idHotel)

                const hotelDelete = await hotelesModel.deleteHotel(idHotel)
                return resolve({
                    data: {
                        hotelEliminado: hotelSeleccionado.data[0]
                    },
                    message: "Hotel elimnado Exitosamente"
                })
            } catch (error) {
                return reject({
                    data: null,
                    message: error.message
                })
            }
        })
    }
}

const hotelesControllers = new HotelesControllers
export default hotelesControllers