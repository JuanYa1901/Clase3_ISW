import express, {json} from 'express' //module. Importación de paquetes o de independencia
//(json) Puede que reciba algo en formato json
import indexRoutes from './routes/index.routes.js'
import { PORT , HOST } from './config/configEnv.js'
import { connectDB } from './config/configDb.js'


//Monta el setup del servidor
async function setupServer(){
    try{
        const app = express() //instancia express y almacenar sus metodos en app 
        //-- instanciar express y almacena todos sus metodos en app que está en const (no se puede modificar)
        //app.listen -> monta el servidor en un puerto determinado
        //app.use ->  midle war (no escuhé bien)

        app.use(json()) //

        app.use('/api', indexRoutes)//

        app.listen(PORT, () =>{
            
            console.log(`Servidor corriendo en: http://${HOST}:${PORT}/api`)
        })

    }catch(error){
        console.error("Error en index.js -> setupServer(), el error es: ", error)
    }
        
        
}

async function setupApi(){

    try {

        await connectDB()
        await setupServer()

    } catch (error) {
        console.log("Error en index.js -> setupApi(), el error es: ", error)
    }

}

setupApi()
    .then(()=>console.log("=> API iniciada exitosamente"))
    .catch((error) => {
        console.log("Error en index.js -> SetupAPI(), el error es: ", error)
    })