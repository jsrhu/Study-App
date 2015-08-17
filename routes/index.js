var express = require('express');
var router = express.Router();

var input = function(Users){
	return router.post('/',function(req, res) {
		Users.push(req.body);
		res.send('input accepted');
	});
}

module.exports = input;
