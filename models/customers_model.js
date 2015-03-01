var connection = require('../connection');

	
var customer_model = {

	insert: function(customerData,callback) {
		
		connection.query('insert into customers set ?', customerData, function(err,result){
				if(err){
					console.log(err);
					return;
				}
				callback(result);
			}
		);
	},

	getAll: function(callback){
		connection.query("select * from customers where is_deleted = 0",
			function(err,rows,fields){
				if(err){
					console.log(err);
					return;
				}
				callback(rows);
			}
		)
	}
}

module.exports = {
   Customer_model: customer_model
};

