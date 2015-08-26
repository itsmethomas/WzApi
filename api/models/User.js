/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	tableName: 'tbl_user',
    adapter: 'mysqlAdapter',
    migrate: 'safe',

	attributes: {
		userName: {
			type: 'string',
			required: true
		},
		fullName: {
			type: 'string',
			required: true,
		},
		email: {
			type: 'email', // Email type will get validated by the ORM
			required: true
		},
		deviceToken: {
			type: 'string',
			required:true,
		},
		photoUrl: {
			type: 'string'
		},
		password: {
			type: 'string'
		}
	},

	findUser: function (email, username, callback) {
		var query = "SELECT * FROM " + User.tableName + " WHERE email='" + email + "' OR userName='" + username + "'";
		User.query(query, callback);
	},
	exploreUser: function (keyword, userId, forFriends, callback) {
		var query = "SELECT id, userName, photoUrl FROM " + User.tableName + " WHERE userName LIKE '%" + keyword + "%' AND id <> '" + userId + "'";
		if (forFriends == 'YES') {
			query += " AND id in (SELECT friendId FROM " + Friends.tableName + " WHERE userId='" + userId + "')";
		}
		query += " ORDER BY userName";

		User.query(query, callback);
	},
	fetchUserProfile: function(userId, profileUserId, callback) {
		var query = "SELECT A.userName, A.fullName, A.email, A.photoUrl, B.id as isMyFriend FROM tbl_user A LEFT JOIN (SELECT * FROM tbl_friends WHERE userId = '" + userId + "') B ON (A.id = B.friendId) WHERE A.id = '" + profileUserId + "'";
		console.log(query);
		User.query(query, callback);	
	}
};