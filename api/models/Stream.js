/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	tableName: 'tbl_stream',
    adapter: 'mysqlAdapter',
    migrate: 'safe',

	attributes: {
		userId: {
			type: 'string',
		},
		streamUrl: {
			type: 'string',
		}
	},
	liveStreams: function (callback) {
		var query = "SELECT A.*, count(B.user_id) as viewCount, C.userName, C.photoUrl FROM tbl_stream A LEFT JOIN tbl_stream_view B ON (A.id = B.stream_id) LEFT JOIN tbl_user C ON (A.userId=C.id) ORDER BY A.createdAt DESC";
		Stream.query(query, callback);
	},
	remove: function (streamId) {
		var query = "DELETE FROM tbl_stream WHERE id='" + streamId + "'";
		Stream.query(query);

		query = "DELETE FROM tbl_view WHERE stream_id='" + streamId + "'";
		Stream.query(query);
	}
};