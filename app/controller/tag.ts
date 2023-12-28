import { Request, Response } from 'express';
import { Tag } from '../models/index';

type ErrorType = {
  error?: string | null;
  message?: string | null;
}

type TagType = {
  id: number;
  name: string;
}

type TagsType = {
  tags: TagType[];
}

const controller = {
  getAllTags: async (
    _: Request,
    res: Response<TagsType | ErrorType>
    ) => {
    try {
      const tags = await Tag.findAll();

      res
        .status(200)
        .json(tags);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  },

  getOneTag: async (
    req: Request<{ id: number }>,
    res: Response<TagType | ErrorType>
    ) => {
    try {
      const { id } = req.params;
      const tag = await Tag.findByPk(id);

      res
        .status(200)
        .json(tag);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  }
};

export default controller;