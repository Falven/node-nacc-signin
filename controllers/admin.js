/**
 * Created by falven on 4/30/16.
 */

var app = require('../app');
var express = require('express');
var fs = require('fs');
var json2csv = require('json2csv');

var router = module.exports = express.Router();

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
        mentors: app.locals.mentors,
        students: app.locals.students
    });
}

router.get('/dashboard/tutors', requirePin, getTutors);
function getTutors(req, res, next) {
    res.download(app.locals.tutorsPath);
}

router.post('/dashboard/tutors', requirePin, setTutors);
function setTutors(req, res, next) {
    app.locals.tutors = req.body;
    app.locals.tutorsColumns = Object.keys(app.locals.tutors);
    json2csv({ data: app.locals.tutors, fields: app.locals.tutorsColumns }, function(err, csv) {
        if (err) {
            console.log(err);
        }
        fs.writeFile(app.locals.tutorsPath, csv, function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
    res.status(200).end();
}

router.get('/dashboard/mentors', requirePin, getMentors);
function getMentors(req, res, next) {
    res.download(app.locals.mentorsPath);
}

router.post('/dashboard/mentors', requirePin, setMentors);
function setMentors(req, res, next) {
    app.locals.mentors = req.body;
    app.locals.mentorsColumns = Object.keys(app.locals.mentors);
    json2csv({ data: app.locals.mentors, fields: app.locals.mentorsColumns }, function(err, csv) {
        if (err) {
            console.log(err);
        }
        fs.writeFile(app.locals.mentorsPath, csv, function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
    res.status(200).end();
}

router.get('/dashboard/students', requirePin, getStudents);
function getStudents(req, res, next) {
    res.download(app.locals.studentsPath);
}

router.post('/dashboard/students', requirePin, setStudents);
function setStudents(req, res, next) {
    app.locals.students = req.body;
    app.locals.studentsColumns = Object.keys(app.locals.students);
    json2csv({ data: app.locals.students, fields: app.locals.studentsColumns }, function(err, csv) {
        if (err) {
            console.log(err);
        }
        fs.writeFile(app.locals.studentsPath, csv, function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
    res.status(200).end();
}