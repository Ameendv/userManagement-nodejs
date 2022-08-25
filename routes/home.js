const { response } = require('express');
var express = require('express');
const productHelpers=require('../helpers/product-helpers')
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.loggedIn
  let userName = req.session.userName

  if (user) {
    productHelpers.getProducts().then((products)=>{
      res.render('user/home', { user, userName ,products,user1:true});
    })
    
  }

  else {
    res.redirect('/login')
  }



});




module.exports = router;
