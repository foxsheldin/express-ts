import { RequestWithBody, RequestWithParams } from "../types";
import { MongoError } from "mongodb";
import { Request, Response } from "express";
import { Error } from "mongoose";
import PostService from "../services/post.service";
import {
  ICreatePostModel,
  IURIParamsPostModel,
  IUpdatePostModel,
} from "../models/post.models";
import { HTTP_STATUSES } from "../constants/HTTP_STATUSES";

class PostController {
  async create(req: RequestWithBody<ICreatePostModel>, res: Response) {
    try {
      const post = await PostService.create(req.body, req.files);
      res.status(HTTP_STATUSES.OK_200).json(post);
    } catch (error) {
      res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).json(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const posts = await PostService.getAll();
      return res.status(HTTP_STATUSES.OK_200).json(posts);
    } catch (error) {
      res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).json(error);
    }
  }

  async getOne(req: RequestWithParams<IURIParamsPostModel>, res: Response) {
    try {
      const post = await PostService.getOne(req.params.id);
      return res.status(HTTP_STATUSES.OK_200).json(post);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        res
          .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
          .json({ success: false, message: error.message });
      }

      if ((error as MongoError).code === 11000) {
        res
          .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
          .json({ success: false, message: "MongoDB ERROR" });
      }

      res
        .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
        .json({ success: false, message: "Internal server error", error });
    }
  }

  async update(req: RequestWithBody<IUpdatePostModel>, res: Response) {
    try {
      const updatedPost = PostService.update(req.body);
      return res.status(HTTP_STATUSES.OK_200).json(updatedPost);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        res
          .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
          .json({ success: false, message: error.message });
      }

      if ((error as MongoError).code === 11000) {
        res
          .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
          .json({ success: false, message: "MongoDB ERROR" });
      }

      res
        .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
        .json({ success: false, message: "Internal server error", error });
    }
  }

  async delete(req: RequestWithParams<IURIParamsPostModel>, res: Response) {
    try {
      const post = await PostService.delete(req.params.id);
      return res.status(HTTP_STATUSES.OK_200).json(post);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        res
          .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
          .json({ success: false, message: error.message });
      }

      if ((error as MongoError).code === 11000) {
        res
          .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
          .json({ success: false, message: "MongoDB ERROR" });
      }

      res
        .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
        .json({ success: false, message: "Internal server error", error });
    }
  }
}

export default new PostController();
