/*
se encargara de recibir  los datos que el usuario envia desde la vista , procesandolos
para enviarlos al modelo y que este  los pueda  corroborar  con la BD para posteriormente
guardarlos. Tambien tendra toda la logica  de las consultas,actializaciones y eliminaciones.

*/

const Usuario = require(`../modelo/usuario`);//importamos el modelo de usuario
//funcion registro de  usuario
//req peticion/ request
//res respuesta / response
const fs=require('fs');
const path=require('path');

function crearUsuario(req,res){
//instanciar el objeto usuario
var usuario = new Usuario();
// guardar el cuerpo de la peticion para mejor acceso a los datos que el usuario esta enviando
//parametros =("nombre":"","apellido":"","correo":"","contraseña":"")
var parametros =req.body;
// Guardamos cada propiedad del json de la peticion en cada propiedada del modelo
usuario.nombre = parametros.nombre;
usuario.apellido = parametros.apellido;
usuario.correo = parametros.correo;
usuario.contraseña = parametros.contraseña;
usuario.rol = 'usuario';
usuario.imagen = null;
//Guardar y validar los datos
//db.collection.insert()
usuario.save((err,usuarioNuevo)=>{

    if(err){
        //el primer error a validar sera a nivel de servidor e infraestructura
        //para esto existen states o estados
        res.status(500).send({message:"Error en el servidor"});
    
    }else{
        if(!usuarioNuevo){
            //404 pagina no encontrada
            //200  ok pero con una alerta indicando que hay datos invalidos
            res.status(200).send({
                message:"No fue posible realizar el registo"});
        }else{
            //200 ok
            res.status(200).send({usuario: usuarioNuevo});
        }
    }
});

}
//LOGIN USUARIO
function login(req,res){
    var parametros=req.body;
    var correoUsuario=parametros.correo;
    var contraUsuario=parametros.contraseña;


    //buscamos al usuario a traves del correo. usaremos tolowerCase() para evitar problemas
    //de datos
    Usuario.findOne({correo: correoUsuario.toLowerCase()},(err,usuarioLogueado)=>{
       if(err){
           res.status(500).send({message:"Error en el servidor!!"});

       }else{
           if(!usuarioLogueado){
               res.status(200).send({message:"No has podido iniciar sesion. Verifica los datos"});
           }else{
               if(usuarioLogueado.contraseña != contraUsuario){
                   res.status(200).send({message:"contraseña incorrecta"});
               }else{
                   res.status(200).send({usuario:usuarioLogueado});
               }
           }
       }
    });
}

//ACTUALIZAR USUARIO
function actualizarUsuario(req,res){
    var usuarioId = req.params.id;
    var nuevosDatosUsuario = req.body;

    Usuario.findByIdAndUpdate(usuarioId, nuevosDatosUsuario,(err,usuarioActualizado)=>{
        if(err){
            res.status(500).send({message:"error en el servidor"});
        }else{
            if(!usuarioActualizado){
                res.status(200).send({message:"No fue posible actualizar los datos"});
            }else{
                res.status(200).send({usuario:usuarioActualizado});
            }
        }
    });

}

//subir Img

function subirImg(req, res){
    var usuarioId = req.params.id;
    var nombreArchivo =" No ha subido imagen";

    //validar si existe la imgen
    if(req.files){
        //analizar la ruta, el nombre y el formato(gif, jpg...)
        var rutaArchivo = req.files.imagen.path;
        console.log(rutaArchivo);
        var partirArchivo = rutaArchivo.split('\\');
        console.log(partirArchivo);
        //guardamos nombre
        var nombreArchivo = partirArchivo[2];
        console.log(nombreArchivo);
        //analiza formato
        var extensionImg = nombreArchivo.split('\.');//arreglo  pos 0 nombreImg  pos1 .jpg
        console.log(extensionImg);
        var extensionArchivo = extensionImg[1];
        console.log(extensionArchivo);


        //validar si el formato del archivo es aceptable
        if(extensionArchivo == "png" || extensionArchivo == "jpg"  || extensionArchivo == "jpeg" ){
            //actualizarUsuario campo img inicia en null
            Usuario.findByIdAndUpdate(usuarioId, {imagen: nombreArchivo}, (err, usuarioConImg)=>{
                if(err) 
                res.status(500).send({message: "Error de servidor"});
                else 
                {if(!usuarioConImg) 
                    res.status(200).send({message:"No fue posible subir la imagen"});

                else res.status(200).send({imagen: nombreArchivo,
                                            usuario: usuarioConImg});
            }

            });

        }else  //formato inválido
            res.status(200).send({message:  "Formato no aceptado, verifica: jpg, jpeg, png"});  

    }else  //No existe img
        res.status(200).send({message: "No se ha seleccionado la imagen"});
    
}


// MOSTRAR ARCHIVO
function mostrarArchivo(req,res){
//pedir el archivo que quiero mostrar
var archivo =req.params.imageFile;
//verifica,¿mos la carpeta  para encontrar el archivo
var ruta = './archivos/usuarios/'+archivo;
//validar  si la imagen existe
fs.exists(ruta, (exists)=>{
    if(exists){
        res.sendFile(path.resolve(ruta));// el modulo phat 
    }else{
        res.status(200).send({message:"imagen no encontrada"});
    }
});

}

//exportacion de las funciones creadas
module.exports ={
    crearUsuario,
    login,
    actualizarUsuario,
    subirImg,
    mostrarArchivo
}