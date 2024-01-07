const { Schema, model } =require("mongoose") ;

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    photoURL:{
        type:String,
        default:"https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg?w=740",
        required:false,
    }
},{timestamps:true})


const User=model("User",userSchema);

module.exports= User;