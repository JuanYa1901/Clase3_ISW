"use strict"

import User from '../entity/user.entity.js'
import { AppDataSource } from '../config/configDb.js'

export async function createUser(req, res) {
    
    try {
        
        const userRepository = AppDataSource.getRepository(User) //Instancia que permite interactuar con mi identidad usuario

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

export async function getUser(req,res) {

    try {
        
        const userRepository = AppDataSource.getRepository(User)
        const id = req.params.id
        const userFound = await userRepository.findOne({
            where:{
                id : id
            }
        })

        if(!userFound){
            return res.status(404).json({
                message: "Usuario no encontrado"
            })
        }

        res.status(200).json({
            message: "Usuario encontrado",
            data: userFound
        })



    } catch (error) {
        console.error('Error al obtener un usurio, el error: ', error)
    }
    
}

export async function getUsers(req, res){

    try{

        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find()
        

        if(!users){
            return res.status(404).json({
                message: "No se encontraron usuarios",
                data: null
            })
        }

        res.status(200).json({
            message: "Usuarios encontrados",
            data: users
        })
    
    } catch (error) {
        console.error('Error al obtener un usuarios, el error: ', error)
    }

}

export async function updateUser(req, res) {

    try {

        const userRepository = AppDataSource.getRepository(User)
        
        const id = req.params.id
        const user = req.body

        const userFound = await userRepository.findOne({
            where: [{
                id:id
            }]
        })

        if(!userFound){
            return res.status(404).json({
                message: "Este usuario no fue encontrado",
                data: null
            })
        }

            await userRepository.update(id,user)

            const userData = await userRepository.findOne({
                where:[{
                    id:id
                }]
            })

            res.status(200).json({
                message: "Usuario actualizado correctamente gil :D",
                data: userData
            })
    } catch (error) {
        console.error("Error al actualizar un usuario: ", error)
        res.status(500).json({message: "Error interno en el servidor"})
    }
    
}

export async function deleteUser(req, res) {

    try {
        const userRepository = AppDataSource.getRepository(User)

        const id = req.params.id

        const userFound = await userRepository.findOne({
            where: [{
                id:id
            }]
        })

        if(!userFound){

            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            })

        }

        const userDelete = await userRepository.remove(userFound)

        res.status(200).json({
            message: "Este gil se eliminó",
            data: userDelete
        })
        


    } catch (error) {

        console.error("Error al eliminar el usuario: ", error)
        res.status(500).json({message: "Error interno del servidor"})
        
    }
    
}