/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	tableName: 'tbl_friends',
    adapter: 'mysqlAdapter',
    migrate: 'safe',

	attributes: {
		userId: {
			type: 'string',
			required: true
		},
		friendId: {
			type: 'string',
			required: true,
		}
	},
	removeFriend: function (userId, friendId) {
		var query = "DELETE FROM " + Friends.tableName + " WHERE userId='" + userId + "' AND friendId='" + friendId + "'";
		User.query(query, null);
	}
};