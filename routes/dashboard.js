const express = require('express');
const routes = express.Router();
const dashboardController = require('../controller/dasahboardController');
const { authorise } = require('../middleware/authorise')

const use = (fn) => ((req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
})

routes.get('/dashboard', authorise, use(dashboardController.dashboard));

routes.get('/logout', authorise, use(dashboardController.logout));

module.exports = routes