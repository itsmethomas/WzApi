/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	upload: function (req, res) {
		//console.log(User.create(req.body).done);
		var userId = req.param('userId');
		var isVideo = req.param('isVideo');
		var postType = req.param('postType');
		var expireDuration = req.param('expireDuration');
		var privateUsers = req.param('privateUsers');

		console.log ('-----------------------');
		console.log (postType);
		console.log (expireDuration);
		console.log (privateUsers);
		console.log ('-----------------------');

		var uploadFile = req.files.mediaFile;
		var thumbnail = req.files.thumbnailImage;

		// generate a file name
		var d = new Date();
		var timestamp = d.getTime();
		var fileName = UtilityService.randomizeString(10) + '_' + timestamp;
		var thumbFileName = UtilityService.randomizeString(10) + '_' + timestamp + '_thumb.jpg';

		// move to real upload folder...
		var fs = require('fs');
		var tmp_path = uploadFile.path;
		var target_path = '';
		if (isVideo == 'YES') {
			fileName = 'videos/' + fileName + '.mp4';
		} else {
			fileName = 'photos/' + fileName + '.jpg';
		}
		target_path = './assets/' + fileName;

		fs.createReadStream(tmp_path).pipe(fs.createWriteStream(target_path).on("close", function() {
			fs.unlink(tmp_path, function(err) {
				if (err) throw err;
			});

			// copy thumbnail image...
			target_path = './assets/thumbnails/' + thumbFileName;
			fs.createReadStream(thumbnail.path).pipe(fs.createWriteStream(target_path).on("close", function() {
				fs.unlink(thumbnail.path, function(err) {
					if (err) throw err;
				});

				var protocol = req.connection.encrypted?'https':'http';
				var baseUrl = protocol + '://' + req.headers.host + '/';

				var postInfo = {
					userId:userId,
					caption:'Test Media',
					isVideo: isVideo,
					mediaUrl:(baseUrl + fileName),
					thumbnailUrl:(baseUrl + 'thumbnails/' + thumbFileName),
					likeCount:0,
					postType: postType,
					expireDuration: expireDuration
				};

				Post.create(postInfo, function (err, post) {
					if (err == null) {
						var response = {status:true, content:post};
						res.end(JSON.stringify(response));
					} else {
						console.log(err);
						var response = {status:false, content:'Internal Server Error.'};
						res.end(JSON.stringify(response));
					}
				});
			}));
		}));
	},
	postsByUser: function (req, res) {
		var userId = req.body.userId;
		var isVideo = req.body.isVideo;

		Post.postsByUser(userId, isVideo, function (err, posts) {
			if (err == null) {
				var response = {status:true, content:posts};
				res.end(JSON.stringify(response));
			} else {
				var response = {status:false, content:'Internal Server Error.'};
				res.end(JSON.stringify(response));
			}
		});
	},
	galleryForUser: function (req, res) {
		var userId = req.body.userId;
		var page = req.body.page;

		Post.fetchUserGallery(userId, function (err, posts) {
			if (err == null) {
				var response = {status:true, content:posts};
				res.end(JSON.stringify(response));
			} else {
				var response = {status:false, content:'Internal Server Error.'};
				res.end(JSON.stringify(response));
			}
		});
	}
};

