/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	block: function (req, res) {
		var userId = req.body.userId;
		var blockedUserId = req.body.blockedUserId;

		var blockInfo = {userId:userId, blockedUserId:blockedUserId};
		Block.create(blockInfo, function (err, info) {
			if (err == null) {
				var result = {status:true, content:info};
				res.end(JSON.stringify(result));
			} else {
				var result = {status:false, content:'Already blocked.'};
				res.end(JSON.stringify(result));
			}
		});
	  },
	unblock: function (req, res) {
		var userId = req.body.userId;
		var blockedUserId = req.body.blockedUserId;

		Block.unblock(userId, blockedUserId, function (err, info) {
			if (err == null) {
				var result = {status:true, content:"Unblocked."};
				res.end(JSON.stringify(result));
			} else {
				var result = {status:false, content:'Internal Server Error.'};
				res.end(JSON.stringify(result));
			}
		});
	},
	blockedUsers: function (req, res) {
		var userId = req.body.userId;
		Block.blockedUsers(userId, function (err, users) {
			if (err == null) {
				var result = {status:true, content:users};
				res.end(JSON.stringify(result));
			} else {
				var result = {status:false, content:'Internal Server Error.'};
				res.end(JSON.stringify(result));
			}
		});
	}
};

