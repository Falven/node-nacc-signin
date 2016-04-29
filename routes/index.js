var app = require('../app');
var express = require('express');
var router = express.Router();

const STUDENT_ID_LENGTH = 9;
const TITLE = 'NACC';
const DESCRIPTION = 'NACC Student Login Website.';
const KEYWORDS = 'CSU, NACC, Tutoring, Mentoring';
const REASONS = ['Tutoring', 'Mentoring', 'Printing'];
const ERROR_QUERY = '?error=1';

const TUTORS_COURSES = 2;
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
    if(req.session.url === req.session.baseUrl) {
        res.render('index', {
            title: TITLE,
            description: DESCRIPTION,
            keywords: KEYWORDS,
            error: req.query.error !== undefined
        });
    } else {
        res.redirect(req.session.url);
    }
}

function resetSession(req, res, next) {
    req.session.url = req.session.baseUrl;
    req.session.studentID = '';
    req.session.reason = '';
    req.session.peer = '';
    next();
}

router.post('/reason', setStudentID);
router.all('/reason', requireStudentID, getReason);

function isValidID(studentID) {
    return studentID && studentID.length === STUDENT_ID_LENGTH && !isNaN(studentID);
}

function setStudentID(req, res, next) {
    var studentID = req.body.pin;
    if(isValidID(studentID)) {
        req.session.studentID = studentID;
        req.session.url = req.session.baseUrl;
        next();
    } else {
        res.redirect('/' + ERROR_QUERY);
    }
}

function requireStudentID(req, res, next) {
    if(req.session.studentID) {
        next();
    } else {
        res.redirect('/');
    }
}

function getReason(req, res, next) {
    if(req.session.url === req.session.baseUrl) {
        res.render('reason', {
            title: TITLE,
            description: DESCRIPTION,
            keywords: KEYWORDS,
            studentID: req.session.studentID,
            error: req.query.error !== undefined
        });
    } else {
        res.redirect(req.session.url);
    }
}

router.post('/reason/peer', setReason);
router.all('/reason/peer', requireStudentID, requireReason, getPeer);

function isValidReason(reason) {
    return reason && REASONS.indexOf(reason) != -1;
}

function setReason(req, res, next) {
    var reason = req.body.reason;
    if(isValidReason(reason)) {
        req.session.reason = reason;
        req.session.url = req.session.baseUrl;
        next();
    } else {
        res.redirect('/reason' + ERROR_QUERY);
    }
}

function requireReason(req, res, next) {
    if(req.session.reason) {
        next();
    } else {
        res.redirect('/reason');
    }
}

function getPeer(req, res, next) {
    if(req.session.url === req.session.baseUrl) {
        var reason = req.session.reason;
        var peerType = reason.toLowerCase().substr(0, reason.length - 3);
        var peers = peerType === 'tutor' ? TUTORS : MENTORS;
        res.render('peer', {
            title: TITLE,
            description: DESCRIPTION,
            keywords: KEYWORDS,
            studentID: req.session.studentID,
            peerType: peerType,
            peers: peers,
            error: req.query.error !== undefined
        });
    } else {
        res.redirect(req.session.url);
    }
}

router.post('/reason/peer/confirm', setPeer);
router.all('/reason/peer/confirm', requireStudentID, requireReason, requirePeer, getConfirm);

function isValidPeer(peer) {
    return peer && true;
}

function setPeer(req, res, next) {
    var peer = req.body.peer;
    if(isValidPeer(peer)) {
        req.session.peer = peer;
        req.session.url = req.session.baseUrl;
        next();
    } else {
        res.redirect('/reason/peer' + ERROR_QUERY);
    }
}

function requirePeer(req, res, next) {
    if(req.session.peer) {
        next();
    } else {
        res.redirect('/reason/peer');
    }
}

function getConfirm(req, res, next) {
    if(req.session.url === req.session.baseUrl) {
        var reason = req.session.reason;
        res.render('confirm', {
            title: TITLE,
            description: DESCRIPTION,
            keywords: KEYWORDS,
            studentID: req.session.studentID,
            reason: reason,
            error: req.query.error !== undefined
        });
    } else {
        res.redirect(req.session.url);
    }
}

module.exports = router;
