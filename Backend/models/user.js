import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
      college_id:{
        type:String,
        required:true
    },
     topic:{
        type:String,
        required:true
    },
     sem:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    email:{
        type:String
    }
},{
  timestamps: true
});
const User=mongoose.model('User',userSchema);
console.log(User);
export default User;
