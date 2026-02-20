import blogModel from "../models/blog.js";

export const getBlog = async (req, res) => {
    const userId = req.user.id;
    blogModel.find({userId:userId}).then(blogs => res.json(blogs)).catch((err)=>{
        return res.status(500).json({message:err.message});
    })
}
export const getBlogbyId = async (req, res) => {
    const blogId = req.params.blogId;
    blogModel.findById({_id:blogId}).then(blogs => res.json(blogs)).catch((err)=>{
        return res.status(500).json({message:err.message});
    })
}

export const createBlog = async (req, res) => {
    const {title, content} = req.body;
    const userId = req.user.id;

    if (!userId){
        return res.status(401).json({message:'Unauthorized'});
    }

    if (!content){
            return res.status(400).json({message:'Content is required'});
        }
    blogModel.create({title, content,userId}).then(blog => res.json(blog)).catch((err)=>{
        return res.status(500).json({message:err.message});
    });

}

export const updateBlog = async (req,res) => {
    const {title, content} = req.body;

    if (!title || !content){
        return res.status(400).json({message:'title or content is required'});
    }

    const blogId = req.params.blogid;
    if (!blogId){
        return res.status(400).json({message:'BlogId is required'});
    }

    blogModel.findOneAndUpdate({_id:blogId},{$set: {title:title,content:content}},{returnDocument:'after'}).then(blog => res.json(blog)).catch((err)=>{
        return res.status(204);
    })
}

export const deleteBlog = async (req,res) => {
    const blogId = req.params.blogid;

    if (!blogId){
        return res.status(400).json({message:'BlogId is required'});
    }

    blogModel.findOneAndDelete({_id:blogId},{returnDocument:'after'}).then(blog => res.status(200).json({message:"delete sucessfully"})).catch((err)=>{
        return res.status(204)
    })
}

