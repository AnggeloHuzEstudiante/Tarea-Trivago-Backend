import { pool } from "../config/connection.js";

class HotelesModel {
    allHotels(){
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM `hoteles`' ;

                const [rows, fields] = await pool.query(sql);
                return resolve({
                    rows: rows,
                    fields: fields
                })
            } catch (err) {
                console.log(err);
                return reject({
                    error: err
                })
            }
        })
    }

    oneHotel(idHotel){
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM `hoteles` WHERE id = ?' ;

                const [rows, fields] = await pool.query(sql, [idHotel]);

                return resolve({
                    rows: rows,
                    fields: fields
                })
            } catch (err) {
                console.log(err);
                return reject({
                    error: err
                })
            }
        })
    }

    addHotel(newHotel){
        return new Promise(async (resolve, reject) => {
            try {
                if (!newHotel.nombre || !newHotel.ubicacion || !newHotel.rif || !newHotel.dueño || !newHotel.estrellas) {
                    return reject({
                        error: "faltan datos del hotel"
                    })
                }
                const sql = 'INSERT INTO `hoteles` (`nombre`, `ubicacion`, `rif`, `dueño`, `estrellas`) VALUES (?, ?, ?, ?, ?)' ;

                const response = await pool.query(sql, [newHotel.nombre, newHotel.ubicacion, newHotel.rif, newHotel.dueño, newHotel.estrellas]);
                console.log(response)
                return resolve({
                    data: response
                })
            } catch (err) {
                console.log(err);
                return reject({
                    error: err
                })
            }
        })
    }

    updateHotel(newHotel, idHotel){
        return new Promise(async (resolve, reject) => {
            try {
                if (!newHotel.nombre || !newHotel.ubicacion || !newHotel.rif || !newHotel.dueño || !newHotel.estrellas) {
                    return reject({
                        error: "faltan datos del hotel"
                    })
                }
                const sql = 'UPDATE `hoteles` SET hoteles.nombre = ?, hoteles.ubicacion = ?, hoteles.rif = ?, hoteles.dueño = ?, hoteles.estrellas = ? WHERE id = ?' ;

                const response = await pool.query(sql, [newHotel.nombre, newHotel.ubicacion, newHotel.rif, newHotel.dueño, newHotel.estrellas, idHotel]);
                console.log(response)
                return resolve({
                    data: response
                })
            } catch (err) {
                console.log(err);
                return reject({
                    error: err
                })
            }
        })
    }

    deleteHotel(idHotel){
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'DELETE FROM `hoteles` WHERE hoteles.id = ?' ;

                const response = await pool.query(sql, [idHotel]);
                console.log(response)
                return resolve({
                    data: response
                })
            } catch (err) {
                console.log(err);
                return reject({
                    error: err
                })
            }
        })
    }
}

const hotelesModel = new HotelesModel
export default hotelesModel