import usuariosModels from "../models/usuarios.models.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { decodedToken, generateToken } from "../middlewares/auth.js";

class UsuariosControllers {
    verificarBody(body){
        return new Promise(async (resolve, reject) => {
            if (!body.username || !body.password || !body.role) {
                return reject("Faltan Datos Indispensables")
            } else {
                return resolve("Todo bien")
            }
        })
    }

    agregar(newUser){
        return new Promise(async (resolve, reject) => {
            try {
                const verificar = await this.verificarBody(newUser)
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(newUser.password, salt);
                newUser.password = passwordHash
                const response = await usuariosModels.addUser(newUser)
                return resolve({
                    data: response,
                    message: "Usuario agregado exitosamente"
                })

            } catch (error) {
                console.log(error);
                return reject({
                    data: null,
                    message: error
                })
            }
        })
    }

    login(user){
        return new Promise(async (resolve, reject) => {
            try {
                const usuarioEncontrado = await usuariosModels.searchUser(user.username)
                if (usuarioEncontrado.rows.length === 0) {
                    return reject({
                        data: null,
                        message: "No encontrado"
                    })
                }
                if (bcrypt.compareSync(user.password, usuarioEncontrado.rows[0].password)) {
                    const token = generateToken(usuarioEncontrado.rows[0])
                    return resolve({
                        data: {
                            token: token,
                        },
                        message: "Iniciaste Sesion"
                    })
                } else {
                    return reject({
                        data: null,
                        message: "Credenciales Invalidas"
                    })
                }

            } catch (error) {
                console.log(error);
                return reject({
                    data: null,
                    message: error
                })
            }
        })
    }
}

const usuariosControllers = new UsuariosControllers
export default usuariosControllers