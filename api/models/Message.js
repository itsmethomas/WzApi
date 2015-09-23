/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	tableName: 'tbl_messages',
    adapter: 'mysqlAdapter',
    migrate: 'safe',

	attributes: {
		fromId: {
			type: 'string',
		},
		toId: {
			type: 'string',
		},
		message: {
			type: 'string',
		},
		isRead: {
			type: 'string',
		},
	},
	removeMessage: function (messageId) {
		var query = "DELETE FROM " + Message.tableName + " WHERE id='" + messageId + "'";
		Message.query(query, null);
	},
	fetchMessages: function (userId, callback) {
		var query = "SELECT A.*, B.id as friendId, B.userName, B.photoUrl FROM tbl_messages A LEFT JOIN tbl_user B ON (A.fromId = B.id) WHERE A.toId='" + userId + "' ORDER BY createdAt DESC";
		Message.query(query, callback);
	}
};