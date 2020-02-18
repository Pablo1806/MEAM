/*
el modelo es la representacion en codigo de la estructura de nuestros tablas
(colecciones de mongo) de nuestra base de datos.

*/

const mongoose = require(`mongoose`);//importamos mongoose
const Schema = mongoose.Schema;// creamos un objeto schema para nuestra coleccion

// creamos una instancia del objeto schema

var UsuarioSchema = new Schema({
    nombre:String,
    apellido:String,
    correo:String,
    contraseña:String,
    rol:String,
    imagen:String
});

// Exportar el schema
//mongoose.model recibe  dosa parametros  que son el nombre de la coleccion
//y la estrucctura o el esquema (schema) de la coleccion.
module.exports=mongoose.model('Usuario',UsuarioSchema);

