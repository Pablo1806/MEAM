const mongoose = require(`mongoose`);//importamos mongoose
const Schema = mongoose.Schema;// creamos un objeto schema para nuestra coleccion

// creamos una instancia del objeto schema

var CancionSchema = new Schema({
    nombre:String,
    artista:String,
    album:String,
    genero:String,
    duracion:String,
    portada:String,
    archivo:String
});


module.exports=mongoose.model('Cancione',CancionSchema);
