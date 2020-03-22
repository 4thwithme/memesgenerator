import * as mongoose from "mongoose";

import { IPost } from 'app/types';

const model = mongoose.model;
const Schema = mongoose.Schema;


const postSchema = new Schema({
  body: String,
  createdAt: String,
  username: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  }
});

export default model<IPost>('Post', postSchema);