const Cancion = require(`../modelo/cancion`);

function crearCancion(req,res){

var cancion = new Cancion();

var parametros =req.body;

cancion.nombre = parametros.nombre;
cancion.artista = parametros.artista;
cancion.album = parametros.album;
cancion.genero = parametros.genero;
cancion.duracion = parametros.duracion;
cancion.portada = parametros.portada;
cancion.archivo = parametros.archivo;

cancion.save((err,cancionNuevo)=>{

    if(err){
        
        res.status(500).send({message:"no fue posible cargar la cancion"});
    
    }else{
        if(!cancionNuevo){
            
            res.status(200).send({
                message:"No fue posible caragar la cancion"});
        }else{
            //200 ok
            res.status(200).send({cancion: cancionNuevo});
        }
    }
});
}
//ACTUALIZAR USUARIO
function actualizarCancion(req,res){
    var cancionId = req.params.id;
    var nuevosDatosCancion = req.body;

    Cancion.findByIdAndUpdate(cancionId, nuevosDatosCancion,(err,cancionActualizado)=>{
        if(err){
            res.status(500).send({message:"error en el servidor"});
        }else{
            if(!cancionActualizado){
                res.status(200).send({message:"No fue posible actualizar los datos"});
            }else{
                res.status(200).send({cancion:cancionActualizado});
            }
        }
    });

}

//buscar canciones
function buscarCanciones(req,res){
    var canciones = req.params.nombre;
    var nombre = canciones;
    var canciones = req.body;
    var canciones = parametros.canciones;

    Canciones.find(nombre,(err,encontrarCanciones)=>{
        if(err){
            res.status(500).send({message:"error en el servidor"});
        }else{
            if(!encontrarCanciones){
                res.status(200).send({message:"No fue posible actualizar los datos"});
            }else{
                res.status(200).send({nombre:encontrarCanciones});
            }
        }
    });

}

module.exports ={
    crearCancion,
    actualizarCancion,
    buscarCanciones

}