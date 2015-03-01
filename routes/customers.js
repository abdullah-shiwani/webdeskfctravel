var express = require('express');
var router = express.Router();
var customerModel = require('../models/customers_model');

router.get('/', function(req, res) {
	var response = {};
	response["DOMAIN_NAME"] = "/";
	customerModel.Customer_model.getAll(onGetAllSuccess);

	function onGetAllSuccess(data){
		response['customersData']=data;
		res.render('customers',response);
	}
});




router.post('/add',function(req,res){

	var newCustomerData = {};
	
	newCustomerData.name 			= req.body.ncName;
	newCustomerData.second_name 	= req.body.ncSecondName;
	newCustomerData.email 			= req.body.ncEmail;
	newCustomerData.contact_person 	= req.body.ncContactPerson;
	newCustomerData.cell 			= req.body.ncContactNo;
	newCustomerData.is_agent 		= req.body.ncIsAgent && 1 || 0;
	
	// if agent not marked 
	if( newCustomerData.IsAgent == 0 ){
		newCustomerData.passport_no 	= req.body.ncPassportNo;
		newCustomerData.expiry 			= req.body.ncPassportExpiry;
		newCustomerData.dob 			= req.body.ncPassportDOB;
		newCustomerData.sex 			= req.body.ncPassportGender;	
	}

	newCustomerData.created_by = req.session.userId;
	newCustomerData.date = "2015-02-02";
	newCustomerData.credit_limit = 1000;

	customerModel.Customer_model.insert(newCustomerData,onCustomerAdd);

	function onCustomerAdd(data){
		if(data.affectedRows == 1)
			res.send({"success":1,"message":"Customer added successfully"});
	}
});

module.exports = router;