import express from 'express';
import token from './token';
import user from './user';
import product from './product';
import note from './note';

const router = express.Router();

export default (): express.Router => {
  token(router);
  user(router);
  product(router);
  note(router);

  return router;
};