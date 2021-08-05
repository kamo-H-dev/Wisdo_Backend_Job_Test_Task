const { postService, userPostLikeService, watchListService, userService }= require('../services');
const subscription = require('../subscriptions/subscriber');
const { NotFoundError, ValidationError } = require('../errors');
const { POST_STATUSES } = require('../constants');

const all = async ({ user, query }, res) => {
  console.log('post.controller -> all', user, query);
  try {
    let dbQuery = {
      author: user._id,
    };
    if (query.userId) {
      dbQuery = {
        $or: [
          { author: user._id },
          { $and: [ { author: query.userId }, { status : POST_STATUSES.approved } ] }
        ]
      }
    }
    
    const posts = await postService.getAllByQuery(dbQuery).lean();
    res.send({ posts });
  } catch (err) {
    next(err)
  }
};

/**
 * Get post by id
 * 
 * @param params
 * @param user
 * @param res
 * @param next
 * @return {Promise<void>}
 */
const getById = async ({ params, user }, res, next) => {
  console.log('post.controller -> getById', params.id);
  
  try {
    const post = await postService.getById(params.id).lean();
    
    if (!post) throw new NotFoundError();
   
    if (post.status === POST_STATUSES.pendingApproval 
      && (!user || user._id.toString() !== post.author.toString())) throw new ValidationError('Post is pending approval!');
    
    res.send(post);
  } catch (err) {
    next(err);
  }
};

/**
 * Create new post
 * 
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 */
const create = async (req, res, next) => {
  console.log('post.controller -> create', req.body);
  
  try {
    const { title, body, community, summary, image, tags } = req.body;
    const author = req.user._id;
    
    const post = await postService.create({ body, title, community, summary, tags, author, image });
  
    subscription.getSubscriber().emit('postCreated', { postId: post._id, authorName: req.user.name });
    const words = await watchListService.getAll();
    const existsWords = watchListService.censoredFilter(title + ' ' + post.body + ' ' + summary, words);
    if (existsWords.length) {
      subscription.getSubscriber().emit('watchListWordExists', { postId: post._id, authorName: req.user.name, words: existsWords });
    }
    res.send({ success: true, post });
  } catch (err) {
    next(err);
  }
};

/**
 * Update post can owner and super moderator
 * 
 * @param user
 * @param params
 * @param reqBody
 * @param res
 * @param next
 * @return {Promise<void>}
 */
const update = async ({ user, params, body: reqBody }, res, next) => {
  console.log('post.controller -> update', reqBody);
  try {
    const { title, body, community, summary, image, tags, status } = reqBody;
    
    const post = await postService.getById(params.id);
    post.body = body;
    post.title = title;
    post.summary = summary;
    post.community = community;
    post.tags = tags;
    post.image = image;
    if (userService.isSuperModerator(user)) {
      post.status = status;
    }

    const words = await watchListService.getAll();
    const existsWords = watchListService.censoredFilter(title + ' ' + post.body + ' ' + summary, words);
    if (existsWords.length) {
      subscription.getSubscriber().emit('watchListWordExists', { postId: post._id, authorName: user.name, words: existsWords });
    }
    await post.save();
    
    res.send({ success: true, post });
  } catch (err) {
    next(err);
  }
};

/**
 * Approve the published 
 * 
 * @param user
 * @param params
 * @param res
 * @param next
 * @return {Promise<void>}
 */
const approve = async ({ user, params }, res, next) => {
  console.log('post.controller -> approve', params);
  try {
    const post = await postService.getById(params.id, { status: 1 });
    if (!post) throw new NotFoundError();
    
    if (post.status !== POST_STATUSES.pendingApproval) throw new ValidationError('The post already approved!');

    post.status = POST_STATUSES.approved;
    await post.save();
    res.send({ success: true });
  } catch (err) {
    next(err);
  }
};


/**
 * Like or remove like 
 * 
 * @param user
 * @param params
 * @param res
 * @param next
 * @return {Promise<void>}
 */
const addRemoveLike = async ({ user, params }, res, next) => {
  console.log('post.controller -> addRemoveLike', params);
  try {
    const post = await postService.getById(params.id, { status: 1, likes: 1 });
    if (!post) throw new NotFoundError();

    const postLikeByUser = await userPostLikeService.find(params.id, user._id);
    if (postLikeByUser) {
      await postLikeByUser.delete();
      post.likes--;
    } else {
      await userPostLikeService.create(params.id, user._id);
      post.likes++;
    }
    
    await post.save();
    res.send({ success: true });
  } catch (err) {
    next(err);
  }
};

const recommendations = async ({ user }, res, next) => {
  console.log('post.controller -> recommendations', user);
  try {
    const userData = await userService.getById(user._id, { communities: 1, country: 1 }).lean();
    const post = await postService.getAllByQuery(
      { author: { $ne: userData._id },
              status: POST_STATUSES.approved, 
              community: { $in: userData.communities }
      })
      .populate('author', { country: 1 }).lean();
    const sortedData = postService.getRecommendationsSorted(post, userData.country);
    
    res.send({ posts: sortedData });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  all,
  getById,
  create,
  update,
  approve,
  addRemoveLike,
  recommendations,
};
