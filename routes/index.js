var app = require('../app');
var express = require('express');
var router = express.Router();

const SID_LENGTH = 9;
const TITLE = 'NACC';
const DESCRIPTION = 'NACC Student Login Website.';
const KEYWORDS = 'CSU, NACC, Tutoring, Mentoring';
const PEERS = ['Tutoring', 'Mentoring', 'Printing'];

const TUTORS = {
    'Rick Sanchez': 'Science',
    'Morty Smith': 'Politics',
    'Tammy Gueterman': 'Art'
};

const MENTORS = [
    'Eric Cartman',
    'Morty Smith',
    'Tammy Gueterman'
];

router.get('/', function(req, res, next) {
    if(!req.session.studentID) {
        req.session.lastPage = '/';
        res.render('index', {
            title: TITLE,
            description: DESCRIPTION,
            keywords: KEYWORDS,
            error: req.query.error !== undefined
        });
    } else {
        res.redirect(req.session.lastPage);
    }
});

router.post('/reason', function(req, res, next) {
    var previousPage = '/';
    if(req.session.lastPage === previousPage) {
        var studentID = req.body.sid;
        if(isValidID(studentID)) {
            req.session.studentID = studentID;
            res.render('reason', {
                title: TITLE,
                description: DESCRIPTION,
                keywords: KEYWORDS,
                sid: sid,
                error: req.query.error !== undefined
            });
        }
    } else {
        res.redirect(previousPage);
    }
});

router.post('/peers', function(req, res, next) {

    if(isValidID(sid)) {
        var reason = req.body.reason;
        if(isValidReason(reason)) {
            res.render('reason', {
                title: TITLE,
                description: DESCRIPTION,
                keywords: KEYWORDS,
                sid: sid,
                reason: reason,
                error: req.query.error !== undefined
            });
        } else {
            res.redirect('/reason?error=1');
        }
    } else {
        res.redirect('/?error=1');
    }
});

function isValidID(sid) {
    return undefined !== sid && null !== sid && sid.length === SID_LENGTH && !isNaN(sid);
}

function isValidReason(reason) {
    return PEERS.indexOf(reason) != -1;
}

// router.get('/login/tutoring', function(req, res, next) {
//     res.send('John doe has succesfully signed in!');
// });
//
// router.get('/login/mentoring', function(req, res, next) {
//     res.send('John doe has succesfully signed in!');
// });
//
// router.get('/login/printing', function(req, res, next) {
//     res.send('John doe has succesfully signed in!');
// });

router.get('/admin', function(req, res, next) {
  res.render('admin', {
      title: 'NACC',
      description: 'NACC Student Login Website.',
      keywords: 'CSU, NACC, Tutoring, Mentoring'
  });
});

// router.get('/admin/dashboard', function(req, res, next) {
//     res.send('dashboard...');
// });

module.exports = router;
