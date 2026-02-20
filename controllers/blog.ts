import blogModel from "../models/blog.js";
import type {Request,Response} from "express";


export const getBlog = async (req:Request, res:Response) => {
    const userId = req.user.id;
    try{
        const getBlogs = await blogModel.find({userId:userId}).select(
            "_id title content"
        ).lean()

        if (!getBlogs) {
            return res.status(404).json({message: 'No blogs found'})
        }

        return res.status(200).json(getBlogs)

    }catch (err:any){
        return res.status(500).json({message:err.message})
    }

}
export const getBlogbyId = async (req:Request, res:Response) => {
    const blogId = req.params.blogId;

    if (!blogId){
        return res.status(400).json({message:'BlogId is required'})
    }

    try {
        const getBlogs = await blogModel.findById({_id: blogId}).select(
            "_id title content"
        ).lean()

        if (!getBlogs) {
            return res.status(404).json({message: 'Blog not found'})
        }

        res.status(200).json(getBlogs)

    }catch (err:any){
        return res.status(500).json({message:err.message})
    }
}

export const createBlog = async (req:Request, res:Response) => {
    const {title, content} = req.body;
    const userId = req.user.id;

    if (!content){
            return res.status(400).json({message:'Content is required'});
        }
    try{
        const newBlog = await blogModel.create({title, content,userId})


        res.status(201).json({
            id: newBlog._id,
            title: newBlog.title,
            content: newBlog.content,
        })

    }catch (err:any){
        return res.status(500).json({message:err.message});
    }


}

export const updateBlog = async (req:Request,res:Response) => {
    const {title, content} = req.body;

    if (!title || !content){
        return res.status(400).json({message:'title or content is required'});
    }

    const blogId = req.params.blogid;

    if (!blogId){
        return res.status(400).json({message:'BlogId is required'});
    }
    try {
        const updatedBlog:any = await blogModel.findOneAndUpdate({_id: blogId}, {
            $set: {
                title: title,
                content: content
            }
        }, {returnDocument: 'after'})

        if (!updatedBlog) {
            res.status(200).json({
                id:updatedBlog._id,
                title:updatedBlog.title,
                content:updatedBlog.content
            })

        }
    }catch (err:any){
        return res.status(500).json({message:err.message});
    }
}

export const deleteBlog = async (req:Request,res:Response) => {
    const blogId = req.params.blogid;

    if (!blogId) {
        return res.status(400).json({message: 'BlogId is required'});
    }
    try {
        const deletedBlog = await blogModel.findOneAndDelete({_id: blogId}, {returnDocument: 'after'})
        if (!deletedBlog) {
            return res.status(404).json({message: 'Blog not found'})
        }
        res.status(200).json(
            {message: 'Blog deleted successfully'}
        )
    } catch (err:any) {
        return res.status(500).json({message: err.message})
    }
}

