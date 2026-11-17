import express from 'express';
import usuariosControllers from '../controllers/usuarios.controller.js';
const router = express.Router();

router.get('/prueba', function(req, res, next) {
  res.render('index', { nombre: 'Hotel' });
});

router.post('/crear', async function(req, res, next) {
  try {
    const response = await usuariosControllers.agregar(req.body)
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

router.post('/login', async function(req, res, next) {
  try {
    const response = await usuariosControllers.login(req.body)
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

export default router