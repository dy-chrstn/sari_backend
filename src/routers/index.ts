import express from 'express';
import token from './token';
import user from './user';

const router = express.Router();

export default (): express.Router => {
  token(router);
  user(router);

  return router;
};