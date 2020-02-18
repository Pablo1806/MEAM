/*
vamos a crear el manejo de rutas de express para nuestra API
se encargara de manejas las rutas  del lado backend
*/

const express = require('express');
const UsuarioControl = require('../control/usuarioControl');// Importamos el controlador de las funciones
const multipart =require('connect-multiparty');//paquete para subir archivos
const subirImgDirectorio = multipart({uploadDir: './archivos/usuarios'});  //ruta de archivos

var api = express.Router();//cargamos el manejador de rutas de express


// estos son denominados metodos HTTP y hacen parte  de las caracteristicas de una API
//post  para agregar datos
//get para obtener datos
//put actualizar datos
// delete  eliminar datos


//Declaracion de las rutas que daran paso a la ejecucion  de las funciones
api.post('/registro',UsuarioControl.crearUsuario);
// Ruta login usuario
//en el caso de un login  o un inicio de sesion utilizamos el metodo post en vez de get.
// el metodo POST siempre es para subir informacion
api.post('/loginUsuario',UsuarioControl.login);

// ruta actualizar usuarios
api.put('/actualizarUsuario/:id',UsuarioControl.actualizarUsuario);

//ruta  subir imagen 
api.put('/subir-imagen-usuario/:id', subirImgDirectorio, UsuarioControl.subirImg);
//ruta mostrar archivo
api.get('/obtener-imagen-usuario/:imageFile',subirImgDirectorio, UsuarioControl.mostrarArchivo);
//Exportacion del archivo usuarioRutas

module.exports = api; 
