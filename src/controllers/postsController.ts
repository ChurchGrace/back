import Posts from 'src/models/PostsModel';
import { createOne, deleteOne, getAll, getOne, updateOne } from './handleFactory';

export const getAllPosts = getAll(Posts);
export const getPostById = getOne(Posts);
export const updatePost = updateOne(Posts);
export const deletePost = deleteOne(Posts);
export const createPost = createOne(Posts);
