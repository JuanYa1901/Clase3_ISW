"use strict"

import User from '../entity/user.entity.js'
import { AppDataSource } from '../config/configDb.js'

export async function createUser(req, res) {
    
    try {
        
        const userRepository = AppDataSource.getRepository(User)

        const user = req.body

        if(!user){

            return res.status(400).json({
                message: "Es necesario ingresar los datos del usuario",
                data: null
            })

        }

        const newUser = userRepository.create({

            nombreCompleto: user.nombreCompleto,
            rut: user.rut,
            email: user.email

        })

        const userSaved = await userRepository.save(newUser)

        res.status(201).json({
            message: "Usuario creado exitosamente",
            data: userSaved
        })

    } catch (error) {
        
        console.error("Error al crear un usuario, el error es: ", error)

    }
    
}

export async function getUser(){

}

export async function getUsers(){

}
