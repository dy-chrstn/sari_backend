import express from 'express';
import token from './token';

const router = express.Router();

export default (): express.Router => {
  token(router);

  return router;
};