/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	tableName: 'tbl_block',
    adapter: 'mysqlAdapter',
    migrate: 'safe',

	attributes: {
		userId: {
			type: 'string',
		},
		blockedUserId: {
			type: 'string',
		}
	},
	unblock: function(userId, blockedUserId, callback) {
		var query = "DELETE FROM tbl_block WHERE userId='" + userId + "' AND blockedUserId='" + blockedUserId + "'";
		Block.query(query, callback);
	},
	blockedUsers: function (userId, callback) {
		var query = "SELECT * FROM tbl_user WHERE id in (SELECT blockedUserId FROM tbl_block WHERE userId='" + userId + "')";
		console.log(query);
		Block.query(query, callback);
	}
};