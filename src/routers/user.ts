import express from 'express';

import { registerUser, loginUser, getProfiles, registerProfile } from '../controllers/user';
import { tokenAuth, checkCredentials } from '../middleware/index';

export default (router: express.Router) => {
    router.post('/register', tokenAuth, checkCredentials, registerUser);
    router.post('/login', tokenAuth, loginUser);
    router.post('/registerProfile/:id', tokenAuth, registerProfile);   
    router.get('/profiles/:id', tokenAuth, getProfiles);
}