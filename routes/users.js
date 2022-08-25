var express = require('express');

var router = express.Router();
const userHelpers = require('../helpers/user-helpers')
const productHelpers = require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function (req, res, next) {

  res.render('user/login');
});

router.get('/signup', (req, res) => {
  res.render('user/signup')
})

router.post('/signup', (req, res) => {
  if (req.body.password === req.body.cPassword) {
    userHelpers.doSignup(req.body).then((data) => {

      res.redirect('/login')
    })
  }
  else res.send("Password mismatch")
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/home')
  }
  else if (req.session.logErr) {
    res.render('user/login', { logErr: req.session.logErr })
    req.session.logErr = false
  }
  else {
    res.render('user/login')
  }
})

router.post('/login', (req, res) => {

  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.userName = response.user.name

      res.redirect('/home')
    }
    else {
      req.session.logErr = true
      res.redirect('/login')

    }
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')

})

module.exports = router;
