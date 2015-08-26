/**
 * MessageController
 *
 * @description :: Server-side logic for managing Messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	send: function (req, res) {
		var myId = req.body.userId;
		var toId = req.body.friendId;
		var message = req.body.message;

		Message.create({fromId:myId, toId:toId, message:message}, function (err, result) {
			if (err == null) {
				var result = {status:true, content:''};
				res.end(JSON.stringify(result));
			} else {
				var result = {status:false, content:'Internal Server Error.'};
				res.end(JSON.stringify(result));
			}
		});
	},
	remove: function (req, res) {
		var messageId = req.body.messageId;
		Message.removeMessage(messageId);
		var result = {status:true, content:''};
		res.end(JSON.stringify(result));
	},
	messages: function(req, res) {
		var userId = req.body.userId;
		Message.fetchMessages(userId, function (err, msgs) {
			if (err == null) {
				var result = {status:true, content:msgs};
				res.end(JSON.stringify(result));
			} else {
				var result = {status:false, content:'Internal Server Error.'};
				res.end(JSON.stringify(result));
			}
		});
	}
};

