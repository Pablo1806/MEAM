/* este archivo  tendra la ruta de toda la logica de ruteo de express
Declaracion de rutas de uso del middleware body-parser.
permisos de accdeso a cualquier cliente(Permisos al aplicativo Front hecho en Angular)
 */

 const express= require('express');//importamos express
 const bodyparser = require('body-parser');// permitir analizar datos en la URL

 const app = express();// Aplicacion express

 //solicitar las rutas  de acceso  a cada funcion  que ejecutara nuestra aplicacion

 const usuarioRutas=require(`./rutas/usuarioRutas`);
 const cancionRutas=require(`./rutas/cancionRutas`);

 // -- MIDDLEWARES---
 //Declaramos el analisis de datos con body-parser
 app.use(bodyparser.json());
 //configuravcion de permisos de acceso
 
 // Consumo de las rutas

 app.use(`/api`,usuarioRutas);
 app.use(`/api`,cancionRutas);
 //----FIN MIDDLEWARES----
//exportamos el archivo app.js para su uso en la aplicacion o 
module.exports=app;