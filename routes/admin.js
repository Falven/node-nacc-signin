/**
 * Created by falven on 4/30/16.
 */

var app = require('../app');
var express = require('express');

var router = module.exports = express.Router();

app.locals.tutors = [
    {
        name: 'Rick Sanchez',
        description: 'Science, Technology'
    },
    {
        name: 'Morty Smith',
        description: 'Politics'
    },
    {
        name: 'Tammy Gueterman',
        description: 'Art'
    }
];

app.locals.mentors = [
    {
        name: 'Eric Cartman',
        description: ''
    },
    {
        name: 'Morty Smith',
        description: ''
    },
    {
        name: 'Tammy Gueterman',
        description: ''
    }
];

router.get('/', getAdmin);

function getAdmin(req, res, next) {
    res.render('pages/admin', {
        title: app.locals.title,
        description: app.locals.description,
        keywords: app.locals.keywords,
        ERROR: req.query.error !== undefined
    });
}

router.post('/dashboard', getDashboard);
router.get('/dashboard');

function getDashboard(req, res, next) {
    var peers = app.locals.tutors.concat(app.locals.mentors);
    res.render('pages/dashboard', {
        title: app.locals.title,
        description: app.locals.description,
        keywords: app.locals.keywords,
        ERROR: req.query.error !== undefined,
        peers: peers
    });
}