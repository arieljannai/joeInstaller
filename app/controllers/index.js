// Show a basic index
module.exports.handleIndex = function(req, res) {
	//res.render('index', { title: 'Express' });
    res.send("Welcome to express, bitch!");
};
