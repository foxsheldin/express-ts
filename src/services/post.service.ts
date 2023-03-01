import Post from "../schema/post.schema";
import FileService from "./file.service";
import fileUpload from "express-fileupload";
import { ICreatePostModel, IUpdatePostModel } from "../models/post.models";

class PostService {
  async create(
    post: ICreatePostModel,
    files: fileUpload.FileArray | null | undefined
  ) {
    const fileName = FileService.saveFile(
      files?.picture as fileUpload.UploadedFile
    );
    const createdPost = await Post.create({ ...post, picture: fileName });
    return createdPost;
  }

  async getAll() {
    const posts = await Post.find();
    return posts;
  }

  async getOne(id: string) {
    if (!id) {
      throw new Error("Не указан id");
    }

    const post = await Post.findById(id);
    return post;
  }

  async update(post: IUpdatePostModel) {
    if (!post._id) {
      throw new Error("Id не указан");
    }

    const updatedPost = await Post.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    return updatedPost;
  }

  async delete(id: string) {
    if (!id) {
      throw new Error("Id не указан");
    }

    const post = await Post.findByIdAndDelete(id);
    return post;
  }
}

export default new PostService();
