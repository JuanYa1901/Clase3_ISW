"use strict"//modo estricto de javaScrip para que detecte errores que uno no se da cuent
import { DataSource } from "typeorm"
import { DATABASE, DB_USERNAME, HOST, PASSWORD } from "./configEnv.js"


export const AppDataSource = new DataSource({

    type: "postgres", //En este caso es tipo de base de datos
    host: `${HOST}`, //Dirrección que utiliza la base de datos
    port: 5432, // el puerto dah
    username: `${DB_USERNAME}`,// Nomvre de usuario para autenticar la conexión de la base de datos
    password: `${PASSWORD}`, //contraseña del usuario a autenticar
    database: `${DATABASE}`,
    entities: ["src/entity/**/*.js"], //define la ruta de archivos que contiene las entidades
    synchronize: true, //Opción para que typeORM se encargue de gestionar nuestra base de datos y crear tablas
    logging: false //Muestra las consultas que se realizan por debajo de la aplicación
})

export async function connectDB(){
    try {
        await AppDataSource.initialize()
        console.log("=> Conexión a la base de datos Exitosa :D")
    } catch (error) {
        console.log("Error al conectarse a la base de datos ¬.¬  : ",error)
        
    }
}