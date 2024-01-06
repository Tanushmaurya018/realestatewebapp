import mongoose, { Schema, model } from "mongoose";

const userSchema=new Schema({
    username:{
        type:string,
        required:true,
    },
    email:{
        type:string,
        required:true,
        unique:true,
    },
    email:{
        type:string,
        required:true,
    }
},{timestamps:true})


const User=model("User",userSchema);

module.exports= User;