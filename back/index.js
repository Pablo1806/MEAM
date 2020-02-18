/* 
va a contener la conexion de NOde con nuestra BD Mongo a traves de mongoose.
 */

 const mongoose = require('mongoose');// importamos moongose para la conexion
 const app = require('./app');// vamos a importar la logica de express  hace el llamado del archivo app y se encarga de la conexion
 const port = 4000;//declaramos el puerto que deseamos
 
 
 // vamos a crear la logica de la conexion con la base de datos
//el  metodo connect  resibe parametros , el primero  la ruta de la BD a enlazar
// el segundo sera una funcion que a su vez recibira los parametros  de errror y respuesta

 mongoose.connect('mongodb://localhost:27017/bictiafy',(err,res)=>{
     if(err){
         Console.log(`El error es:${err}`);
     }else{
         console.log(`Conexion Exitosa!!`);
         app.listen(port,()=>{
             console.log(`Puerto: ${port}`);
         
         });
     }
     
 });