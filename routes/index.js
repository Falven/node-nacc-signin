var app = require('../app');
var express = require('express');

var router = module.exports = express.Router();

const STUDENT_ID_LENGTH = 9;
const REASONS = ['Tutoring', 'Mentoring', 'Printing'];
const ERROR_QUERY = '?error=1';

const TUTORS = [
    {
        name: 'Rick Sanchez',
        courses: 'Science, Technology'
    },
    {
        name: 'Morty Smith',
        courses: 'Politics'
    },
    {
        name: 'Tammy Gueterman',
        courses: 'Art'
    }
];

const MENTORS = [
    {
        name: 'Eric Cartman'
    },
    {
        name: 'Morty Smith'
    },
    {
        name: 'Tammy Gueterman'
    }
];

router.get('/', getStudentID);
router.post('/', resetSession, getStudentID);

function getStudentID(req, res, next) {
    res.render('pages/index', {
        title: app.locals.title,
        description: app.locals.description,
        keywords: app.locals.keywords,
        ERROR: req.query.error !== undefined
    });
}

function resetSession(req, res, next) {
    req.session = null;
    next();
}

router.post('/reason', setStudentID, requireStudentID, getReason);
router.get('/reason', requireStudentID, getReason);

function isValidID(studentID) {
    return studentID && studentID.length === STUDENT_ID_LENGTH && !isNaN(studentID);
}

function setStudentID(req, res, next) {
    var studentID = req.body.pin;
    if(isValidID(studentID)) {
        req.session.studentID = studentID;
        next();
    } else {
        res.redirect('/' + ERROR_QUERY);
    }
}

function requireStudentID(req, res, next) {
    if(req.session.studentID) {
        next();
    } else {
        res.redirect('/' + ERROR_QUERY);
    }
}

function getReason(req, res, next) {
    res.render('pages/reason', {
        title: app.locals.title,
        description: app.locals.description,
        keywords: app.locals.keywords,
        ERROR: req.query.error !== undefined,
        studentID: req.session.studentID
    });
}

router.post('/reason/peer', requireStudentID, setReason, requireReason, getPeer);
router.get('/reason/peer', requireStudentID, requireReason, getPeer);

function isValidReason(reason) {
    return reason && REASONS.indexOf(reason) != -1;
}

function setReason(req, res, next) {
    var reason = req.body.reason;
    if(isValidReason(reason)) {
        req.session.reason = reason;
        next();
    } else {
        res.redirect('/reason' + ERROR_QUERY);
    }
}

function requireReason(req, res, next) {
    if(req.session.reason) {
        next();
    } else {
        res.redirect('/reason' + ERROR_QUERY);
    }
}

function getPeer(req, res, next) {
    var reason = req.session.reason;
    var peerType = reason.toLowerCase().substr(0, reason.length - 3);
    var peers = peerType === 'tutor' ? TUTORS : MENTORS;
    res.render('pages/peer', {
        title: app.locals.title,
        description: app.locals.description,
        keywords: app.locals.keywords,
        ERROR: req.query.error !== undefined,
        studentID: req.session.studentID,
        peerType: peerType,
        peers: peers
    });
}

router.post('/reason/peer/confirm', trySetPrintingReason, setPeer, requireStudentID, requireReason, requirePeer, getConfirm, logSession);
router.get('/reason/peer/confirm', requireStudentID, requireReason, requirePeer, getConfirm, logSession);

function isValidPeer(peer) {
    return peer && true;
}

function trySetPrintingReason(req, res, next) {
    var reason = req.body.reason;
    if(reason === 'Printing') {
        req.session.reason = reason;
    }
    next();
}

function setPeer(req, res, next) {
    if(req.session.reason === 'Printing') {
        next();
    } else {
        var peer = req.body.peer;
        if(isValidPeer(peer)) {
            req.session.peer = peer;
            next();
        } else {
            res.redirect('/reason/peer' + ERROR_QUERY);
        }
    }
}

function requirePeer(req, res, next) {
    if(req.session.peer || req.session.reason === 'Printing') {
        next();
    } else {
        res.redirect('/reason/peer' + ERROR_QUERY);
    }
}

function getConfirm(req, res, next) {
    res.render('pages/confirm', {
        title: app.locals.title,
        description: app.locals.description,
        keywords: app.locals.keywords,
        ERROR: req.query.error !== undefined,
        studentID: req.session.studentID,
        reason: req.session.reason,
        peer: req.session.peer
    });
}

function logSession(req, res, next) {
    next();
}
