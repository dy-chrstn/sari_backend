import express from 'express';

import { registerUser, loginUser, getProfiles } from '../controllers/user';
import { tokenAuth, checkCredentials } from '../middleware/index';

export default (router: express.Router) => {
    router.post('/register', tokenAuth, checkCredentials, registerUser);
    router.post('/login', tokenAuth, loginUser);
    router.get('/profiles/:userId', tokenAuth, getProfiles);
}