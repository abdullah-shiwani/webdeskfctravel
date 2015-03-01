var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	if(req.session && req.session.isset == true)
	{
		res.redirect('/dashboard');
	}
	res.redirect('/login');
});


router.get('/logout',function(req,res){
	req.session.destroy();
	res.redirect("/")
})

router.get('/login',function(req,res){
	if(req.session && req.session.isset == true)
	{
		res.redirect('/dashboard');
	}
	res.render('login');
});

router.get('/dashboard',function(req,res){
	if(req.session && req.session.isset == true)
	{
		res.render('dashboard',{DOMAIN_NAME:'/'});
	}
	res.redirect('/login');
});


module.exports = router;


