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
        description: 'From south park, CO.'
    },
    {
        name: 'Morty Smith',
        description: 'Sadistic genious.'
    },
    {
        name: 'Tammy Gueterman',
        description: 'Sassy groupie.'
    }
];

var PIN = '1111';

router.get('/', getAdmin);

function getAdmin(req, res, next) {
    res.render('pages/admin', {
        title: app.locals.title,
        description: app.locals.description,
        keywords: app.locals.keywords,
        ERROR: req.query.error !== undefined
    });
}

router.post('/dashboard', setPin, requirePin, getDashboard);
router.get('/dashboard', requirePin, getDashboard);

function isValidPin(pin) {
    return pin === PIN;
}

function setPin(req, res, next) {
    var pin = req.body.pin;
    if(isValidPin(pin)) {
        req.session.pin = pin;
    }
    next();
}

function requirePin(req, res, next) {
    if(req.session.pin) {
        next();
    } else {
        res.redirect('/admin' + app.locals.errorQuery);
    }
}

function getDashboard(req, res, next) {
    res.render('pages/dashboard', {
        title: app.locals.title,
        description: app.locals.description,
        keywords: app.locals.keywords,
        ERROR: req.query.error !== undefined,
        tutors: app.locals.tutors,
        mentors: app.locals.mentors
    });
}

router.post('/dashboard/peers', requirePin, setPeers);
router.post('/dashboard/tutors', requirePin, setTutors);

function setPeers() {
    app.locals.peers = req.body.peers;
}

function setTutors() {
    app.locals.tutors = req.body.tutors;
}