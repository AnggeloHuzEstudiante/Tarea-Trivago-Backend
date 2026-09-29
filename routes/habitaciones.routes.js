import express from 'express'
import habitacionesController from '../controllers/habitaciones.controller.js';
const router = express.Router();

router.get('/todos', function(req, res, next) {
  const response = habitacionesController.mostrarTodas()

  if (response.data === null) {
    res.status(400).json({
        message: response.message
    })
  } else {
    res.status(200).json({
        data: response.data,
        message: response.message
    })
  }
});

router.get('/una/:id', function(req, res, next) {
  const response = habitacionesController.mostrarUna(req.params.id)

  if (response.data === null) {
    res.status(400).json({
        message: response.message
    })
  } else {
    res.status(200).json({
        data: response.data,
        message: response.message
    })
  }
});

router.get('/xhotel/:idHotel', function(req, res, next) {
  const response = habitacionesController.mostrarHabitacionHotel(req.params.idHotel)

  if (response.data === null) {
    res.status(400).json({
        message: response.message
    })
  } else {
    res.status(200).json({
        data: response.data,
        message: response.message
    })
  }
});

router.post('/crear/:idHotel', function(req, res, next) {
  const response = habitacionesController.agregarUnaHabitacion(req.body, req.params.idHotel)

  if (response.data === null) {
    res.status(400).json({
        message: response.message
    })
  } else {
    res.status(201).json({
        data: response.data,
        message: response.message
    })
  }
});

router.put('/actualizar/:id', function(req, res, next) {
  const response = habitacionesController.actualizarHabitacion(req.body, req.params.id)

  if (response.data === null) {
    res.status(400).json({
        message: response.message
    })
  } else {
    res.status(201).json({
        data: response.data,
        message: response.message
    })
  }
});

router.delete('/eliminar/:id', function(req, res, next) {
  const response = habitacionesController.eliminarHabitacion(req.params.id)

  if (response.data === null) {
    res.status(400).json({
        message: response.message
    })
  } else {
    res.status(200).json({
        data: response.data,
        message: response.message
    })
  }
});

export default router