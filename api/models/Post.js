/**
* UserCircle.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
		
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
	}
};