import {Router} from 'express';
import {createBlog, deleteBlog, getBlog, getBlogbyId, updateBlog} from "../controllers/blog.js";
import {requiredAuth} from "../utils/authenicator.js";

const blogRouter = Router();

blogRouter.get('/',requiredAuth, getBlog);
blogRouter.get('/:blogId',requiredAuth,getBlogbyId);
blogRouter.post('/',requiredAuth,createBlog )
blogRouter.patch('/:blogid',requiredAuth,updateBlog)
blogRouter.delete('/:blogid',requiredAuth,deleteBlog);
export default blogRouter;