var app = require('../app');
var express = require('express');

var router = module.exports = express.Router();

const STUDENT_ID_LENGTH = 9;

app.locals.errorQuery = '?error=1';
app.locals.reasons = ['Tutoring', 'Mentoring', 'Printing'];

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
        req.session.studentID = parseInt(studentID);
    }
    next();
}

function requireStudentID(req, res, next) {
    if(req.session.studentID) {
        next();
    } else {
        res.redirect('/' + app.locals.errorQuery);
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

router.post('/reason/peers', requireStudentID, setReason, requireReason, getPeer);
router.get('/reason/peers', requireStudentID, requireReason, getPeer);

function isValidReason(reason) {
    return reason && app.locals.reasons.indexOf(reason) != -1;
}

function setReason(req, res, next) {
    var reason = req.body.reason;
    if(isValidReason(reason)) {
        req.session.reason = reason;
    }
    next();
}

function requireReason(req, res, next) {
    if(req.session.reason) {
        next();
    } else {
        res.redirect('/reason' + app.locals.errorQuery);
    }
}

function getPeer(req, res, next) {
    var reason = req.session.reason;
    var peerType = reason.toLowerCase().substr(0, reason.length - 3);
    var peers = peerType === 'tutor' ? app.locals.tutors : app.locals.mentors;
    res.render('pages/peers', {
        title: app.locals.title,
        description: app.locals.description,
        keywords: app.locals.keywords,
        ERROR: req.query.error !== undefined,
        studentID: req.session.studentID,
        peerType: peerType,
        peers: peers
    });
}

router.post('/reason/peers/confirm', setPrintingReason, setPeer, requireStudentID, requireReason, requirePeer, getConfirm, logSession);
router.get('/reason/peers/confirm', requireStudentID, requireReason, requirePeer, getConfirm, logSession);

function isValidPeer(peer) {
    return peer && true;
}

function setPrintingReason(req, res, next) {
    var reason = req.body.reason;
    if(reason === 'Printing') {
        req.session.reason = reason;
    }
    next();
}

function setPeer(req, res, next) {
    var peer = req.body.peer;
    if(isValidPeer(peer)) {
        req.session.peer = peer;
    }
    next();
}

function requirePeer(req, res, next) {
    if(req.session.peer || req.session.reason === 'Printing') {
        next();
    } else {
        res.redirect('/reason/peers' + app.locals.errorQuery);
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
    next();
}

function logSession(req, res, next) {
    app.openStudents(function() {
        app.locals.worksheet.addRow(
          {
              date: new Date(),
              studentID: req.session.studentID,
              reason: req.session.reason,
              peer: req.session.peer
          }).commit();
        app.locals.workbook.xlsx.writeFile(app.locals.workbookPath)
          .then(function() {
              console.log('success.');
          }, function() {
              console.log('failed.');
          });
    });
}
