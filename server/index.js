
const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");

dotenv.config()




 const app=express();

 mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB Connected"))
 app.get("/",(req,res)=>{

 })
const PORT =process.env.PORT || 8000
 app.listen(PORT,()=>console.log(`Server running on PORT : ${PORT}`))
