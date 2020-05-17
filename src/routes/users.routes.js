const { Router } = require('express');
const router = Router();

const {renderSignupForm, signUp, renderSignInForm, signIn, logOut  } = require('../controllers/users.controller');

router.get('/users/signup', renderSignupForm);
router.post('/users/signup', signUp);
router.get('/users/signin', renderSignInForm);
router.post('/users/signin', signIn);
router.get('/users/logout', logOut);






module.exports=router;
