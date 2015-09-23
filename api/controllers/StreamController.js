/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function (req, res) {
		//console.log(User.create(req.body).done);
		var userId = req.body.userId;
		var streamName = req.body.streamName;
		var streamUrl = "http://172.16.1.38:1935/live/" + streamName + "/playlist.m3u8";

		var streamInfo = {
			userId:userId,
			streamUrl:streamUrl
		};

		Stream.create(streamInfo, function (err, stream) {
			if (err == null) {
				var result = {status:true, content:stream};
				res.end(JSON.stringify(result));
			} else {
				var result = {status:false, content:'Internal Server Error.'};
				res.end(JSON.stringify(result));
			}
		});
	  },
	remove: function (req, res) {
		var streamId = req.body.streamId;
		Stream.remove(streamId);

		var result = {status:true, content:''};
		res.end(JSON.stringify(result));
	},
	streams: function (req, res) {
		Stream.liveStreams(function (err, streams) {
			if (err == null) {
				var result = {status:true, content:streams};
				res.end(JSON.stringify(result));
			} else {
				var result = {status:false, content:'Internal Server Error.'};
				res.end(JSON.stringify(result));
			}
		})
	}
};

