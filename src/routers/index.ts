import express from 'express';
import token from './token';
import user from './user';
import product from './product';

const router = express.Router();

export default (): express.Router => {
  token(router);
  user(router);
  product(router);

  return router;
};