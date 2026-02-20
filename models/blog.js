import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
  title: {type:String,default:'Untitled'},
  content: {type:String,required:true},
  userId:{type:mongoose.Types.ObjectId,ref:'user'}
});

const blogModel = mongoose.model('blog', blogSchema);

export default blogModel;