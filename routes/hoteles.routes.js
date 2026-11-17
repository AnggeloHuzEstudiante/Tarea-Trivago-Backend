import express from 'express';
import hotelesControllers from '../controllers/hoteles.controller.js';
import { verifyToken } from '../middlewares/auth.js';
const router = express.Router();

/* GET home page. */
router.get('/todos/views', async function(req, res, next) {
  try {
    const response = await hotelesControllers.mostrarTodos()
    res.render("hoteles", {
        data: response.data
    })
  } catch (error) {
    res.status(400).json({
        message: error.menssage
    })
  }
});

router.get('/todos',function(req, res, next){
  const verificacion = verifyToken(req.headers['authorization'], ["root", "admin", "user"])
  if (verificacion.status) {
    next();
  } else {
    res.status(400).json({
      message: verificacion.message
    })
  }
}, async function(req, res, next) {
  try {
    const response = await hotelesControllers.mostrarTodos()
    res.status(200).json({
        data: response.data,
        message: response.menssage
    })
  } catch (error) {
    res.status(400).json({
        message: error.menssage
    })
  }
});

router.get('/uno/:id', function(req, res, next){
  const verificacion = verifyToken(req.headers['authorization'], ["root", "admin", "user"])
  if (verificacion.status) {
    next();
  } else {
    res.status(400).json({
      message: verificacion.message
    })
  }
} , async function(req, res, next) {
  try {
    const response = await hotelesControllers.motrarUno(req.params.id)

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
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
});

router.post('/crear', function(req, res, next){
  const verificacion = verifyToken(req.headers['authorization'], ["root", "admin"])
  if (verificacion.status) {
    next();
  } else {
    res.status(400).json({
      message: verificacion.message
    })
  }
}, async function(req, res, next) {
  try {
    const response = await hotelesControllers.agregarHotel(req.body)
    res.status(201).json({
      data: response.data,
      message: response.message
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
});

router.put('/actualizar/:id', function(req, res, next){
  const verificacion = verifyToken(req.headers['authorization'], ["root", "admin"])
  if (verificacion.status) {
    next();
  } else {
    res.status(400).json({
      message: verificacion.message
    })
  }
},  async function(req, res, next) {
  try {
    const response = await hotelesControllers.actualizarHotel(req.body, req.params.id)
    res.status(201).json({
      data: response.data,
      message: response.message
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
});

router.delete('/eliminar/:id', function(req, res, next){
  const verificacion = verifyToken(req.headers['authorization'], ["root"])
  if (verificacion.status) {
    next();
  } else {
    res.status(400).json({
      message: verificacion.message
    })
  }
}, async function(req, res, next) {
  try {
    const response = await hotelesControllers.eliminarHotel(req.params.id)
    res.status(200).json({
      data: response.data,
      message: response.message
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
});

export default router