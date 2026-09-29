import express from 'express';
import hotelesControllers from '../controllers/hoteles.controller.js';
const router = express.Router();

/* GET home page. */
router.get('/todos', function(req, res, next) {
  const response = hotelesControllers.mostrarTodos()

  if (response.data === null) {
    res.status(400).json({
        message: response.menssage
    })
  } else {
    res.status(200).json({
        data: response.data,
        message: response.menssage
    })
  }
});

router.get('/uno/:id', function(req, res, next) {
  const response = hotelesControllers.motrarUno(req.params.id)

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

router.post('/crear', function(req, res, next) {
  const response = hotelesControllers.agregarHotel(req.body)

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
  const response = hotelesControllers.actualizarHotel(req.body, req.params.id)

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
  const response = hotelesControllers.eliminarHotel(req.params.id)

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