const express = require('express');

const cancionControl = require('../control/cancionControl');
let api = express.Router();
api.post('/cargarContenido',cancionControl.crearCancion);
api.get('/buscarCanciones',cancionControl.buscarCanciones);

api.put('/actualizarCancion/:id',cancionControl.actualizarCancion);
module.exports = api; 