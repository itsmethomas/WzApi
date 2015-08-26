/**
* UserCircle.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	tableName: 'tbl_posts',
    adapter: 'mysqlAdapter',
    migrate: 'safe',

	attributes: {
		userId: {
			type: 'string',
		},
		isVideo: {
			type: 'string',
		},
		caption: {
			type: 'string',
		},
		mediaUrl: {
			type: 'string',
		},
		thumbnailUrl: {
			type: 'string',
		},
		likeCount: {
			type: 'string'
		},
	},

	postsByUser: function (userId, isVideo, callback) {
		var query = "SELECT * FROM " + Post.tableName + " WHERE userId='" + userId + "' AND isVideo='" + isVideo + "' ORDER BY createdAt DESC";
		Post.query(query, callback);
	}
};