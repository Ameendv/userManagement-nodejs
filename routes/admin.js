
var express = require('express');
var router = express.Router();
const adminHelpers = require('../helpers/admin-helpers')
const verifyLogin = (req, res, next) => {
  if (req.session.adminLogged) {
    next()
  } else {
    res.redirect('/admin')
  }
}



/* GET home page. */
router.get('/', function (req, res, next) {
  adminHelpers.getUserData().then((data) => {


    if (req.session.adminLogged) {
      res.render('admin/admin-panel', { data, admin: true ,added:req.session.added})
      req.session.added=false
    }
    else {
      res.render('admin/admin-login')
    }

  })
});


router.get('/adminSignup', (req, res) => {
  res.render('admin/admin-signup',)
})

router.post('/adminSignup', (req, res) => {
  adminHelpers.adminSignup(req.body).then((data) => {
    res.redirect('/admin')
  })
})

router.get('/login', (req, res) => {
  if (!req.session.adminLogged) {
    res.render('admin/admin-login', { logErr: req.session.logErr })
    req.session.logErr = false
  }
  else {
    res.redirect('/admin')
  }

})

router.post('/login', ((req, res) => {
  adminHelpers.adminLogin(req.body).then((data) => {

    if (data) {
      req.session.adminLogged = true

      res.redirect('/admin')
    }
    else {
      req.session.logErr = true
      res.redirect('/admin')
    }

  })
})
)

router.get('/delete-user', (req, res) => {
  let proId = req.query.id

  adminHelpers.deleteUser(proId).then((data) => {
    res.redirect('/admin')
  })
})

router.get('/edit-user',verifyLogin, async (req, res) => {

  let user = await adminHelpers.editUser(req.query.id)

  res.render('admin/edit-user', { user, admin: true })
})

router.post('/update-user', (req, res) => {
  adminHelpers.updateUser(req.query.id, req.body).then((data) => {
    res.redirect('/admin')
  })
})



router.get('/add-user',verifyLogin, (req, res) => {
  res.render('admin/admin-add-user', { admin: true })
})

router.post('/add-user', (req, res) => {

  adminHelpers.doAdd(req.body).then((data) => {
    req.session.added=true
    res.redirect('/admin')
  })

})
router.get('/logout', (req, res) => {
  req.session.adminLogged = false
  res.render('admin/admin-login')
})



module.exports = router;
