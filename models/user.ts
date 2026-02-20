import mongoose from 'mongoose';

const usrSchema = new mongoose.Schema({
    username: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    userId:mongoose.Types.ObjectId
})

const userModel = mongoose.model('user',usrSchema);

export default userModel;