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
		postType: {
			type: 'string',
		},
		expireDuration: {
			type: 'string',
		}
	},

	postsByUser: function (userId, isVideo, callback) {
		var query = "SELECT * FROM " + Post.tableName + " WHERE userId='" + userId + "' AND isVideo='" + isVideo + "' ORDER BY createdAt DESC";
		Post.query(query, callback);
	},

	fetchUserGallery: function (userId, callback) {
		var query = "SELECT A.*, B.userName, B.photoUrl FROM `tbl_posts` A LEFT JOIN tbl_user B ON (A.userId=B.id) WHERE ";
		query += " A.postType = 'weekly' ";
		query += " OR ";
		query += " (A.userId in (SELECT userId FROM tbl_friends WHERE friendId='" + userId + "') AND (A.postType='annonymous' OR A.postType='public'))";
		query += " OR ";
		query += " (A.id in (SELECT postId FROM tbl_posts_friend WHERE friendId='" + userId + "'))";
		query += " ORDER BY A.createdAt DESC";

		Post.query(query, callback);
	}
};