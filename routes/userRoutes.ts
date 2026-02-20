import {Router} from 'express';
import {signIn, signOut, signUp} from "../controllers/user.js";


const userRouter = Router();

userRouter.post('/signup',signUp)
userRouter.post('/signin',signIn)
userRouter.post('/signout',signOut)

export default userRouter;