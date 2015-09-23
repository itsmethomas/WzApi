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


		User.findUser(username, username, function (err, users) {
			if (err != null) {
				console.log(err);
				var response = {status:false, content:"Internal Error."};
				res.end(JSON.stringify(response));
			} else {
				if (users.length == 0) {
					var response = {status:false, content:"User name or password is incorect."};
					res.end(JSON.stringify(response));
				} else {
					var userInfo = users[0];
					var crypto = require('crypto');
					var md5Password = crypto.createHash('md5').update(password).digest('hex');
					if (userInfo.password != md5Password) {
						var response = {status:false, content:"User name or password is incorect."};
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

		User.findUser(signupInfo.email, signupInfo.userName, function (err, users) {
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
							var result = {status:true, content:user};
							res.end(JSON.stringify(result));
						} else {
							var result = {status:false, content:'Internal Server Error.'};
							res.end(JSON.stringify(result));
						}
					});
				}
			}
		});
	},
	explore: function (req, res) {
		var keyword = req.body.keyword;
		var userId = req.body.userId;
		var forFriends = req.body.forFriends;

		User.exploreUser(keyword, userId, forFriends, function (err, users) {
			if (err == null) {
				var result = {status:true, content:users};
				res.end(JSON.stringify(result));
			} else {
				var result = {status:false, content:'Internal Server Error.'};
				res.end(JSON.stringify(result));
			}
		});
	},
	fetchUserProfile: function (req, res) {
		var userId = req.body.userId;
		var profileUserId = req.body.profileUserId;

		User.fetchUserProfile(userId, profileUserId, function (err, userInfo) {
			if (err == null) {
				var result = {status:true, content:userInfo[0]};
				res.end(JSON.stringify(result));
			} else {
				var result = {status:false, content:'Internal Server Error.'};
				res.end(JSON.stringify(result));
			}
		});
	},
	addToFriends: function (req, res) {
		var userId = req.body.userId;
		var friendId = req.body.friendId;

		Friends.create({
			userId:userId,
			friendId:friendId
		}, function (err, result) {
			var result = {status:true, content:result};
			res.end(JSON.stringify(result));
		})
	},
	removeFriend: function (req, res) {
		var userId = req.body.userId;
		var friendId = req.body.friendId;

		Friends.removeFriend(userId, friendId);
		var result = {status:true, content:''};
		res.end(JSON.stringify(result));
	},
	saveProfile: function (req, res) {
		var userId = req.param("userId");
		var password = req.param("password");

		var profilePhoto = req.files.photo;

		if (password != '') {
			var crypto = require('crypto');
			password = crypto.createHash('md5').update(password).digest('hex');

			User.updatePassword(userId, password);
		}

		if (profilePhoto) {
			// generate a file name
			var d = new Date();
			var timestamp = d.getTime();
			var fileName = 'profile_photos/' + userId + "_" + UtilityService.randomizeString(10) + '.jpg';

			// move to real upload folder...
			var fs = require('fs');
			var tmp_path = profilePhoto.path;
			var target_path = './assets/' + fileName;

			fs.createReadStream(tmp_path).pipe(fs.createWriteStream(target_path).on("close", function() {
				fs.unlink(tmp_path, function(err) {
					if (err) throw err;
				});

				var protocol = req.connection.encrypted?'https':'http';
				var baseUrl = protocol + '://' + req.headers.host + '/';
				var photoUrl = baseUrl + fileName;

				User.updatePhotoUrl(userId, photoUrl, function (err, userInfo) {
					if (err == null) {
						var result = {status:true, content:userInfo[0]};
						res.end(JSON.stringify(result));
					} else {
						var result = {status:false, content:'Internal Server Error.'};
						res.end(JSON.stringify(result));
					}
				});
			}));
		} else {
			var result = {status:true, content:""};
			res.end(JSON.stringify(result));
		}
	}
};

