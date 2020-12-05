const express = require('express');

const empresaController = require('./controllers/empresaController');
const usuarioController=require('./controllers/usuarioController');
const ProfileController=require('./controllers/perfilController');
const SessionController=require('./controllers/loginController');

const connection = require('./database/connection');

const routes=express.Router();

routes.post('/login', SessionController.create)

routes.post('/empresas', empresaController.create);
routes.get('/empresas', empresaController.index);

routes.post('/usuarios', usuarioController.create)
routes.get('/usuarios', usuarioController.index)
routes.delete('/usuarios/:id', usuarioController.delete)

routes.get('/perfil', ProfileController.index)

module.exports = routes;