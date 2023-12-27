import { Request, Response } from 'express';

const controller = {
  renderHomePage: (_: Request, res: Response) => {
    res.sendFile('index.html', { root: process.cwd() });
  }
};

export default controller;