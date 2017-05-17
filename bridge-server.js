'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
//var ccgc = require('casparcg-connection');
//var cg = ccgc();
const {CasparCG} = require('casparcg-connection');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors());

var port = process.env.PORT || 3030;

var router = express.Router();

var connection = new CasparCG();

// router.use(function(req, res, next) {
// console.log('Something AWESOME is happening...');
// res.header("Access-Control-Allow-Origin", "*");
// res.header("Access-Control-Allow-Headers", "X-Requested-With");
// res.header('Access-Control-Allow-Headers', 'Content-Type');
// next(); // make sure we go to the next routes and don't stop here
// });

var data = '<templateData><componentData id=\"hashtag\"><data id=\"text\" value=\"#HandballUTN\" /></componentData><componentData id=\"fullname\"><data id=\"text\" value="Carolina Moya" /></componentData><componentData id=\"username\"><data id=\"text\" value=\"@caromoya\" /></componentData><componentData id=\"message\"><data id=\"text\" value=\"FUERZA CHICOS!! Que ganen este partido para los utnianos.\" /></componentData></templateData>';

router.use(function(req, res, next) {
	//console.log(req.header('Origin'));
	next();
});

router.get('/status', function(req, res) {
	res.json({ message: 'Up and running!!' });
});

router.post('/play', function(req, res) {
	//var connection = new CasparCG();
	//connection.play(1, 1, "amb");
	connection.play(req.body.channel, req.body.layer, req.body.file, true);
	//connection.close();
	res.json(req.body);
});

router.post('/stop', function(req, res) {
	//var connection = new CasparCG();
	connection.stop(req.body.channel, req.body.layer);
	res.json(req.body);
});

router.post('/cgadd', function(req, res) {
	connection.cgAdd(1,35,0,'HANDBALL-TWITTER',true,data);
	res.json(req.body);
});

router.post('/cgstop', function(req, res) {
	connection.cgStop(1,35);
	res.json(req.body);
});

router.post('/clear', function(req, res) {
	connection.clear(req.body.channel);
	res.json(req.body);
});

app.use('/api', router);

app.listen(port);
console.log('Starting bridge-server on port ' + port);

