import Post from '../../models/Post.model';

export default {
  Query: {
    getPosts:  () => Post.find()
      .then(res => res)
      .catch(console.error)
  }
};