var app = require('../app');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'NACC',
    description: 'NACC Student Login Website.',
    keywords: 'CSU, NACC, Tutoring, Mentoring'
  });
});

router.post('/login', function(req, res, next) {
    res.send('John doe has succesfully signed in!');
});

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
