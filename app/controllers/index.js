// Show a basic index
module.exports.handleIndex = function(req, res) {
	res.render('index', { title: 'Express' });
};
