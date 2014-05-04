var util = require('util'),
    PassThrough = require('stream').PassThrough;

exports.capitalize = function (str)
{
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

var StreamCombiner = function() {
  this.streams = Array.prototype.slice.apply(arguments);

  this.on('pipe', function(source) {
    source.unpipe(this);
    for(i in this.streams) {
      source = source.pipe(this.streams[i]);
    }
    this.transformStream = source;
  });
};

util.inherits(StreamCombiner, PassThrough);

StreamCombiner.prototype.pipe = function(dest, options) {
  return this.transformStream.pipe(dest, options);
};
StreamCombiner.prototype.addPipe = function(pipe) {
  this.streams.push(pipe);
};

exports.StreamCombiner = StreamCombiner;
