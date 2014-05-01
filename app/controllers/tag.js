var Tag = require('../models/tag'),
    capitalize = require('../utils').capitalize;

// GET all tags, without their relevant applications
exports.getTags = function (req, res) {
    Tag.find({}, "-applications", function (err, tags) {
        res.json(tags);
    });
};

// GET a specific tag and everything we know about it
exports.getTag = function (req, res) {
    var tag_name = req.params.name;
    
    Tag.findOne({name: capitalize(tag_name)}, function (err, tag) {
        if (err)
            return console.warn(err);
        
        res.json(tag);
    });
};

// GET the fivemost popular tags, sorted by applications_count
exports.getPopularTags = function (req, res) {
    Tag.find({}, "-applications").sort({applications_count : -1}).limit(5).exec(
        function (err, tags) {
            if (err)
                return console.error(err);
            
            res.json(tags);
        }
    );
};