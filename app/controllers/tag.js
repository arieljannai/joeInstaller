var Tag = require('../models/tag');

// GET all tags, without their relevant applications
exports.getTags = function (req, res) {
    Tag.find(function (err, tags) {
        res.json(tags.map(function (tag) {
            delete tag['applications'];
            return tag;
        }));
    });
};

// GET a specific tag and everything we know about it
exports.getTag = function (req, res) {
    var tag_name = req.params.name;
    
    Tag.findOne({name: tag_name}, function (err, tag) {
        if (err)
            return console.warn(err);
        
        res.json(tag);
    });
};

// GET the fivemost popular tags, sorted applications_count
exports.getPopularTags = function (req, res) {
    Tag.find().sort({applications_count : -1}).limit(5).exec(
        function (err, tags) {
            if (err)
                return console.error(err);
            
            res.json(tags);
        }
    );
};