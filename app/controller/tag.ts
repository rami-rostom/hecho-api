import { Request, Response } from "express";
import { Tag } from "../models/index";

type ErrorType = {
  error?: string | null;
  message?: string | null;
};

type TagType = {
  id: number;
  name: string;
};

type TagsType = {
  tags: TagType[];
};

const controller = {
  getAllTags: async (_: Request, res: Response<TagsType | ErrorType>) => {
    try {
      const tags = await Tag.findAll();

      res.status(200).json(tags);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  getOneTag: async (
    req: Request<{ id: number }>,
    res: Response<TagType | ErrorType>
  ) => {
    try {
      const { id } = req.params;
      const tag = await Tag.findByPk(id);

      res.status(200).json(tag);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  getAllUserTags: async (
    req: Request<{ id: number }>,
    res: Response<TagsType | ErrorType>
  ) => {
    try {
      const { id } = req.params;
      const tags = await Tag.findAll({
        where: { user_id: id },
      });

      res.status(200).json(tags);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  createOneTag: async (
    req: Request<TagType>,
    res: Response<TagType | ErrorType>
  ) => {
    try {
      const { name, user_id } = req.body;

      if (!name || !user_id) {
        return res.status(400).json({ error: "Missing body parameter(s)" });
      }

      const newTag = await Tag.create({
        name,
        user_id,
      });

      res.status(201).json(newTag);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  updateOneTag: async (
    req: Request<TagType>,
    res: Response<TagType | ErrorType>
  ) => {
    try {
      const { id } = req.params;

      const tag = await Tag.findByPk(id);

      if (!tag) {
        return res
          .status(404)
          .json({ error: "Tag not found. Please verify the provided id." });
      }

      const { name, user_id } = req.body;

      if (name) {
        tag.name = name;
      }
      if (user_id) {
        tag.user_id = user_id;
      }

      await tag.save();

      res.status(200).json(tag);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  deleteOneTag: async (
    req: Request<{ id: number }>,
    res: Response<ErrorType>
  ) => {
    try {
      const { id } = req.params;
      const tag = await Tag.findByPk(id);

      if (!tag) {
        return res
          .status(404)
          .json({ error: "Tag not found. Please verify the provided id." });
      }

      await tag.destroy();

      res.status(200).json({ message: "This tag was successfully deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
};

export default controller;
