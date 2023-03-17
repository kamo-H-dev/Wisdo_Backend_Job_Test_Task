const PostModel = require('../models/post.model');

module.exports = class PostService {
  
  static getById(postId, select) {
    return PostModel.findOne({ _id: postId }, select);
  }
  
  static getByQuery(query, select) {
    return PostModel.findOne(query, select);
  } 
  
  static getAllByQuery(query, select) {
    return PostModel.find(query, select);
  }
  
 static create(data) {
    const post = new PostModel(data);
    return post.save();
 }

  /**
   * get sorted recommendations
   * Some examples
   Post A author is from the same county as the requesting user, post B isn’t. A is ranked higher then B (returned first in the array) even if B has a higher weighted score
   Post A and B authors are from the same county as the requesting user. The post with the highest weighted score is returned first
   Post A and B authors are not from the same county as the requesting user. The post with the highest weighted score is returned first
   * 
   * @param posts
   * @param country
   * @return {*}
   */
 static getRecommendationsSorted(posts, country) {
   return posts.sort((a, b) => {
     if (a.author.country === country && b.author.country === country) {
       return b.likes - a.likes;
     } else if (a.author.country === country) {
       return -1;
     } else if (b.author.country === country) {
       return 1;
     } else {
       return b.likes - a.likes;
     }
   })
 }
 
};
