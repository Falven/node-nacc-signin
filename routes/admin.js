/**
 * Created by falven on 4/30/16.
 */

var app = require('../app');
var express = require('express');
var fs = require('fs');

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
    if(isValidPin(req.session.pin)) {
        next();
    } else {
        res.redirect('/admin' + app.locals.errorQuery);
    }
}

function getDashboard(req, res, next) {
    res.render('pages/dashboard', {
        title: app.locals.title,
        ERROR: req.query.error !== undefined,
        tutors: app.locals.tutors,
        mentors: app.locals.mentors
    });
}

router.post('/dashboard/tutors', requirePin, setTutors);
router.post('/dashboard/mentors', requirePin, setMentors);

function setTutors(req, res, next) {
    app.locals.tutors = req.body;
    res.status(200).end();
}

function setMentors(req, res, next) {
    app.locals.mentors = req.body;
    res.status(200).end();
}

router.get('/dashboard/students', requirePin, getStudents);

function getStudents(req, res, next) {
    app.openStudents(function(workbook) {
        res.download(app.locals.studentFile);
    });
}