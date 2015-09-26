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
		var query = "SELECT A.*, B.userName, B.photoUrl, COUNT(C.userId) As likedCount,";
		query += " SUM(IF(C.userId = '" + userId + "', 1, 0)) AS iLiked";
		query += " FROM `tbl_posts` A LEFT JOIN tbl_user B ON (A.userId=B.id) ";
		query += " LEFT JOIN tbl_posts_like C ON (A.id = C.postId)";
		query += " WHERE ";
		query += " A.postType = 'weekly' ";
		query += " OR ";
		query += " (A.userId in (SELECT userId FROM tbl_friends WHERE friendId='" + userId + "') AND (A.postType='annonymous' OR A.postType='public'))";
		query += " OR ";
		query += " (A.id in (SELECT postId FROM tbl_posts_friend WHERE friendId='" + userId + "'))";
		query += " ORDER BY A.createdAt DESC";

		console.log(query);

		Post.query(query, callback);
	},
	removePost: function (postId, callback) {
		var query = "SELECT * FROM tbl_posts WHERE id='" + postId + "'";
		Post.query(query, function (err, posts) {
			if (posts.length > 0) {
				var postInfo = posts[0];
				var mediaPaths = postInfo.mediaUrl.split('photos/');
				var mediaPath = "./assets/photos/" + mediaPaths[1];

				var thumbnailPaths = postInfo.mediaUrl.split('thumbnails/');
				var thumbnailPath = "./assets/thumbnails/" + thumbnailPaths[1];

				// Remove File
				var fs = require('fs');
				fs.unlink(mediaPath, function(err) {});
				fs.unlink(thumbnailPath, function(err) {});

				query = "DELETE FROM tbl_posts WHERE id='" + postId + "'";
				Post.query(query, null);
				query = "DELETE FROM tbl_posts_like WHERE postId ='" + postId + "'";
				Post.query(query, null);
			}
			callback();
		});
	},
	likePost: function (userId, postId, callback) {
		var query = "INSERT INTO tbl_posts_like (userId, postId, createdAt, updatedAt) VALUES ('" + userId + "', '" + postId + "', now(), now())";
		Post.query(query, callback);
	}
};