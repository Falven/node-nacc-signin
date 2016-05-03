/**
 * Created by falven on 4/30/16.
 */

var app = require('../app');
var express = require('express');

var router = module.exports = express.Router();

router.get('/', getAdmin);

function getAdmin(req, res, next) {
    res.render('pages/admin', {
        title: app.locals.title,
        description: app.locals.description,
        keywords: app.locals.keywords,
        error: req.query.error !== undefined
    });
}

router.post('/dashboard', getDashboard);
router.get('/dashboard');

function getDashboard(req, res, next) {
    res.render('pages/dashboard', {
        title: app.locals.title,
        description: app.locals.description,
        keywords: app.locals.keywords,
        error: req.query.error !== undefined
    });
}