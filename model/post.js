var mongoosedb = require('./db.js');
var mongoose = mongoosedb.mongoose;

var postSchema = new mongoose.Schema({
   name: String,
   time: String,
   title: String,
   post: String
}, {
  collection: 'posts'
});

var postModel = mongoose.model('Post', postSchema);

function Post(name, time, title, post) {
  this.name = name;
  this.title = title;
  this.post = post;
};

Post.prototype.save = function(callback) {
  var date = new Date();
  //存储各种时间格式，方便以后扩展
  var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth() + 1),
      day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
  }
  var post = {
      name: this.name,
      time: time,
      title: this.title,
      post: this.post
  };

  var newPost = new postModel(post);

  newPost.save(function (err, post) {
    if (err) {
      return callback(err);
    }
    callback(null, user);
  });
};

Post.get = function(name, callback) {
  postModel.findOne({name: name}, function (err, user) {
    if (err) {
      return callback(err);
    }
    callback(null, user);
  });
};

module.exports = Post;