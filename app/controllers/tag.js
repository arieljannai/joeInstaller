var Tag = require('../models/tag');

exports.getTags = function (req, res) {
    Tag.find(function (err, tags) {
        res.json(tags.map(function (tag) {
            delete tag['applications'];
        }));
    });
};

exports.getTag = function (req, res) {
    var tag_name = req.params.name;
    
    Tag.find({name: tag_name}, function (err, tag) {
        res.json(tag[0]);
    });
};

exports.getPopularTags = function (req, res) {
    Tag.find().sort({applications_count : -1}).limit(5).exec(
        function (err, tags) {
            if (err)
                return console.error(err);
            
            res.json(tags);
        }
    );
};