var express = require('express');
var router = express.Router();
var userModel = require('../models/user_model');
var md5 = require('MD5');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});


router.post('/login', function(req, res) {
	var user = [];
	user.name = req.body.usernameLogin;
	user.password = md5(req.body.passwordLogin);
	var response = {};
	userModel.User_model.authUser(user,function(data){
		if(data != null && data["id"] > 0){
			if(data['is_active'] == 0){
				response['success'] = "0";
				response['message'] = " Kindly contact your H.O.D ";
			}
			else{
				req.session.isset = true;
				req.session.userId  = data.id;
				req.session.userName = data.name;

				response['success'] = "1";
				response['message'] = "Login successfully.";
			}
		}
		else{
			response['success'] = "0";
			response['message'] = "Invalid credentials";
		}
		res.send(response);
	});
});


router.get('/successlogin',function(req,res){
	if(req.session && req.session.name != null)
	{
		res.send(req.session.name)
	}
	else
		res.redirect('/');
});


module.exports = router;
