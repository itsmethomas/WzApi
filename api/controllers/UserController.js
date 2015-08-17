/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	login: function (req, res) {
		//console.log(User.create(req.body).done);
		var username = req.body.userName;
		var password = req.body.password;

		User.find({$or:{email:username, userName:username}}, function (err, users) {
			if (err != null) {
				var response = {status:false, content:"Internal Error."};
				res.end(JSON.stringify(response));
			} else {
				if (users.length == 0) {
					var response = {status:false, content:"User does not exist."};
					res.end(JSON.stringify(response));
				} else {
					var userInfo = users[0];
					var crypto = require('crypto');
					var md5Password = crypto.createHash('md5').update(password).digest('hex');
					if (userInfo.password != md5Password) {
						var response = {status:false, content:"Password is incorect."};
						res.end(JSON.stringify(response));
					} else {
						var response = {status:true, content:userInfo};
						res.end(JSON.stringify(response));
					}
				}
			}
		});
		
	  },
	registerWithEmail: function (req, res) {
		var signupInfo = req.body;

		console.log(req.body);

		   User.find({$or:[{email:signupInfo.email}, {userName:signupInfo.userName}]}, function (err, users) {
		   	console.log(users);
			if (err == null && users.length > 0) {
				var result = {status:false, content:'User already exist.'};
				res.end(JSON.stringify(result));
			} else {
				if (err != null) {
					var result = {status:false, content:'Internal Server Error.'};
					res.end(JSON.stringify(result));
				} else {
					// Hash Password
					if (signupInfo.password) {
						var crypto = require('crypto');
						signupInfo.password = crypto.createHash('md5').update(signupInfo.password).digest('hex');
					}

					User.create(signupInfo, function(err, user) {
						if (err == null) {
							var result = {satus:true, content:user};
							res.end(JSON.stringify(result));
						} else {
							var result = {status:false, content:'Internal Server Error.'};
							res.end(JSON.stringify(result));
						}
					});
				}
			}
		});
	} 
};

