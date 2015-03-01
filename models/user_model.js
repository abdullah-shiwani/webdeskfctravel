var connection = require('../connection');

var user_model = {
	authUser: function(user,callback) {
		connection.query("select id, name, is_admin, role_id, is_active from user where username = '"+user.name+"' and password ='"+user.password+"'",
			function(err,rows,fields){
				if(err){
					console.log(err);
					return;
				}
				callback(rows[0]);
			}
		)
	}
}

module.exports = {
   User_model: user_model
};

